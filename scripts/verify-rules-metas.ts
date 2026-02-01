import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import { identity } from "effect";
import * as Effect from "effect/Effect";
import { P, match } from "ts-pattern";

import { glob } from "./lib/glob";

import * as config0 from "../packages/plugins/eslint-plugin/src/configs/recommended-typescript";
import * as config1 from "../packages/plugins/eslint-plugin/src/configs/strict-typescript";

const RULES_GLOB = ["packages/plugins/eslint-plugin-react-*/src/rules/*.ts"];
const RULES_OVERVIEW_PATH = ["apps", "website", "content", "docs", "rules", "overview.mdx"];
const SECTION_HEADERS = [
  { key: "x", heading: "Core Rules" },
  { key: "dom", heading: "DOM Rules" },
  { key: "web-api", heading: "Web API Rules" },
  { key: "hooks-extra", heading: "Hooks Extra Rules" },
  { key: "naming-convention", heading: "Naming Convention Rules" },
  // { key: "debug", heading: "Debug Rules" },
];

// Convert ESLint severity config to numeric value (0=off, 1=warn, 2=error)
const getSeverity = (x: unknown): number =>
  match(x)
    .with("off", () => 0)
    .with("warn", () => 1)
    .with("error", () => 2)
    .with(P.number, (n) => n)
    .with(P.array(), ([s]) => getSeverity(s)) // Handle array config like ["error", options]
    .otherwise(() => 0);

// Map severity level to emoji indicator
const getSeverityIcon = (x: unknown) =>
  match(x)
    .with(0, () => "0️⃣")
    .with(1, () => "1️⃣")
    .with(2, () => "2️⃣")
    .otherwise(() => "0️⃣");

// Map rule feature flags to emoji indicators
const getFeatureIcon = (x: unknown) =>
  match(x)
    .with("CFG", () => "⚙️")
    .with("DBG", () => "🐞")
    .with("FIX", () => "🔧")
    .with("MOD", () => "🔄")
    .with("TSC", () => "💭")
    .with("EXP", () => "🧪")
    .otherwise(() => "");

// Extract metadata from a rule module (name, description, features, severities)
const retrieveRuleMeta = Effect.fnUntraced(
  function*(domain: string, name: string) {
    const filename = `packages/plugins/eslint-plugin-react-${domain}/src/rules/${name}.ts`;
    const { default: mod, RULE_FEATURES, RULE_NAME } = yield* Effect.tryPromise(() => import(`../${filename}`));

    // Extract description from the rule's meta.docs
    const description = match(mod)
      .with({ meta: { docs: { description: P.select(P.string) } } }, identity)
      .otherwise(() => "No description available.");

    // Look up severity in recommended and strict presets
    const rEntry = Reflect.get(
      config0.rules,
      domain === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${domain}/${RULE_NAME}`,
    );
    const sEntry = Reflect.get(
      config1.rules,
      domain === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${domain}/${RULE_NAME}`,
    );

    return {
      name: RULE_NAME,
      // eslint-disable-next-line perfectionist/sort-objects
      description,
      features: RULE_FEATURES,
      severities: [getSeverity(rEntry), getSeverity(sEntry)], // [recommended, strict]
    };
  },
);

// Verify each rule's .mdx documentation matches its source metadata
const verifyDocs = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = glob(RULES_GLOB).filter((file) => !file.endsWith(".spec.ts"));

  for (const file of files) {
    // Extract domain and rule name from file path
    const domain = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    const basename = path.parse(path.basename(file)).name;
    const filename = path.resolve(file);
    const rulename = `${domain}/${basename}`;
    const rulemeta = yield* retrieveRuleMeta(domain, basename);

    // Read corresponding .mdx documentation file
    const content = yield* fs.readFileString(filename.replace(/\.ts$/u, ".mdx"), "utf8");
    const contentLines = content.split("\n");

    // Verify the description section matches the rule metadata
    const expectedDescription = rulemeta.description;
    const descriptionIndex = contentLines.findIndex((line) => line.startsWith("## Description"));
    if (descriptionIndex === -1) {
      yield* Effect.logError(ansis.red(`  Missing description line in documentation for rule ${rulename}`));
      continue;
    }
    const providedDescription = contentLines[descriptionIndex + 2]?.trim().replaceAll("`", "'");
    if (providedDescription == null || !providedDescription.includes(expectedDescription.replace(/\.$/, ""))) {
      yield* Effect.logError(ansis.red(`  Found 1 mismatched description in documentation for rule ${rulename}`));
      yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedDescription)}`);
      yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedDescription)}`);
    }

    // Verify the features section matches the rule metadata
    const featuresIndex = contentLines.findIndex((line) => line.startsWith("**Features**"));
    if (featuresIndex === -1) {
      if (rulemeta.features.length === 0) continue;
      yield* Effect.logError(ansis.red(`  Missing features line in documentation for rule ${rulename}`));
      continue;
    }
    const expectedFeatureIcons = rulemeta
      .features
      .map(getFeatureIcon)
      .map((icon: string) => "`" + icon + "`")
      .join(" ");
    const providedFeatureIcons = contentLines[featuresIndex + 2]?.trim() ?? "";
    if (expectedFeatureIcons !== providedFeatureIcons) {
      yield* Effect.logError(ansis.red(`  Found 1 mismatched feature icons in documentation for rule ${rulename}`));
      yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
      yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
    }

    // Verify the presets section exists if the rule has non-zero severities
    const presetsIndex = contentLines.findIndex((line) => line.startsWith("**Presets**"));
    if (presetsIndex === -1) {
      if (rulemeta.severities.every((s) => s === 0)) continue;
      yield* Effect.logError(ansis.red(`  Missing presets line in documentation for rule ${rulename}`));
      continue;
    }
    // TODO: Verify presets content if needed
  }
});

