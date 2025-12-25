/* eslint-disable perfectionist/sort-objects */
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

const getSeverity = (x: unknown): number =>
  match(x)
    .with("off", () => 0)
    .with("warn", () => 1)
    .with("error", () => 2)
    .with(P.number, (n) => n)
    .with(P.array(), ([s]) => getSeverity(s))
    .otherwise(() => 0);

const getSeverityIcon = (x: unknown) =>
  match(x)
    .with(0, () => "0️⃣")
    .with(1, () => "1️⃣")
    .with(2, () => "2️⃣")
    .otherwise(() => "0️⃣");

const getFeatureIcon = (x: unknown) =>
  match(x)
    .with("CFG", () => "⚙️")
    .with("DBG", () => "🐞")
    .with("FIX", () => "🔧")
    .with("MOD", () => "🔄")
    .with("TSC", () => "💭")
    .with("EXP", () => "🧪")
    .otherwise(() => "");

function retrieveRuleMeta(catename: string, rulename: string) {
  return Effect.gen(function*() {
    const filename = `packages/plugins/eslint-plugin-react-${catename}/src/rules/${rulename}.ts`;
    const { default: ruleModule, RULE_FEATURES, RULE_NAME } = yield* Effect.tryPromise(() => import(`../${filename}`));
    const description = match(ruleModule)
      .with({ meta: { docs: { description: P.select(P.string) } } }, identity)
      .otherwise(() => "No description available.");
    const rEntry = Reflect.get(
      config0.rules,
      catename === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${catename}/${RULE_NAME}`,
    );
    const sEntry = Reflect.get(
      config1.rules,
      catename === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${catename}/${RULE_NAME}`,
    );
    return {
      name: RULE_NAME,
      description,
      features: RULE_FEATURES,
      severities: [
        getSeverity(rEntry),
        getSeverity(sEntry),
      ],
    };
  });
}

const verifyRulesMarkdowns = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = glob(RULES_GLOB).filter((file) => !file.endsWith(".spec.ts"));
  for (const file of files) {
    const catename = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    const basename = path.parse(path.basename(file)).name;
    const filename = path.resolve(file);
    const rulename = `${catename}/${basename}`;
    const meta = yield* retrieveRuleMeta(catename, basename);
    const docContent = yield* fs.readFileString(filename.replace(/\.ts$/u, ".mdx"), "utf8");
    const docContentLines = docContent.split("\n");
    const expectedDescription = meta.description;
    const descriptionLineIndex = docContentLines.findIndex((line) => line.startsWith("## Description"));
    if (descriptionLineIndex === -1) {
      yield* Effect.logError(ansis.red(`  Missing description line in documentation for rule ${rulename}`));
      continue;
    }
    const providedDescription = docContentLines[descriptionLineIndex + 2]?.trim().replaceAll("`", "'");
    if (providedDescription == null || !providedDescription.includes(expectedDescription.replace(/\.$/, ""))) {
      yield* Effect.logError(ansis.red(`  Found 1 mismatched description in documentation for rule ${rulename}`));
      yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedDescription)}`);
      yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedDescription)}`);
    }
    const featuresLineIndex = docContentLines.findIndex((line) => line.startsWith("**Features**"));
    if (featuresLineIndex === -1) {
      if (meta.features.length === 0) continue;
      yield* Effect.logError(ansis.red(`  Missing features line in documentation for rule ${rulename}`));
      continue;
    }
    const expectedFeatureIcons = meta.features.map(getFeatureIcon).map((icon: string) => "`" + icon + "`").join(" ");
    const providedFeatureIcons = docContentLines[featuresLineIndex + 2]?.trim() ?? "";
    if (expectedFeatureIcons !== providedFeatureIcons) {
      yield* Effect.logError(ansis.red(`  Found 1 mismatched feature icons in documentation for rule ${rulename}`));
      yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
      yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
    }
    // TODO: Verify presets section as well
  }
});

const verifyRulesOverview = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const targetPath = path.join(...RULES_OVERVIEW_PATH);
  const content = yield* fs.readFileString(targetPath, "utf8");
  const contentLines = content.split("\n");
  yield* Effect.log(ansis.green(`Verifying rules overview at ${targetPath}...`));
  for (const { key, heading } of SECTION_HEADERS) {
    const headerStartIndex = contentLines.findIndex((line) => line.startsWith(`## ${heading}`));
    if (headerStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find section for ${heading} in ${targetPath}`);
    }
    const tableStartIndex = contentLines
      .findIndex((line, index) => index > headerStartIndex && line.startsWith("| Rule"));
    if (tableStartIndex === -1) {
      return yield* Effect.dieMessage(`Could not find table for ${heading} in ${targetPath}`);
    }
    const tableEndIndex = contentLines
      .findIndex((line, index) => index > tableStartIndex && line.trim() === "");
    if (tableEndIndex === -1) {
      return yield* Effect.dieMessage(`Could not find the end of table for ${heading} in ${targetPath}`);
    }
    const tableLines = contentLines.slice(tableStartIndex + 2, tableEndIndex);
    for (const line of tableLines) {
      const columns = line.split("|").slice(1, -1);
      const [link, severities, features, description] = columns;
      if (link == null || severities == null || features == null || description == null) {
        yield* Effect.logError(ansis.red(`Malformed table line (skipped): ${line}`));
        continue;
      }
      const catename = key;
      const rulename = link.match(/\[`([^`]+)`\]/)?.[1];
      if (rulename == null) {
        return yield* Effect.dieMessage(`Could not extract rule name from link: ${link}`);
      }
      const meta = yield* retrieveRuleMeta(catename, rulename);
      const expectedRuleLink = `[\`${rulename}\`](${catename === "x" ? "" : catename + "-"}${rulename})`;
      const providedRuleLink = link.trim();
      if (expectedRuleLink !== providedRuleLink) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched link for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedRuleLink)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedRuleLink)}`);
      }
      const expectedDescription = meta.description.replace(/\.$/, "");
      const providedDescription = description.trim().replaceAll("`", "'");
      if (expectedDescription !== providedDescription) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched description for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedDescription)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedDescription)}`);
      }
      const expectedSeverityIcons = `${getSeverityIcon(meta.severities[0])} ${getSeverityIcon(meta.severities[1])}`;
      const providedSeverityIcons = severities.trim();
      if (expectedSeverityIcons !== providedSeverityIcons) {
        yield* Effect.logError(ansis.red(`Found 1 mismatched severity icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedSeverityIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedSeverityIcons)}`);
      }
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
  // Verify the rules overview matches the actual rule definitions
  yield* verifyRulesOverview;
  // Verify the rules documentations match the actual rule definitions
  yield* verifyRulesMarkdowns;
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
