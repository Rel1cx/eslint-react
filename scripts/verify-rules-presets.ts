import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import { P, match } from "ts-pattern";

import { glob } from "./lib/glob";

// Import all plugin configs
import * as debugAll from "../packages/plugins/eslint-plugin-react-debug/src/configs/all";
import * as domRecommended from "../packages/plugins/eslint-plugin-react-dom/src/configs/recommended";
import * as domStrict from "../packages/plugins/eslint-plugin-react-dom/src/configs/strict";
import * as hooksExtraRecommended from "../packages/plugins/eslint-plugin-react-hooks-extra/src/configs/recommended";
import * as namingConventionRecommended from "../packages/plugins/eslint-plugin-react-naming-convention/src/configs/recommended";
import * as webApiRecommended from "../packages/plugins/eslint-plugin-react-web-api/src/configs/recommended";
import * as xDisableExperimental from "../packages/plugins/eslint-plugin-react-x/src/configs/disable-experimental";
import * as xDisableTypeChecked from "../packages/plugins/eslint-plugin-react-x/src/configs/disable-type-checked";
import * as xRecommended from "../packages/plugins/eslint-plugin-react-x/src/configs/recommended";
import * as xRecommendedTypeChecked from "../packages/plugins/eslint-plugin-react-x/src/configs/recommended-type-checked";
import * as xRecommendedTypescript from "../packages/plugins/eslint-plugin-react-x/src/configs/recommended-typescript";
import * as xStrict from "../packages/plugins/eslint-plugin-react-x/src/configs/strict";
import * as xStrictTypeChecked from "../packages/plugins/eslint-plugin-react-x/src/configs/strict-type-checked";
import * as xStrictTypescript from "../packages/plugins/eslint-plugin-react-x/src/configs/strict-typescript";

// Config definitions to verify
const CONFIGS = [
  // react-x configs
  { name: "react-x/recommended", config: xRecommended },
  { name: "react-x/strict", config: xStrict },
  { name: "react-x/recommended-type-checked", config: xRecommendedTypeChecked },
  { name: "react-x/strict-type-checked", config: xStrictTypeChecked },
  { name: "react-x/recommended-typescript", config: xRecommendedTypescript },
  { name: "react-x/strict-typescript", config: xStrictTypescript },
  { name: "react-x/disable-experimental", config: xDisableExperimental },
  { name: "react-x/disable-type-checked", config: xDisableTypeChecked },
  // react-dom configs
  { name: "react-dom/recommended", config: domRecommended },
  { name: "react-dom/strict", config: domStrict },
  // react-hooks-extra configs
  { name: "react-hooks-extra/recommended", config: hooksExtraRecommended },
  // react-web-api configs
  { name: "react-web-api/recommended", config: webApiRecommended },
  // react-naming-convention configs
  { name: "react-naming-convention/recommended", config: namingConventionRecommended },
  // react-debug configs
  { name: "react-debug/all", config: debugAll },
] as const;

// Plugin domains to check
const PLUGINS = [
  { name: "react-x", domain: "x", prefix: "" },
  { name: "react-dom", domain: "dom", prefix: "react-dom/" },
  { name: "react-hooks-extra", domain: "hooks-extra", prefix: "react-hooks-extra/" },
  { name: "react-web-api", domain: "web-api", prefix: "react-web-api/" },
  { name: "react-naming-convention", domain: "naming-convention", prefix: "react-naming-convention/" },
  { name: "react-debug", domain: "debug", prefix: "react-debug/" },
] as const;

// Convert ESLint severity config to numeric value (0=off, 1=warn, 2=error)
const getSeverity = (x: unknown): number =>
  match(x)
    .with("off", () => 0)
    .with("warn", () => 1)
    .with("error", () => 2)
    .with(P.number, (n) => n)
    .with(P.array(), ([s]) => getSeverity(s)) // Handle array config like ["error", options]
    .otherwise(() => 0);

// Extract domain from a rule name (the part before /)
const getDomainFromRuleName = (ruleName: string): string => {
  const parts = ruleName.split("/");
  if (parts.length < 2) return "x";
  const domain = parts[0];
  // Map plugin name to domain
  return match(domain)
    .with("react-x", () => "x")
    .with("react-dom", () => "dom")
    .with("react-hooks-extra", () => "hooks-extra")
    .with("react-web-api", () => "web-api")
    .with("react-naming-convention", () => "naming-convention")
    .with("react-debug", () => "debug")
    .otherwise(() => domain);
};

// Extract short rule name (the part after /)
const getShortRuleName = (ruleName: string): string => {
  const parts = ruleName.split("/");
  if (parts.length < 2) return ruleName;
  return parts.slice(1).join("/");
};