// Helper function to get domain from rule name based on prefix
const getDomainFromRuleName = (rulename: string) => {
  return match(rulename)
    .with(P.string.startsWith("dom-"), () => "dom")
    .with(P.string.startsWith("web-api-"), () => "web-api")
    .with(P.string.startsWith("hooks-extra-"), () => "hooks-extra")
    .with(P.string.startsWith("naming-convention-"), () => "naming-convention")
    .with(P.string.startsWith("debug-"), () => "debug")
    .otherwise(() => "x");
};

// Helper function to get short rule name (without domain prefix)
const getShortRuleName = (rulename: string, domain: string) => {
  if (domain === "x") return rulename;
  const prefix = `${domain}-`;
  if (rulename.startsWith(prefix)) {
    return rulename.slice(prefix.length);
  }
  return rulename;
};

// Verify the overview.mdx "View by Group" entries match the actual rule metadata
const verifyOverviewByGroup = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const target = path.join(...RULES_OVERVIEW_PATH);
  const content = yield* fs.readFileString(target, "utf8");
  const contentLines = content.split("\n");
  const verifyIndex = contentLines.findIndex((line) => line.includes(`{/* VERIFY_VIEW_BY_GROUP */}`));
  const verifyIndexEnd = contentLines.findIndex((line) => line.includes(`{/* VERIFY_VIEW_BY_GROUP_END */}`));
  const relevantLines = contentLines.slice(verifyIndex + 1, verifyIndexEnd).map((line) => line.trim());

  yield* Effect.log(ansis.green(`Verifying rules overview (View by Group) at ${target}...`));

  // Process each rule list item in the View by Group section
  for (const line of relevantLines) {
    // Match list items with rule links: - [`rule-name`](./link) - description (features)
    const match = line.match(/^- \[`([^`]+)`\]\(\.\/([^)]+)\)/);
    if (match == null) continue;

    const rulename = match[1];
    const linkPath = match[2];

    if (rulename == null || linkPath == null) {
      yield* Effect.logError(ansis.red(`Malformed line (skipped): ${line}`));
      continue;
    }

    // Determine domain from link path (which has the domain prefix)
    const domain = getDomainFromRuleName(linkPath);
    const shortRulename = getShortRuleName(linkPath, domain);

    // Skip debug rules as they may not follow the same metadata pattern
    if (domain === "debug") continue;

    const meta = yield* retrieveRuleMeta(domain, shortRulename);

    // Verify link path format - linkPath should end with the rulename for non-x domains
    // or match exactly for x domain
    const expectedLinkPath = domain === "x" ? rulename : `${domain}-${rulename}`;
    const providedLinkPath = linkPath;
    if (expectedLinkPath !== providedLinkPath) {
      yield* Effect.logError(ansis.red(`Found 1 mismatched link path for rule ${rulename}`));
      yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedLinkPath)}`);
      yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedLinkPath)}`);
    }

    // Extract description from the line (everything after " - " up to any feature tags or version info)
    // Matches patterns like: " - description (🔄 Codemod, `React` >=19.0.0)" or " - description (🔧 Fixable)" or just " - description"
    const desc = line.match(/ - (.*?)(?: \(|$)/u)?.at(1);
    // Verify the description matches the rule metadata (allow partial matches)
    if (desc != null) {
      const expectedDescription = meta.description.replace(/[`*]/g, "'").replace(/\.$/, "");
      const providedDescription = desc.trim().replace(/[`*]/g, "'").replace(/\.$/, "");

      if (!expectedDescription.includes(providedDescription) && !providedDescription.includes(expectedDescription)) {
        // Allow partial matches - check if the core meaning is present
        const normalizedExpected = expectedDescription.toLowerCase().replace(/\s+/g, " ");
        const normalizedProvided = providedDescription.toLowerCase().replace(/\s+/g, " ");
        if (!normalizedExpected.includes(normalizedProvided) && !normalizedProvided.includes(normalizedExpected)) {
          yield* Effect.logError(ansis.red(`Found 1 mismatched description for rule ${rulename}`));
          yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedDescription)}`);
          yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedDescription)}`);
        }
      }
    }

    // TODO: Extract and verify feature tags in parentheses at the end
    // if (expectedFeatureIcons !== providedFeatureIcons) {
    //   yield* Effect.logError(ansis.red(`Found 1 mismatched feature icons for rule ${rulename}`));
    //   yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedFeatureIcons || "(none)")}`);
    //   yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedFeatureIcons || "(none)")}`);
    // }
  }
});

