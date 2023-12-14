import * as debug from "@eslint-react/eslint-plugin-debug";
import * as jsx from "@eslint-react/eslint-plugin-jsx";
import * as namingConvention from "@eslint-react/eslint-plugin-naming-convention";
import * as react from "@eslint-react/eslint-plugin-react";
import * as hooks from "@eslint-react/eslint-plugin-react-hooks";
import { entries, fromEntries } from "@eslint-react/tools";
import type { RulePreset } from "@eslint-react/types";
import tsParser from "@typescript-eslint/parser";
// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import { padKeysLeft } from "./utils";

const rulePreset = {
  "debug/class-component": "warn",
  "debug/function-component": "warn",
  "debug/react-hooks": "warn",

  "jsx/no-array-index-key": "warn",
  "jsx/no-comment-textnodes": "warn",
  "jsx/no-complicated-conditional-rendering": "warn",
  "jsx/no-duplicate-key": "error",
  "jsx/no-leaked-conditional-rendering": "warn",
  "jsx/no-missing-key": "error",
  "jsx/no-spreading-key": "warn",
  "jsx/no-useless-fragment": "warn",
  "jsx/prefer-shorthand-boolean": "warn",
  "jsx/prefer-shorthand-fragment": "warn",

  "naming-convention/component-name": "warn",
  "naming-convention/filename": "warn",
  "naming-convention/filename-extension": "warn",
  "naming-convention/use-state": "warn",

  "react/no-children-count": "warn",
  "react/no-children-for-each": "warn",
  "react/no-children-in-void-dom-elements": "warn",
  "react/no-children-map": "warn",
  "react/no-children-only": "warn",
  "react/no-children-prop": "warn",
  "react/no-children-to-array": "warn",
  "react/no-class-component": "warn",
  "react/no-clone-element": "warn",
  "react/no-component-will-mount": "error",
  "react/no-component-will-receive-props": "error",
  "react/no-component-will-update": "error",
  "react/no-constructed-context-value": "error",
  "react/no-create-ref": "error",
  "react/no-dangerously-set-innerhtml": "warn",
  "react/no-dangerously-set-innerhtml-with-children": "error",
  "react/no-direct-mutation-state": "error",
  "react/no-find-dom-node": "error",
  "react/no-missing-button-type": "warn",
  "react/no-missing-component-display-name": "warn",
  "react/no-missing-iframe-sandbox": "warn",
  "react/no-namespace": "error",
  "react/no-redundant-should-component-update": "warn",
  "react/no-render-return-value": "error",
  "react/no-script-url": "warn",
  "react/no-set-state-in-component-did-mount": "warn",
  "react/no-set-state-in-component-did-update": "warn",
  "react/no-set-state-in-component-will-update": "warn",
  "react/no-string-refs": "error",
  "react/no-unsafe-component-will-mount": "warn",
  "react/no-unsafe-component-will-receive-props": "warn",
  "react/no-unsafe-component-will-update": "warn",
  "react/no-unsafe-iframe-sandbox": "warn",
  "react/no-unsafe-target-blank": "warn",
  "react/no-unstable-default-props": "warn",
  "react/no-unstable-nested-components": "warn",
  "react/prefer-destructuring-assignment": "warn",

  "react-hooks/ensure-custom-hooks-using-other-hooks": "warn",
  "react-hooks/ensure-use-callback-has-non-empty-deps": "warn",
  "react-hooks/ensure-use-memo-has-non-empty-deps": "warn",
  "react-hooks/prefer-use-state-lazy-initialization": "warn",
} as const satisfies RulePreset;

