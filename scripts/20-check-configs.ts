import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import * as NodePath from "node:path";
import { pathToFileURL } from "node:url";
import { DOMAIN_META_BY_KEY, EXCLUDED_VERIFY_DOMAINS, PLUGIN_DOMAINS, type PluginDomain, buildConfigKey, entries, keys } from "./00-constants";
import { glob, isRuleEntryFile } from "./01-helpers";

import * as allConfig from "#/plugins/eslint-plugin/src/configs/all";
import * as disableExperimentalConfig from "#/plugins/eslint-plugin/src/configs/disable-experimental";
import * as disableTypeCheckedConfig from "#/plugins/eslint-plugin/src/configs/disable-type-checked";
import * as domConfig from "#/plugins/eslint-plugin/src/configs/dom";
import * as jsxConfig from "#/plugins/eslint-plugin/src/configs/jsx";
import * as namingConventionConfig from "#/plugins/eslint-plugin/src/configs/naming-convention";
import * as recommendedConfig from "#/plugins/eslint-plugin/src/configs/recommended";
import * as rscConfig from "#/plugins/eslint-plugin/src/configs/rsc";
import * as strictConfig from "#/plugins/eslint-plugin/src/configs/strict";
import * as webApiConfig from "#/plugins/eslint-plugin/src/configs/web-api";

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

const program = Effect.gen(function*() {
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

  if (totalErrors === 0) {
    yield* Effect.log("");
    yield* Effect.log(ansis.bold.green("All config consistency checks passed!"));
  } else {
    yield* Effect.log("");
    yield* Effect.log(ansis.bold.red(`Found ${totalErrors} error(s).`));
    return yield* Effect.fail(new Error(`Config verification failed with ${totalErrors} error(s).`));
  }
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
