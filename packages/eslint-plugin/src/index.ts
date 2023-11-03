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
import { padKeysLeft } from "./utils";

const rulePreset = {
  "debug/class-component": "warn",
  "debug/function-component": "warn",

  "hooks/ensure-custom-hooks-using-other-hooks": "warn",

  "jsx/no-array-index-key": "warn",
  "jsx/no-duplicate-key": "error",
  "jsx/no-leaked-conditional-rendering": "error",
  "jsx/no-missing-key": "error",
  "jsx/no-misused-comment-in-textnode": "warn",
  "jsx/no-spreading-key": "error",
  "jsx/prefer-fragment-syntax": "warn",
  "jsx/prefer-shorthand-boolean": "warn",

  "naming-convention/filename": "warn",
  "naming-convention/filename-extension": "warn",

  "react/no-class-component": "warn",
  "react/no-clone-element": "warn",
  "react/no-constructed-context-value": "error",
  "react/no-dangerously-set-innerhtml": "warn",
  "react/no-dangerously-set-innerhtml-with-children": "error",
  "react/no-missing-button-type": "error",
  "react/no-missing-iframe-sandbox": "warn",
  "react/no-string-refs": "error",
  "react/no-string-style-props": "warn",
  "react/no-unsafe-iframe-sandbox": "warn",
  "react/no-unstable-default-props": "error",
  "react/no-unstable-nested-components": "warn",
} as const satisfies RulePreset;

const recommendedPreset = {
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

const rulePresetEntries = entries(rulePreset);
const allPreset = fromEntries(rulePresetEntries.filter(([key]) => !key.startsWith("debug/")));
const offPreset = fromEntries(rulePresetEntries.map(([key]) => [key, "off"]));
const jsxPreset = fromEntries(rulePresetEntries.filter(([key]) => key.startsWith("jsx/")));
const debugPreset = fromEntries(rulePresetEntries.filter(([key]) => key.startsWith("debug/")));

const legacyConfigPlugins = ["@eslint-react"] as const;

const flatConfigPlugins = {
  "@eslint-react/debug": debug,
  "@eslint-react/hooks": hooks,
  "@eslint-react/jsx": jsx,
  "@eslint-react/naming-convention": namingConvention,
  "@eslint-react/react": react,
} as const;

function createLegacyConfig<T extends RulePreset>(rules: T, plugins = legacyConfigPlugins) {
  return {
    plugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
  } as const;
}

// eslint-disable-next-line sonarjs/no-identical-functions
function createFlatConfig<T extends RulePreset>(rules: T, plugins = flatConfigPlugins) {
  return {
    plugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
  } as const;
}

export default {
  meta: {
    name,
    version,
  },
  configs: {
    "all-legacy": createLegacyConfig(allPreset),
    "debug-legacy": createLegacyConfig(debugPreset),
    "jsx-legacy": createLegacyConfig(jsxPreset),
    "off-legacy": createLegacyConfig(offPreset),
    "recommended-legacy": createLegacyConfig(recommendedPreset),
    "recommended-type-checked-legacy": createLegacyConfig(recommendedPreset),
    // eslint-disable-next-line perfectionist/sort-objects
    all: createFlatConfig(allPreset),
    debug: createFlatConfig(debugPreset),
    jsx: createFlatConfig(jsxPreset),
    off: createFlatConfig(offPreset),
    recommended: createFlatConfig(recommendedPreset),
    "recommended-type-checked": createFlatConfig(recommendedPreset),
  },
  rules: {
    ...padKeysLeft(debug.rules, "debug/"),
    ...padKeysLeft(hooks.rules, "hooks/"),
    ...padKeysLeft(jsx.rules, "jsx/"),
    ...padKeysLeft(namingConvention.rules, "naming-convention/"),
    ...padKeysLeft(react.rules, "react/"),
  },
} as const;