// Get rules from a plugin by domain
const getPluginRules = Effect.fnUntraced(
  function*(domain: string) {
    const pluginModule = yield* Effect.tryPromise(() => {
      return match(domain)
        .with("x", () => import("../packages/plugins/eslint-plugin-react-x/src/plugin"))
        .with("dom", () => import("../packages/plugins/eslint-plugin-react-dom/src/plugin"))
        .with("hooks-extra", () => import("../packages/plugins/eslint-plugin-react-hooks-extra/src/plugin"))
        .with("web-api", () => import("../packages/plugins/eslint-plugin-react-web-api/src/plugin"))
        .with("naming-convention", () => import("../packages/plugins/eslint-plugin-react-naming-convention/src/plugin"))
        .with("debug", () => import("../packages/plugins/eslint-plugin-react-debug/src/plugin"))
        .otherwise(() => Effect.fail(new Error(`Unknown domain: ${domain}`)));
    });

    return pluginModule.plugin.rules;
  },
);

// Verify that all rules in a config exist in the corresponding plugin
const verifyConfig = Effect.fnUntraced(
  function*(configInfo: typeof CONFIGS[number]) {
    const { name: configName, config } = configInfo;
    const rules = config.rules;

    yield* Effect.log(ansis.blue(`Verifying config: ${configName}...`));

    let errors = 0;
    const ruleEntries = Object.entries(rules);

    for (const [ruleName, severity] of ruleEntries) {
      // Skip non-plugin rules (e.g., from other plugins)
      const domain = getDomainFromRuleName(ruleName);
      const shortRuleName = getShortRuleName(ruleName);

      // Get plugin rules for this domain
      const pluginRules = yield* getPluginRules(domain);

      // Check if rule exists in plugin
      if (!Object.prototype.hasOwnProperty.call(pluginRules, shortRuleName)) {
        yield* Effect.logError(
          ansis.red(`  Rule "${ruleName}" is configured but does not exist in the plugin`),
        );
        errors++;
        continue;
      }

      // Check if severity is valid (0, 1, 2, "off", "warn", "error", or array)
      const severityValue = getSeverity(severity);
      if (severityValue === 0 && severity !== 0 && severity !== "off" && !Array.isArray(severity)) {
        // Check if it's an array config with options
        if (Array.isArray(severity) && severity.length > 0) {
          const firstElement = severity[0];
          if (!["off", "warn", "error"].includes(firstElement) && ![0, 1, 2].includes(firstElement)) {
            yield* Effect.logError(
              ansis.red(`  Rule "${ruleName}" has invalid severity: ${JSON.stringify(severity)}`),
            );
            errors++;
          }
        }
      }
    }

    // Verify that the config name matches the exported name
    if (config.name !== configName) {
      yield* Effect.logError(
        ansis.red(`  Config name mismatch: exported "${config.name}" but expected "${configName}"`),
      );
      errors++;
    }

    // Verify that plugins are defined
    if (!config.plugins || Object.keys(config.plugins).length === 0) {
      yield* Effect.logWarning(
        ansis.yellow(`  Config "${configName}" does not define any plugins`),
      );
    }

    // Check for rules that are in plugin but not in any config (optional, for recommended/strict)
    if (configName.endsWith("/recommended") || configName.endsWith("/strict") || configName.endsWith("/all")) {
      const domain = getDomainFromRuleName(ruleEntries[0]?.[0] ?? "react-x/test");
      if (domain !== "x" || configName.startsWith("react-x/")) {
        const pluginRules = yield* getPluginRules(domain);
        const pluginRuleNames = Object.keys(pluginRules);
        const configRuleNames = ruleEntries
          .filter(([name]) => getDomainFromRuleName(name) === domain)
          .map(([name]) => getShortRuleName(name));

        const missingFromConfig = pluginRuleNames.filter(
          (name) => !configRuleNames.includes(name) && !name.startsWith("_"),
        );

        if (missingFromConfig.length > 0 && configName.endsWith("/all")) {
          // For "all" configs, all rules should be included
          yield* Effect.logWarning(
            ansis.yellow(`  Rules missing from "${configName}": ${missingFromConfig.join(", ")}`),
          );
        }
      }
    }

    if (errors === 0) {
      yield* Effect.log(ansis.green(`  Config "${configName}" is valid (${ruleEntries.length} rules)`));
    } else {
      yield* Effect.logError(ansis.red(`  Config "${configName}" has ${errors} error(s)`));
    }

    return errors;
  },
);

