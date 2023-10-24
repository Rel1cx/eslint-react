import * as debug from "@eslint-react/eslint-plugin-debug";
import * as hooks from "@eslint-react/eslint-plugin-hooks";
import * as jsx from "@eslint-react/eslint-plugin-jsx";
import * as namingConvention from "@eslint-react/eslint-plugin-naming-convention";
import * as react from "@eslint-react/eslint-plugin-react";
import type { RulePreset } from "@eslint-react/types";
// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name } from "../package.json";

const rules = {
    "debug/class-component": "warn",
    "debug/function-component": "warn",
    "jsx/no-array-index-key": "error",
    "jsx/no-duplicate-key": "error",
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-missing-key": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/prefer-shorthand-boolean": "warn",
    "naming-convention/filename": "warn",
    "naming-convention/filename-extension": "warn",
    "no-constructed-context-value": "error",
    "no-dangerously-set-innerhtml": "error",
    "no-dangerously-set-innerhtml-with-children": "error",
    "no-string-refs": "error",
    "no-unstable-default-props": "error",
    "no-unstable-nested-components": "error",
} as const satisfies RulePreset;

const rulesEntries = Object.entries(rules);

const recommendedRules = {
    "jsx/no-array-index-key": "error",
    "jsx/no-duplicate-key": "error",
    "jsx/no-leaked-conditional-rendering": "error",
    "jsx/no-missing-key": "error",
    "jsx/no-misused-comment-in-textnode": "warn",
    "jsx/no-script-url": "error",
    "jsx/prefer-shorthand-boolean": "warn",
    "no-constructed-context-value": "error",
    "no-dangerously-set-innerhtml": "error",
    "no-dangerously-set-innerhtml-with-children": "error",
    "no-string-refs": "error",
    "no-unstable-default-props": "error",
    "no-unstable-nested-components": "error",
} as const satisfies RulePreset;

const allRules: RulePreset = Object.fromEntries(rulesEntries.filter(([key]) => !key.startsWith("debug/")));
const offRules: RulePreset = Object.fromEntries(rulesEntries.map(([key]) => [key, "off"]));
const jsxRules: RulePreset = Object.fromEntries(rulesEntries.filter(([key]) => key.startsWith("jsx/")));
const debugRules: RulePreset = Object.fromEntries(rulesEntries.filter(([key]) => key.startsWith("debug/")));

const createConfig = (rules: RulePreset) => {
    return {
        rules: Object.fromEntries(Object.entries(rules).map(([key, value]) => [`@eslint-react/${key}`, value])),
    };
};

export default {
    name,
    configs: {
        all: createConfig(allRules),
        debug: createConfig(debugRules),
        jsx: createConfig(jsxRules),
        off: createConfig(offRules),
        recommended: createConfig(recommendedRules),
        "recommended-type-checked": createConfig(recommendedRules),
    },
    plugins: {
        "@eslint-react": debug,
        "@eslint-react-hooks": hooks,
        "@eslint-react-jsx": jsx,
        "@eslint-react-naming-convention": namingConvention,
    },
    rules: {
        ...react.rules,
    },
} as const;
