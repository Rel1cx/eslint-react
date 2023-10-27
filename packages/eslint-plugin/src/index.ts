export type * from "./eslint-define-config";

import * as debug from "@eslint-react/eslint-plugin-debug";
import * as hooks from "@eslint-react/eslint-plugin-hooks";
import * as jsx from "@eslint-react/eslint-plugin-jsx";
import * as namingConvention from "@eslint-react/eslint-plugin-naming-convention";
import * as react from "@eslint-react/eslint-plugin-react";
import { entries, fromEntries } from "@eslint-react/tools";
import type { RulePreset } from "@eslint-react/types";
// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";

const rules = {
    "debug/class-component": "warn",
    "debug/function-component": "warn",
    "hooks/ensure-custom-hooks-using-other-hooks": "warn",
    "jsx/no-array-index-key": "error",
    "jsx/no-duplicate-key": "error",
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-missing-key": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/prefer-shorthand-boolean": "warn",
    "naming-convention/filename": "warn",
    "naming-convention/filename-extension": "warn",
    "react/no-constructed-context-value": "error",
    "react/no-dangerously-set-innerhtml": "error",
    "react/no-dangerously-set-innerhtml-with-children": "error",
    "react/no-string-refs": "error",
    "react/no-unstable-default-props": "error",
    "react/no-unstable-nested-components": "error",
} as const satisfies RulePreset;

const recommendedRules = {
    "jsx/no-array-index-key": "error",
    "jsx/no-duplicate-key": "error",
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-missing-key": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/no-script-url": "error",
    "jsx/prefer-shorthand-boolean": "warn",
    "react/no-constructed-context-value": "error",
    "react/no-dangerously-set-innerhtml": "error",
    "react/no-dangerously-set-innerhtml-with-children": "error",
    "react/no-string-refs": "error",
    "react/no-unstable-default-props": "error",
    "react/no-unstable-nested-components": "error",
} as const satisfies RulePreset;

const rulesEntries = entries(rules);
const allRules = fromEntries(rulesEntries.filter(([key]) => !key.startsWith("debug/")));
const offRules = fromEntries(rulesEntries.map(([key]) => [key, "off"]));
const jsxRules = fromEntries(rulesEntries.filter(([key]) => key.startsWith("jsx/")));
const debugRules = fromEntries(rulesEntries.filter(([key]) => key.startsWith("debug/")));

const plugins = {
    "@eslint-react/debug": debug,
    "@eslint-react/hooks": hooks,
    "@eslint-react/jsx": jsx,
    "@eslint-react/naming-convention": namingConvention,
    "@eslint-react/react": react,
} as const;

const createRules = (rules: RulePreset) => {
    return fromEntries(entries(rules).map(([key, value]) => [`@eslint-react/${key}`, value] as const));
};

const createLegacyConfig = (rules: RulePreset) => {
    return {
        plugins: ["@eslint-react"],
        rules: createRules(rules),
    };
};

const createConfig = (rules: RulePreset) => {
    return {
        plugins,
        rules: createRules(rules),
    };
};

const createRulesWithPrefix = <T extends Record<string, unknown>, U extends string>(rules: T, prefix: U) => {
    return fromEntries(entries(rules).map(([key, value]) => [`${prefix}/${String(key)}`, value])) as {
        [K in Extract<keyof T, string> as `${U}/${K}`]: T[K];
    };
};

export default {
    meta: {
        name,
        version,
    },
    configs: {
        "all-legacy": createLegacyConfig(allRules),
        "debug-legacy": createLegacyConfig(debugRules),
        "jsx-legacy": createLegacyConfig(jsxRules),
        "off-legacy": createLegacyConfig(offRules),
        "recommended-legacy": createLegacyConfig(recommendedRules),
        "recommended-type-checked-legacy": createLegacyConfig(recommendedRules),
        // eslint-disable-next-line perfectionist/sort-objects
        all: createConfig(allRules),
        debug: createConfig(debugRules),
        jsx: createConfig(jsxRules),
        off: createConfig(offRules),
        recommended: createConfig(recommendedRules),
        "recommended-type-checked": createConfig(recommendedRules),
    },
    rules: {
        ...createRulesWithPrefix(debug.rules, "debug"),
        ...createRulesWithPrefix(hooks.rules, "hooks"),
        ...createRulesWithPrefix(jsx.rules, "jsx"),
        ...createRulesWithPrefix(namingConvention.rules, "naming-convention"),
        ...createRulesWithPrefix(react.rules, "react"),
    },
} as const;
