import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { glob } from "./lib/glob";

import * as allConfig from "../plugins/eslint-plugin/src/configs/all";
import * as disableExperimentalConfig from "../plugins/eslint-plugin/src/configs/disable-experimental";
import * as disableTypeCheckedConfig from "../plugins/eslint-plugin/src/configs/disable-type-checked";
import * as domConfig from "../plugins/eslint-plugin/src/configs/dom";
import * as jsxConfig from "../plugins/eslint-plugin/src/configs/jsx";
import * as namingConventionConfig from "../plugins/eslint-plugin/src/configs/naming-convention";
import * as recommendedConfig from "../plugins/eslint-plugin/src/configs/recommended";
import * as rscConfig from "../plugins/eslint-plugin/src/configs/rsc";
import * as strictConfig from "../plugins/eslint-plugin/src/configs/strict";
import * as webApiConfig from "../plugins/eslint-plugin/src/configs/web-api";

const RULES_GLOB = ["plugins/eslint-plugin-react-*/src/rules/*/*.ts"];

const DOMAINS = [
  { key: "x", prefix: "" },
  { key: "dom", prefix: "dom-" },
  { key: "jsx", prefix: "jsx-" },
  { key: "rsc", prefix: "rsc-" },
  { key: "web-api", prefix: "web-api-" },
  { key: "naming-convention", prefix: "naming-convention-" },
] as const;

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

function buildConfigKey(domain: string, ruleName: string): string {
  const domainInfo = DOMAINS.find((d) => d.key === domain);
  if (domainInfo == null) return `@eslint-react/${ruleName}`;
  return domainInfo.prefix === ""
    ? `@eslint-react/${ruleName}`
    : `@eslint-react/${domainInfo.prefix}${ruleName}`;
}

const collectRegisteredRules = Effect.gen(function*() {
  const path = yield* Path.Path;
  const files = glob(RULES_GLOB)
    .filter((file) => !file.endsWith(".spec.ts") && !file.endsWith(".test.ts"))
    .filter((file) => file.split(path.sep).at(-1) !== "lib.ts");

  const rules: RegisteredRule[] = [];

  for (const file of files) {
    const domain = /^plugins\/eslint-plugin-react-([^/]+)/u.exec(file)?.[1] ?? "";
    if (domain === "debug") continue;
    const mod = yield* Effect.tryPromise(() => import(`../${file}`));
    const ruleName = mod.RULE_NAME;
    if (typeof ruleName !== "string") continue;
    const configKey = buildConfigKey(domain, ruleName);
    rules.push({ domain, name: ruleName, configKey });
  }

  return rules;
});

const verifyAllRulesAccountedFor = Effect.fnUntraced(
  function*(rules: RegisteredRule[]) {
    yield* Effect.log(ansis.bold("1. Checking all registered rules are accounted for in configs..."));

    const allRuleKeys = new Set(Object.keys(allConfig.rules));
    const experimentalKeys = new Set(Object.keys(disableExperimentalConfig.rules));
    const typeCheckedKeys = new Set(Object.keys(disableTypeCheckedConfig.rules));

    let errorCount = 0;
    for (const rule of rules) {
      if (
        !allRuleKeys.has(rule.configKey)
        && !experimentalKeys.has(rule.configKey)
        && !typeCheckedKeys.has(rule.configKey)
      ) {
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

const verifyConfigKeysValid = Effect.fnUntraced(
  function*(rules: RegisteredRule[], configName: string, configRules: Record<string, unknown>) {
    const validKeys = new Set(rules.map((r) => r.configKey));
    let errorCount = 0;

    for (const key of Object.keys(configRules)) {
      if (!validKeys.has(key)) {
        yield* Effect.logError(
          ansis.red(`  Config ${ansis.bold(configName)} references unknown rule: ${ansis.bold(key)}`),
        );
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      yield* Effect.log(ansis.green(`  Config ${configName}: all rule keys are valid.`));
    }

    return errorCount;
  },
);

const verifyHierarchy = Effect.fnUntraced(
  function*(
    parentName: string,
    parentRules: Record<string, unknown>,
    childName: string,
    childRules: Record<string, unknown>,
  ) {
    const parentKeys = new Set(Object.keys(parentRules));
    const childKeys = new Set(Object.keys(childRules));
    let errorCount = 0;

    for (const key of parentKeys) {
      if (!childKeys.has(key)) {
        yield* Effect.logError(
          ansis.red(
            `  Rule ${ansis.bold(key)} is in ${ansis.bold(parentName)} but missing from ${ansis.bold(childName)}`,
          ),
        );
        errorCount += 1;
      }
    }

    if (errorCount === 0) {
      yield* Effect.log(ansis.green(`  ${parentName} ⊂ ${childName}: hierarchy is valid.`));
    }

    return errorCount;
  },
);

const verifyDomainConfigCompleteness = Effect.fnUntraced(
  function*(rules: RegisteredRule[]) {
    yield* Effect.log(ansis.bold("4. Checking domain config integrity..."));

    let errorCount = 0;

    for (const [domain, configRules] of Object.entries(DOMAIN_CONFIGS)) {
      const domainInfo = DOMAINS.find((d) => d.key === domain);
      if (domainInfo == null) continue;

      const domainRules = rules.filter((r) => r.domain === domain);
      const configKeys = Object.keys(configRules);
      const domainRuleKeys = new Set(domainRules.map((r) => r.configKey));

      for (const key of configKeys) {
        if (!domainRuleKeys.has(key)) {
          yield* Effect.logError(
            ansis.red(
              `  Config ${ansis.bold(domain)}.ts contains rule ${
                ansis.bold(key)
              } which is not registered in react-${domain} plugin`,
            ),
          );
          errorCount += 1;
        }
      }

      const configKeySet = new Set(configKeys);
      const untrackedRules = domainRules.filter((r) => !configKeySet.has(r.configKey));
      if (untrackedRules.length > 0) {
        yield* Effect.log(
          ansis.dim(
            `  Domain ${domain}.ts: ${untrackedRules.length} rule(s) not in base config (strict/all only): ${
              untrackedRules.map((r) => r.name).join(", ")
            }`,
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

  const accountedErrors = yield* verifyAllRulesAccountedFor(rules);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("2. Checking config keys reference valid rules..."));
  const allKeyErrors = yield* verifyConfigKeysValid(rules, "all", allConfig.rules);
  const recommendedKeyErrors = yield* verifyConfigKeysValid(rules, "recommended", recommendedConfig.rules);
  const strictKeyErrors = yield* verifyConfigKeysValid(rules, "strict", strictConfig.rules);
  const experimentalKeyErrors = yield* verifyConfigKeysValid(
    rules,
    "disable-experimental",
    disableExperimentalConfig.rules,
  );
  const typeCheckedKeyErrors = yield* verifyConfigKeysValid(
    rules,
    "disable-type-checked",
    disableTypeCheckedConfig.rules,
  );

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("3. Checking preset hierarchy..."));
  const recStrictErrors = yield* verifyHierarchy("recommended", recommendedConfig.rules, "strict", strictConfig.rules);
  const strictAllErrors = yield* verifyHierarchy("strict", strictConfig.rules, "all", allConfig.rules);

  yield* Effect.log("");
  const domainErrors = yield* verifyDomainConfigCompleteness(rules);

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
