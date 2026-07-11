import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import { identity } from "effect";
import * as Effect from "effect/Effect";
import * as NodePath from "node:path";
import { pathToFileURL } from "node:url";
import { P, match } from "ts-pattern";
import { DOMAIN_METAS, DOMAIN_META_BY_KEY, EXCLUDED_VERIFY_DOMAINS, PLUGIN_DOMAINS, type PluginDomain, buildConfigKey, entries, keys } from "./00-constants";
import { glob, isRuleEntryFile } from "./01-helpers";

import * as allConfig from "#/plugins/eslint-plugin/src/configs/all";
import * as disableExperimentalConfig from "#/plugins/eslint-plugin/src/configs/disable-experimental";
import * as disableTypeCheckedConfig from "#/plugins/eslint-plugin/src/configs/disable-type-checked";
import * as domConfig from "#/plugins/eslint-plugin/src/configs/dom";
import * as jsxConfig from "#/plugins/eslint-plugin/src/configs/jsx";
import * as namingConventionConfig from "#/plugins/eslint-plugin/src/configs/naming-convention";
import * as recommendedConfig from "#/plugins/eslint-plugin/src/configs/recommended";
import * as recommendedTypeCheckedConfig from "#/plugins/eslint-plugin/src/configs/recommended-type-checked";
import * as recommendedTypeScriptConfig from "#/plugins/eslint-plugin/src/configs/recommended-typescript";
import * as rscConfig from "#/plugins/eslint-plugin/src/configs/rsc";
import * as strictConfig from "#/plugins/eslint-plugin/src/configs/strict";
import * as strictTypeCheckedConfig from "#/plugins/eslint-plugin/src/configs/strict-type-checked";
import * as strictTypeScriptConfig from "#/plugins/eslint-plugin/src/configs/strict-typescript";
import * as webApiConfig from "#/plugins/eslint-plugin/src/configs/web-api";
import * as xConfig from "#/plugins/eslint-plugin/src/configs/x";

const RULES_GLOB = ["plugins/eslint-plugin-react-*/src/rules/*/*.ts"];

const DOMAIN_CONFIGS: Record<string, Record<string, unknown>> = {
  "naming-convention": namingConventionConfig.rules,
  "web-api": webApiConfig.rules,
  dom: domConfig.rules,
  jsx: jsxConfig.rules,
  rsc: rscConfig.rules,
};

interface RegisteredRule {
  readonly name: string;
  readonly configKey: string;
  readonly domain: string;
}

const collectRegisteredRules = Effect.gen(function*() {
  const files = glob(RULES_GLOB).filter(isRuleEntryFile);

  const rules: RegisteredRule[] = [];

  for (const file of files) {
    const domain = /^plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    if (!PLUGIN_DOMAINS.includes(domain as PluginDomain) || EXCLUDED_VERIFY_DOMAINS.has(domain as PluginDomain)) continue;
    const meta = DOMAIN_META_BY_KEY[domain as PluginDomain];
    const mod = yield* Effect.tryPromise(() => import(pathToFileURL(NodePath.resolve(file)).href));
    const ruleName = mod.RULE_NAME;
    if (typeof ruleName !== "string") continue;
    const configKey = buildConfigKey(meta.key, ruleName);
    rules.push({ domain, name: ruleName, configKey });
  }

  return rules;
});