const recommendedPreset = {
  "jsx/no-array-index-key": "warn",
  // "jsx/no-comment-textnodes": "warn",
  // "jsx/no-complicated-conditional-rendering": "warn",
  "jsx/no-duplicate-key": "error",
  // "jsx/no-leaked-conditional-rendering": "warn",
  "jsx/no-missing-key": "error",
  "jsx/no-spreading-key": "warn",
  "jsx/no-useless-fragment": "warn",
  "jsx/prefer-shorthand-boolean": "warn",
  "jsx/prefer-shorthand-fragment": "warn",

  "naming-convention/component-name": "warn",
  // "naming-convention/filename": "warn",
  // "naming-convention/filename-extension": "warn",
  "naming-convention/use-state": "warn",

  "react/no-children-count": "warn",
  "react/no-children-for-each": "warn",
  "react/no-children-in-void-dom-elements": "warn",
  "react/no-children-map": "warn",
  "react/no-children-only": "warn",
  "react/no-children-prop": "warn",
  "react/no-children-to-array": "warn",
  // "react/no-class-component": "warn",
  "react/no-clone-element": "warn",
  "react/no-component-will-mount": "error",
  "react/no-component-will-receive-props": "error",
  "react/no-component-will-update": "error",
  "react/no-constructed-context-value": "error",
  "react/no-create-ref": "error",
  "react/no-dangerously-set-innerhtml": "warn",
  "react/no-dangerously-set-innerhtml-with-children": "error",
  "react/no-direct-mutation-state": "error",
  "react/no-find-dom-node": "error",
  "react/no-missing-button-type": "warn",
  // "react/no-missing-component-display-name": "warn",
  "react/no-missing-iframe-sandbox": "warn",
  "react/no-namespace": "error",
  "react/no-redundant-should-component-update": "warn",
  "react/no-render-return-value": "error",
  "react/no-script-url": "warn",
  "react/no-set-state-in-component-did-mount": "warn",
  "react/no-set-state-in-component-did-update": "warn",
  "react/no-set-state-in-component-will-update": "warn",
  "react/no-string-refs": "error",
  "react/no-unsafe-component-will-mount": "warn",
  "react/no-unsafe-component-will-receive-props": "warn",
  "react/no-unsafe-component-will-update": "warn",
  "react/no-unsafe-iframe-sandbox": "warn",
  "react/no-unsafe-target-blank": "warn",
  "react/no-unstable-default-props": "warn",
  "react/no-unstable-nested-components": "warn",
  "react/prefer-destructuring-assignment": "warn",

  "react-hooks/ensure-custom-hooks-using-other-hooks": "warn",
  // "react-hooks/ensure-use-callback-has-non-empty-deps": "warn",
  // "react-hooks/ensure-use-memo-has-non-empty-deps": "warn",
  // "react-hooks/prefer-use-state-lazy-initialization": "warn",
} as const satisfies RulePreset;

const recommendedTypeCheckedPreset = {
  ...recommendedPreset,
  "jsx/no-leaked-conditional-rendering": "warn",
} as const satisfies RulePreset;

const rulePresetEntries = entries(rulePreset);
const debugPreset = fromEntries(rulePresetEntries.filter(([key]) => key.startsWith("debug/")));
const allPreset = fromEntries(rulePresetEntries.filter(([key]) => !key.startsWith("debug/")));
const offPreset = fromEntries(
  rulePresetEntries
    .filter(([key]) => !key.startsWith("debug/"))
    .map(([key]) => [key, "off"]),
);

const legacyConfigPlugins = ["@eslint-react"] as const;

const flatConfigPlugins = {
  "@eslint-react/debug": debug,
  "@eslint-react/jsx": jsx,
  "@eslint-react/naming-convention": namingConvention,
  "@eslint-react/react": react,
  "@eslint-react/react-hooks": hooks,
} as const;

function createLegacyConfig<T extends RulePreset>(rules: T, plugins = legacyConfigPlugins) {
  return {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "2021",
      project: true,
      sourceType: "module",
    },
    plugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
  } as const;
}

function createFlatConfig<T extends RulePreset>(rules: T, plugins = flatConfigPlugins) {
  return {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
      sourceType: "module",
    },
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
    all: createFlatConfig(allPreset),
    "all-legacy": createLegacyConfig(allPreset),
    debug: createFlatConfig(debugPreset),
    "debug-legacy": createLegacyConfig(debugPreset),
    off: createFlatConfig(offPreset),
    "off-legacy": createLegacyConfig(offPreset),
    recommended: createFlatConfig(recommendedPreset),
    "recommended-legacy": createLegacyConfig(recommendedPreset),
    "recommended-type-checked": createFlatConfig(recommendedTypeCheckedPreset),
    "recommended-type-checked-legacy": createLegacyConfig(recommendedTypeCheckedPreset),
  },
  rules: {
    ...padKeysLeft(jsx.rules, "jsx/"),
    ...padKeysLeft(react.rules, "react/"),
    ...padKeysLeft(hooks.rules, "react-hooks/"),
    ...padKeysLeft(namingConvention.rules, "naming-convention/"),
    ...padKeysLeft(debug.rules, "debug/"),
  },
} as const;