// Verify the overview.mdx "View by Domain" table entries match the actual rule metadata
const verifyOverviewByDomain = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const target = path.join(...RULES_OVERVIEW_PATH);
  const content = yield* fs.readFileString(target, "utf8");
  const contentLines = content.split("\n");
  const verifyIndex = contentLines.findIndex((line) => line.includes(`{/* VERIFY_VIEW_BY_DOMAIN */}`));
  const verifyIndexEnd = contentLines.findIndex((line) => line.includes(`{/* VERIFY_VIEW_BY_DOMAIN_END */}`));
  const relevantLines = contentLines.slice(verifyIndex + 1, verifyIndexEnd).map((line) => line.trim());

  yield* Effect.log(ansis.green(`Verifying rules overview (View by Domain) at ${target}...`));

  // Process each rule domain section
  for (const { key, heading } of SECTION_HEADERS) {
    // Locate the section heading and table boundaries
    const headerStartIndex = relevantLines.findIndex((line) => line.startsWith(`## ${heading}`));
    if (headerStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find section for ${heading} in ${target}`);
    }
    const tableStartIndex = relevantLines
      .findIndex((line, index) => index > headerStartIndex && line.startsWith("| Rule"));
    if (tableStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find table for ${heading} in ${target}`);
    }
    const tableEndIndex = relevantLines.findIndex((line, index) => index > tableStartIndex && line.trim() === "");
    if (tableEndIndex === -1) {
      return yield* Effect.dieMessage(`Could not find the end of the table for ${heading} in ${target}`);
    }

    // Verify each table row (skip header and separator rows)
    const tableLines = relevantLines.slice(tableStartIndex + 2, tableEndIndex);
    for (const line of tableLines) {
      const columns = line.split("|").slice(1, -1); // Remove leading/trailing empty splits
      const [link, severities, features, description] = columns;
      if (link == null || severities == null || features == null || description == null) {
        yield* Effect.logError(ansis.red(`Malformed table line (skipped): ${line}`));
        continue;
      }

      const domain = key;
      const rulename = link.match(/\[`([^`]+)`\]/)?.[1];
      if (rulename == null) {
        yield* Effect.logError(ansis.red(`Could not extract rule name from link (skipped): ${link}`));
        continue;
      }

      const meta = yield* retrieveRuleMeta(domain, rulename);

      // Verify link format
      const expectedLink = `[\`${rulename}\`](${domain === "x" ? "" : domain + "-"}${rulename})`;
      const providedLink = link.trim();
      if (expectedLink !== providedLink) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched link for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedLink)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedLink)}`);
      }

      // Verify the description text
      const expectedDescription = meta.description.replace(/\.$/, "");
      const providedDescription = description.trim().replaceAll("`", "'");
      if (expectedDescription !== providedDescription) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched description for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedDescription)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedDescription)}`);
      }

      // Verify feature icons match the rule features
      const expectedFeatureIcons = meta.features.map(getFeatureIcon).map((icon: string) => "`" + icon + "`").join(" ");
      const providedFeatureIcons = features.trim();
      if (expectedFeatureIcons !== providedFeatureIcons) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched feature icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
      }

      // Verify severity icons match preset configurations
      const expectedSeverityIcons = `${getSeverityIcon(meta.severities[0])} ${getSeverityIcon(meta.severities[1])}`;
      const providedSeverityIcons = severities.trim();
      if (expectedSeverityIcons !== providedSeverityIcons) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched severity icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedSeverityIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedSeverityIcons)}`);
      }
    }
  }
});

const program = Effect.gen(function*() {
  // Verify the rules documentation matches the actual rule definitions
  yield* verifyDocs;
  // Verify the rules overview "View by Group" matches the actual rule definitions
  yield* verifyOverviewByGroup;
  // Verify the rules overview "View by Domain" matches the actual rule definitions
  yield* verifyOverviewByDomain;
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