const checkAllRulesAccountedFor = Effect.fnUntraced(
  function*(rules: RegisteredRule[]) {
    yield* Effect.log(ansis.bold("1. Checking all registered rules are accounted for in configs..."));

    const allRuleKeys = new Set<string>(keys(allConfig.rules));
    const experimentalKeys = new Set(keys(disableExperimentalConfig.rules));
    const typeCheckedKeys = new Set(keys(disableTypeCheckedConfig.rules));

    let errorCount = 0;
    for (const rule of rules) {
      if (!allRuleKeys.has(rule.configKey) && !experimentalKeys.has(rule.configKey) && !typeCheckedKeys.has(rule.configKey)) {
        yield* Effect.logError(
          ansis.red(
            `  Rule ${
              ansis.bold(rule.configKey)
            } is registered in react-${rule.domain} plugin but not found in all.ts, disable-experimental.ts, or disable-type-checked.ts`,
          ),
        );
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      yield* Effect.log(ansis.green("  All registered rules are accounted for."));
    }

    return errorCount;
  },
);

const checkConfigKeysValid = Effect.fnUntraced(
  function*(rules: RegisteredRule[], configName: string, configRules: Record<string, unknown>) {
    const validKeys = new Set(rules.map((r) => r.configKey));
    let errorCount = 0;

    for (const key of keys(configRules)) {
      if (!validKeys.has(key)) {
        yield* Effect.logError(ansis.red(`  Config ${ansis.bold(configName)} references unknown rule: ${ansis.bold(key)}`));
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      yield* Effect.log(ansis.green(`  Config ${configName}: all rule keys are valid.`));
    }

    return errorCount;
  },
);

const checkHierarchy = Effect.fnUntraced(
  function*(
    parentName: string,
    parentRules: Record<string, unknown>,
    childName: string,
    childRules: Record<string, unknown>,
  ) {
    const parentKeys = new Set(keys(parentRules));
    const childKeys = new Set(keys(childRules));
    let errorCount = 0;

    for (const key of parentKeys) {
      if (!childKeys.has(key)) {
        yield* Effect.logError(ansis.red(`  Rule ${ansis.bold(key)} is in ${ansis.bold(parentName)} but missing from ${ansis.bold(childName)}`));
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      yield* Effect.log(ansis.green(`  ${parentName} ⊂ ${childName}: hierarchy is valid.`));
    }

    return errorCount;
  },
);

const checkDomainConfigCompleteness = Effect.fnUntraced(
  function*(rules: RegisteredRule[]) {
    yield* Effect.log(ansis.bold("4. Checking domain config integrity..."));

    let errorCount = 0;

    for (const [domain, configRules] of entries(DOMAIN_CONFIGS)) {
      const domainInfo = DOMAIN_META_BY_KEY[domain as PluginDomain];
      if (domainInfo == null) continue;

      const domainRules = rules.filter((r) => r.domain === domain);
      const configKeys = keys(configRules);
      const domainRuleKeys = new Set(domainRules.map((r) => r.configKey));

      for (const key of configKeys) {
        if (!domainRuleKeys.has(key)) {
          yield* Effect.logError(
            ansis.red(`  Config ${ansis.bold(domain)}.ts contains rule ${ansis.bold(key)} which is not registered in react-${domain} plugin`),
          );
          errorCount += 1;
        }
      }

      const configKeySet = new Set(configKeys);
      const untrackedRules = domainRules.filter((r) => !configKeySet.has(r.configKey));
      if (untrackedRules.length > 0) {
        yield* Effect.log(
          ansis.dim(
            `  Domain ${domain}.ts: ${untrackedRules.length} rule(s) not in base config (strict/all only): ${untrackedRules.map((r) => r.name).join(", ")}`,
          ),
        );
      } else {
        yield* Effect.log(ansis.green(`  Domain config ${domain}.ts: all registered rules are present.`));
      }
    }

    return errorCount;
  },
);

const checkConfigs = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Verifying config consistency..."));
  yield* Effect.log("");

  const rules = yield* collectRegisteredRules;
  yield* Effect.log(`Found ${ansis.bold(rules.length.toString())} registered rules (excluding debug).`);
  yield* Effect.log("");

  const accountedErrors = yield* checkAllRulesAccountedFor(rules);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("2. Checking config keys reference valid rules..."));
  const allKeyErrors = yield* checkConfigKeysValid(rules, "all", allConfig.rules);
  const recommendedKeyErrors = yield* checkConfigKeysValid(rules, "recommended", recommendedConfig.rules);
  const strictKeyErrors = yield* checkConfigKeysValid(rules, "strict", strictConfig.rules);
  const experimentalKeyErrors = yield* checkConfigKeysValid(rules, "disable-experimental", disableExperimentalConfig.rules);
  const typeCheckedKeyErrors = yield* checkConfigKeysValid(rules, "disable-type-checked", disableTypeCheckedConfig.rules);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("3. Checking preset hierarchy..."));
  const recStrictErrors = yield* checkHierarchy("recommended", recommendedConfig.rules, "strict", strictConfig.rules);
  const strictAllErrors = yield* checkHierarchy("strict", strictConfig.rules, "all", allConfig.rules);

  yield* Effect.log("");
  const domainErrors = yield* checkDomainConfigCompleteness(rules);

  const totalErrors = accountedErrors
    + allKeyErrors + recommendedKeyErrors + strictKeyErrors
    + experimentalKeyErrors + typeCheckedKeyErrors
    + recStrictErrors + strictAllErrors
    + domainErrors;

  yield* Effect.log("");
  if (totalErrors === 0) {
    yield* Effect.log(ansis.bold.green("All config consistency checks passed!"));
  } else {
    yield* Effect.log(ansis.bold.red(`Found ${totalErrors} config error(s).`));
  }

  return totalErrors;
});

