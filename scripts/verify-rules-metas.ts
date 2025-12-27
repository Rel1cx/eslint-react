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
  { key: "x", heading: "X Rules" },
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
function retrieveRuleMeta(category: string, name: string) {
  return Effect.gen(function*() {
    const filename = `packages/plugins/eslint-plugin-react-${category}/src/rules/${name}.ts`;
    const { default: mod, RULE_FEATURES, RULE_NAME } = yield* Effect.tryPromise(() => import(`../${filename}`));

    // Extract description from rule's meta. docs
    const description = match(mod)
      .with({ meta: { docs: { description: P.select(P.string) } } }, identity)
      .otherwise(() => "No description available.");

    // Look up severity in recommended and strict presets
    const rEntry = Reflect.get(
      config0.rules,
      category === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${category}/${RULE_NAME}`,
    );
    const sEntry = Reflect.get(
      config1.rules,
      category === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${category}/${RULE_NAME}`,
    );

    return {
      name: RULE_NAME,
      // eslint-disable-next-line perfectionist/sort-objects
      description,
      features: RULE_FEATURES,
      severities: [getSeverity(rEntry), getSeverity(sEntry)], // [recommended, strict]
    };
  });
}

// Verify each rule's .mdx documentation matches its source metadata
const verifyDocs = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = glob(RULES_GLOB).filter((file) => !file.endsWith(".spec.ts"));

  for (const file of files) {
    // Extract category and rule name from file path
    const category = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    const basename = path.parse(path.basename(file)).name;
    const filename = path.resolve(file);
    const rulename = `${category}/${basename}`;
    const rulemeta = yield* retrieveRuleMeta(category, basename);

    // Read corresponding . mdx documentation file
    const content = yield* fs.readFileString(filename.replace(/\.ts$/u, ".mdx"), "utf8");
    const contentLines = content.split("\n");

    // Verify description section matches rule metadata
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

    // Verify features section matches rule metadata
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

    // Verify presets section exists if rule has non-zero severities
    const presetsIndex = contentLines.findIndex((line) => line.startsWith("**Presets**"));
    if (presetsIndex === -1) {
      if (rulemeta.severities.every((s) => s === 0)) continue;
      yield* Effect.logError(ansis.red(`  Missing presets line in documentation for rule ${rulename}`));
      continue;
    }
    // TODO: Verify presets content if needed
  }
});

// Verify the overview. mdx table entries match actual rule metadata
const verifyOverview = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const target = path.join(...RULES_OVERVIEW_PATH);
  const content = yield* fs.readFileString(target, "utf8");
  const contentLines = content.split("\n");

  yield* Effect.log(ansis.green(`Verifying rules overview at ${target}...`));

  // Process each rule category section
  for (const { key, heading } of SECTION_HEADERS) {
    // Locate section heading and table boundaries
    const headerStartIndex = contentLines.findIndex((line) => line.startsWith(`## ${heading}`));
    if (headerStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find section for ${heading} in ${target}`);
    }
    const tableStartIndex = contentLines
      .findIndex((line, index) => index > headerStartIndex && line.startsWith("| Rule"));
    if (tableStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find table for ${heading} in ${target}`);
    }
    const tableEndIndex = contentLines.findIndex((line, index) => index > tableStartIndex && line.trim() === "");
    if (tableEndIndex === -1) {
      return yield* Effect.dieMessage(`Could not find the end of table for ${heading} in ${target}`);
    }

    // Verify each table row (skip header and separator rows)
    const tableLines = contentLines.slice(tableStartIndex + 2, tableEndIndex);
    for (const line of tableLines) {
      const columns = line.split("|").slice(1, -1); // Remove leading/trailing empty splits
      const [link, severities, features, description] = columns;
      if (link == null || severities == null || features == null || description == null) {
        yield* Effect.logError(ansis.red(`Malformed table line (skipped): ${line}`));
        continue;
      }

      const category = key;
      const rulename = link.match(/\[`([^`]+)`\]/)?.[1];
      if (rulename == null) {
        yield* Effect.logError(ansis.red(`Could not extract rule name from link (skipped): ${link}`));
        continue;
      }

      const meta = yield* retrieveRuleMeta(category, rulename);

      // Verify link format
      const expectedLink = `[\`${rulename}\`](${category === "x" ? "" : category + "-"}${rulename})`;
      const providedLink = link.trim();
      if (expectedLink !== providedLink) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched link for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedLink)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedLink)}`);
      }

      // Verify description text
      const expectedDescription = meta.description.replace(/\.$/, "");
      const providedDescription = description.trim().replaceAll("`", "'");
      if (expectedDescription !== providedDescription) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched description for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedDescription)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedDescription)}`);
      }

      // Verify severity icons match preset configurations
      const expectedSeverityIcons = `${getSeverityIcon(meta.severities[0])} ${getSeverityIcon(meta.severities[1])}`;
      const providedSeverityIcons = severities.trim();
      if (expectedSeverityIcons !== providedSeverityIcons) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched severity icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedSeverityIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedSeverityIcons)}`);
      }

      // Verify feature icons match rule features
      const expectedFeatureIcons = meta.features.map(getFeatureIcon).map((icon: string) => "`" + icon + "`").join(" ");
      const providedFeatureIcons = features.trim();
      if (expectedFeatureIcons !== providedFeatureIcons) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched feature icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
      }
    }
  }
});

const program = Effect.gen(function*() {
  // Verify the rules documentations match the actual rule definitions
  yield* verifyDocs;
  // Verify the rules overview matches the actual rule definitions
  yield* verifyOverview;
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