// Verify that rule prefixes match the domain
const verifyRulePrefixes = Effect.gen(function*() {
  yield* Effect.log(ansis.blue("Verifying rule prefixes in configs..."));

  let errors = 0;

  for (const { name: configName, config } of CONFIGS) {
    const rules = config.rules;

    for (const ruleName of Object.keys(rules)) {
      const domain = getDomainFromRuleName(ruleName);

      // Check that the rule prefix matches the expected domain
      if (ruleName.includes("/")) {
        const prefix = ruleName.split("/")[0];
        const expectedPrefix = match(domain)
          .with("x", () => "react-x")
          .otherwise(() => {
            // For other domains, the prefix should match the plugin name
            return `react-${domain}`;
          });

        // Special case for hooks-extra and naming-convention which have longer names
        const actualExpectedPrefix = match(domain)
          .with("hooks-extra", () => "react-hooks-extra")
          .with("naming-convention", () => "react-naming-convention")
          .with("web-api", () => "react-web-api")
          .otherwise(() => expectedPrefix);

        if (!prefix.startsWith(actualExpectedPrefix)) {
          yield* Effect.logError(
            ansis.red(`  Rule "${ruleName}" in "${configName}" has unexpected prefix "${prefix}"`),
          );
          errors++;
        }
      }
    }
  }

  if (errors === 0) {
    yield* Effect.log(ansis.green("  All rule prefixes are correct"));
  } else {
    yield* Effect.logError(ansis.red(`  Found ${errors} prefix error(s)`));
  }

  return errors;
});

// Verify consistency between related configs (e.g., strict extends recommended)
const verifyConfigConsistency = Effect.gen(function*() {
  yield* Effect.log(ansis.blue("Verifying config consistency..."));

  let errors = 0;

  // Verify that strict configs contain all rules from recommended configs
  const configPairs = [
    { recommended: xRecommended, strict: xStrict, name: "react-x" },
    { recommended: domRecommended, strict: domStrict, name: "react-dom" },
  ];

  for (const { recommended, strict, name } of configPairs) {
    const recommendedRules = Object.entries(recommended.rules);

    for (const [ruleName, severity] of recommendedRules) {
      // Check if strict config also has this rule (it should)
      if (!Object.prototype.hasOwnProperty.call(strict.rules, ruleName)) {
        yield* Effect.logWarning(
          ansis.yellow(`  Rule "${ruleName}" is in ${name}/recommended but not in ${name}/strict`),
        );
      } else {
        // Check that strict severity is >= recommended severity
        const recommendedSeverity = getSeverity(severity);
        const strictSeverity = getSeverity(strict.rules[ruleName as keyof typeof strict.rules]);

        if (strictSeverity < recommendedSeverity) {
          yield* Effect.logError(
            ansis.red(
              `  Rule "${ruleName}" has higher severity in recommended (${recommendedSeverity}) than strict (${strictSeverity})`,
            ),
          );
          errors++;
        }
      }
    }
  }

  // Verify that typescript configs extend base configs
  if (xRecommendedTypescript.rules) {
    const baseRules = Object.keys(xRecommended.rules);
    for (const ruleName of baseRules) {
      if (!Object.prototype.hasOwnProperty.call(xRecommendedTypescript.rules, ruleName)) {
        yield* Effect.logWarning(
          ansis.yellow(`  Rule "${ruleName}" is in react-x/recommended but not in react-x/recommended-typescript`),
        );
      }
    }
  }

  if (xStrictTypescript.rules) {
    const baseRules = Object.keys(xStrict.rules);
    for (const ruleName of baseRules) {
      if (!Object.prototype.hasOwnProperty.call(xStrictTypescript.rules, ruleName)) {
        yield* Effect.logWarning(
          ansis.yellow(`  Rule "${ruleName}" is in react-x/strict but not in react-x/strict-typescript`),
        );
      }
    }
  }

  if (errors === 0) {
    yield* Effect.log(ansis.green("  Config consistency verified"));
  } else {
    yield* Effect.logError(ansis.red(`  Found ${errors} consistency error(s)`));
  }

  return errors;
});

const program = Effect.gen(function*() {
  let totalErrors = 0;

  // Verify each config
  for (const configInfo of CONFIGS) {
    const errors = yield* verifyConfig(configInfo);
    totalErrors += errors;
  }

  // Verify rule prefixes
  const prefixErrors = yield* verifyRulePrefixes;
  totalErrors += prefixErrors;

  // Verify config consistency
  const consistencyErrors = yield* verifyConfigConsistency;
  totalErrors += consistencyErrors;

  // Summary
  yield* Effect.log("");
  if (totalErrors === 0) {
    yield* Effect.log(ansis.green("All configs are valid!"));
  } else {
    yield* Effect.logError(ansis.red(`Found ${totalErrors} total error(s)`));
    yield* Effect.fail(new Error("Config verification failed"));
  }
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