const PRESETS = [
  { name: "x", config: xConfig.rules },
  { name: "jsx", config: jsxConfig.rules },
  { name: "dom", config: domConfig.rules },
  { name: "rsc", config: rscConfig.rules },
  { name: "web-api", config: webApiConfig.rules },
  { name: "naming-convention", config: namingConventionConfig.rules },
  { name: "recommended", config: recommendedConfig.rules },
  { name: "recommended-typescript", config: recommendedTypeScriptConfig.rules },
  { name: "recommended-type-checked", config: recommendedTypeCheckedConfig.rules },
  { name: "strict", config: strictConfig.rules },
  { name: "strict-typescript", config: strictTypeScriptConfig.rules },
  { name: "strict-type-checked", config: strictTypeCheckedConfig.rules },
] as const;

function getExpectedPresets(configKey: string): string[] {
  return PRESETS.filter(({ config }) => configKey in config).map(({ name }) => name);
}

const RULES_INDEX_PATH = ["apps", "website", "content", "docs", "rules", "index.mdx"];
const SECTION_HEADERS = DOMAIN_METAS.map((meta) => ({
  key: meta.key,
  heading: meta.heading,
}));

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
    const filename = `plugins/eslint-plugin-react-${domain}/src/rules/${name}/${name}.ts`;
    const { default: mod, RULE_FEATURES, RULE_NAME } = yield* Effect.tryPromise(() => import(pathToFileURL(NodePath.resolve(filename)).href));

    // Extract description from the rule's meta.docs
    const description = match(mod)
      .with({ meta: { docs: { description: P.select(P.string) } } }, identity)
      .otherwise(() => "No description available.");

    // Look up severity in recommended and strict presets
    const rEntry = Reflect.get(
      recommendedTypeScriptConfig.rules,
      domain === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${domain}-${RULE_NAME}`,
    );
    const sEntry = Reflect.get(
      strictTypeScriptConfig.rules,
      domain === "x"
        ? `@eslint-react/${RULE_NAME}`
        : `@eslint-react/${domain}-${RULE_NAME}`,
    );

    return {
      name: RULE_NAME,
      description,
      features: RULE_FEATURES,
      severities: [getSeverity(rEntry), getSeverity(sEntry)], // [recommended, strict]
    };
  },
);

// Verify each rule's .mdx documentation matches its source metadata
const checkDocs = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = glob(RULES_GLOB).filter(isRuleEntryFile);

  let errorCount = 0;

  for (const file of files) {
    // Extract domain and rule name from file path
    const domain = /^plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    const basename = path.parse(path.basename(file)).name;
    const filename = path.resolve(file);
    const rulename = `${domain}/${basename}`;
    const rulemeta = yield* retrieveRuleMeta(domain, basename);

    // Read corresponding .mdx documentation file
    const content = yield* fs.readFileString(filename.replace(/\.ts$/u, ".mdx"), "utf8");
    const contentLines = content.split("\n");

    // Verify the description section matches the rule metadata
    const expectedDescription = rulemeta.description;
    const providedDescription = contentLines
      .at(2)
      ?.trim()
      .replace("description: ", "")
      .replaceAll(/^"|"$/gu, "")
      .replaceAll("`", "'");
    if (providedDescription == null || !providedDescription.includes(expectedDescription.replace(/\.$/, "").replaceAll("`", "'"))) {
      errorCount++;
      yield* Effect.logError(ansis.red(`  Found 1 mismatched description in documentation for rule ${rulename}`));
      yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedDescription)}`);
      yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedDescription)}`);
    }

    // Verify the presets section exists if the rule has non-zero severities
    const presetsIndex = contentLines.findIndex((line) => line.startsWith("**Presets**"));
    if (presetsIndex === -1) {
      if (rulemeta.severities.some((severity) => severity !== 0)) {
        errorCount++;
        yield* Effect.logError(ansis.red(`  Missing presets line in documentation for rule ${rulename}`));
      }
    } else {
      // Verify the presets section content matches the actual preset configurations
      const configKey = domain === "x"
        ? `@eslint-react/${basename}`
        : `@eslint-react/${domain}-${basename}`;
      const expectedPresets = getExpectedPresets(configKey);

      const docPresets: string[] = [];
      for (let i = presetsIndex + 1; i < contentLines.length; i++) {
        const line = contentLines[i]!.trim();
        if (line.startsWith("## ") || line.startsWith("**Features**")) break;
        if (line.startsWith("`")) {
          docPresets.push(line.replace(/`/g, ""));
        }
      }

      const docSet = new Set(docPresets);
      const expSet = new Set(expectedPresets);
      const missing = expectedPresets.filter((preset) => !docSet.has(preset));
      const extra = docPresets.filter((preset) => !expSet.has(preset));

      if (missing.length > 0 || extra.length > 0) {
        errorCount++;
        yield* Effect.logError(ansis.red(`  Found mismatched presets in documentation for rule ${rulename}`));
        if (missing.length > 0) {
          yield* Effect.logError(`    Expected but missing: ${ansis.bgGreen(missing.join(", "))}`);
        }
        if (extra.length > 0) {
          yield* Effect.logError(`    Present but unexpected: ${ansis.bgYellow(extra.join(", "))}`);
        }
      }
    }

    // Verify the features section matches the rule metadata
    const featuresIndex = contentLines.findIndex((line) => line.startsWith("**Features**"));
    if (featuresIndex === -1) {
      if (rulemeta.features.length > 0) {
        errorCount++;
        yield* Effect.logError(ansis.red(`  Missing features line in documentation for rule ${rulename}`));
      }
    } else {
      const expectedFeatureIcons = rulemeta
        .features
        .map(getFeatureIcon)
        .map((icon: string) => "`" + icon + "`")
        .join(" ");
      const providedFeatureIcons = contentLines[featuresIndex + 2]?.trim() ?? "";
      if (expectedFeatureIcons !== providedFeatureIcons) {
        errorCount++;
        yield* Effect.logError(ansis.red(`  Found 1 mismatched feature icons in documentation for rule ${rulename}`));
        yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
        yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
      }
    }

    // Verify the resources section contains correct Rule Source and Test Source links
    const resourcesIndex = contentLines.findIndex((line) => line.startsWith("## Resources"));
    if (resourcesIndex === -1) {
      errorCount++;
      yield* Effect.logError(ansis.red(`  Missing resources line in documentation for rule ${rulename}`));
      continue;
    }

    // Find the next section after Resources to limit our search
    const nextSectionIndex = contentLines.findIndex((line, index) => index > resourcesIndex && line.startsWith("## "));
    const resourcesSection = contentLines.slice(resourcesIndex, nextSectionIndex === -1 ? undefined : nextSectionIndex);

    // Verify Rule Source link
    const ruleSourceLine = resourcesSection.find((line) => line.includes("[Rule Source]"));
    const expectedRuleSource = `https://github.com/Rel1cx/eslint-react/tree/main/plugins/eslint-plugin-react-${domain}/src/rules/${basename}/${basename}.ts`;
    if (ruleSourceLine == null) {
      errorCount++;
      yield* Effect.logError(ansis.red(`  Missing Rule Source link in documentation for rule ${rulename}`));
    } else {
      const providedRuleSource = ruleSourceLine.match(/\[Rule Source\]\(([^)]+)\)/)?.[1];
      if (providedRuleSource !== expectedRuleSource) {
        errorCount++;
        yield* Effect.logError(
          ansis.red(`  Found 1 mismatched Rule Source link in documentation for rule ${rulename}`),
        );
        yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedRuleSource)}`);
        yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedRuleSource)}`);
      }
    }

    // Verify Test Source link
    const testSourceLine = resourcesSection.find((line) => line.includes("[Test Source]"));
    const expectedTestSource =
      `https://github.com/Rel1cx/eslint-react/tree/main/plugins/eslint-plugin-react-${domain}/src/rules/${basename}/${basename}.spec.ts`;
    if (testSourceLine == null) {
      errorCount++;
      yield* Effect.logError(ansis.red(`  Missing Test Source link in documentation for rule ${rulename}`));
    } else {
      const providedTestSource = testSourceLine.match(/\[Test Source\]\(([^)]+)\)/)?.[1];
      if (providedTestSource !== expectedTestSource) {
        errorCount++;
        yield* Effect.logError(
          ansis.red(`  Found 1 mismatched Test Source link in documentation for rule ${rulename}`),
        );
        yield* Effect.logError(`    Expected: ${ansis.bgGreen(expectedTestSource)}`);
        yield* Effect.logError(`    Provided: ${ansis.bgYellow(providedTestSource)}`);
      }
    }
  }

  return errorCount;
});

// Verify the index.mdx "View by Domain" table entries match the actual rule metadata
const checkIndex = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const target = path.join(...RULES_INDEX_PATH);
  const content = yield* fs.readFileString(target, "utf8");
  const contentLines = content.split("\n");
  const checkIndexStart = contentLines.findIndex((line) => line.startsWith(`## X Rules`));
  const checkIndexEnd = contentLines.findIndex((line) => line.startsWith(`## See Also`));
  const relevantLines = contentLines.slice(checkIndexStart, checkIndexEnd === -1 ? undefined : checkIndexEnd).map((line) => line.trim());

  yield* Effect.log(ansis.green(`Verifying rules index at ${target}...`));

  let errorCount = 0;

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
        errorCount++;
        yield* Effect.logError(ansis.red(`Malformed table line (skipped): ${line}`));
        continue;
      }

      const domain = key;
      const rulename = link.match(/\[`([^`]+)`\]/)?.[1];
      if (rulename == null) {
        errorCount++;
        yield* Effect.logError(ansis.red(`Could not extract rule name from link (skipped): ${link}`));
        continue;
      }

      const meta = yield* retrieveRuleMeta(domain, rulename);

      // Verify link format
      const expectedLink = `[\`${rulename}\`](/docs/rules/${domain === "x" ? "" : domain + "-"}${rulename})`;
      const providedLink = link.trim();
      if (expectedLink !== providedLink) {
        errorCount++;
        yield* Effect.logError(ansis.red(`Found 1 mismatched link for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedLink)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedLink)}`);
      }

      // Verify the description text
      const expectedDescription = meta.description.replace(/\.$/, "").replaceAll("`", "'");
      const providedDescription = description.trim().replaceAll("`", "'");
      if (expectedDescription !== providedDescription) {
        errorCount++;
        yield* Effect.logError(ansis.red(`Found 1 mismatched description for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedDescription)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedDescription)}`);
      }

      // Verify feature icons match the rule features
      const expectedFeatureIcons = meta.features.map(getFeatureIcon).map((icon: string) => "`" + icon + "`").join(" ");
      const providedFeatureIcons = features.trim();
      if (expectedFeatureIcons !== providedFeatureIcons) {
        errorCount++;
        yield* Effect.logError(ansis.red(`Found 1 mismatched feature icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedFeatureIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedFeatureIcons)}`);
      }

      // Verify severity icons match preset configurations
      const expectedSeverityIcons = `${getSeverityIcon(meta.severities[0])} ${getSeverityIcon(meta.severities[1])}`;
      const providedSeverityIcons = severities.trim();
      if (expectedSeverityIcons !== providedSeverityIcons) {
        errorCount++;
        yield* Effect.logError(ansis.red(`Found 1 mismatched severity icons for rule ${rulename}`));
        yield* Effect.logError(`  Expected: ${ansis.bgGreen(expectedSeverityIcons)}`);
        yield* Effect.logError(`  Provided: ${ansis.bgYellow(providedSeverityIcons)}`);
      }
    }
  }

  return errorCount;
});

const program = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Verifying rules..."));
  yield* Effect.log("");

  const configErrors = yield* checkConfigs;

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Verifying rule documentation..."));
  const docsErrors = yield* checkDocs;

  yield* Effect.log("");
  const indexErrors = yield* checkIndex;
  const totalErrors = configErrors + docsErrors + indexErrors;

  yield* Effect.log("");
  if (totalErrors === 0) {
    yield* Effect.log(ansis.bold.green("All rule checks passed!"));
  } else {
    yield* Effect.log(ansis.bold.red(`Found ${totalErrors} rule error(s).`));
    return yield* Effect.fail(`Rule verification failed with ${totalErrors} error(s).`);
  }
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
