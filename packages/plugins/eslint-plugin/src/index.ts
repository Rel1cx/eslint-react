import type { ESLintReactSettings } from "@eslint-react/shared";
import { entries, fromEntries } from "@eslint-react/tools";
import type { RulePreset } from "@eslint-react/types";
import reactDebug from "eslint-plugin-react-debug";
import reactDom from "eslint-plugin-react-dom";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";
import react from "eslint-plugin-react-x";

import { name, version } from "../package.json";
import { padKeysLeft } from "./utils";

// #region Presets Rules

const allPreset = {
  // Part: Core
  "avoid-shorthand-boolean": "warn",
  "avoid-shorthand-fragment": "warn",
  "ensure-forward-ref-using-ref": "warn",
  "jsx-uses-vars": "warn",
  "no-access-state-in-setstate": "error",
  "no-array-index-key": "warn",
  "no-children-count": "warn",
  "no-children-for-each": "warn",
  "no-children-map": "warn",
  "no-children-only": "warn",
  "no-children-prop": "warn",
  "no-children-to-array": "warn",
  "no-class-component": "warn",
  "no-clone-element": "warn",
  "no-comment-textnodes": "warn",
  "no-complex-conditional-rendering": "warn",
  "no-component-will-mount": "error",
  "no-component-will-receive-props": "error",
  "no-component-will-update": "error",
  "no-create-ref": "error",
  "no-default-props": "error",
  "no-direct-mutation-state": "error",
  "no-duplicate-key": "error",
  "no-implicit-key": "warn",
  // "no-leaked-conditional-rendering": "warn", // This rule requires type information
  "no-missing-component-display-name": "warn",
  "no-missing-key": "error",
  "no-nested-components": "error",
  "no-prop-types": "error",
  "no-redundant-should-component-update": "error",
  "no-set-state-in-component-did-mount": "warn",
  "no-set-state-in-component-did-update": "warn",
  "no-set-state-in-component-will-update": "warn",
  "no-string-refs": "error",
  "no-unsafe-component-will-mount": "warn",
  "no-unsafe-component-will-receive-props": "warn",
  "no-unsafe-component-will-update": "warn",
  "no-unstable-context-value": "warn",
  "no-unstable-default-props": "warn",
  "no-unused-class-component-members": "warn",
  "no-unused-state": "warn",
  "no-useless-fragment": "warn",
  "prefer-destructuring-assignment": "warn",
  // "prefer-read-only-props": "warn", // This rule requires type information
  "prefer-shorthand-boolean": "warn",
  "prefer-shorthand-fragment": "warn",

  // Part: DOM
  "dom/no-children-in-void-dom-elements": "warn",
  "dom/no-dangerously-set-innerhtml": "warn",
  "dom/no-dangerously-set-innerhtml-with-children": "error",
  "dom/no-find-dom-node": "error",
  "dom/no-missing-button-type": "warn",
  "dom/no-missing-iframe-sandbox": "warn",
  "dom/no-namespace": "error",
  "dom/no-render-return-value": "error",
  "dom/no-script-url": "warn",
  "dom/no-unknown-property": "warn",
  "dom/no-unsafe-iframe-sandbox": "warn",
  "dom/no-unsafe-target-blank": "warn",

  // Part: Web API
  "web-api/no-leaked-event-listener": "warn",
  "web-api/no-leaked-interval": "warn",
  "web-api/no-leaked-resize-observer": "warn",
  "web-api/no-leaked-timeout": "warn",

  // Part: Hooks Extra
  "hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "hooks-extra/no-direct-set-state-in-use-layout-effect": "warn",
  "hooks-extra/no-redundant-custom-hook": "warn",
  "hooks-extra/no-unnecessary-use-callback": "warn",
  "hooks-extra/no-unnecessary-use-memo": "warn",
  "hooks-extra/prefer-use-state-lazy-initialization": "warn",

  "naming-convention/component-name": "warn",
  "naming-convention/filename": "warn",
  "naming-convention/filename-extension": "warn",
  "naming-convention/use-state": "warn",
} as const satisfies RulePreset;

const corePreset = {
  "ensure-forward-ref-using-ref": "warn",
  // "avoid-shorthand-boolean": "warn",
  // "avoid-shorthand-fragment": "warn",
  "jsx-uses-vars": "warn",
  "no-access-state-in-setstate": "error",
  "no-array-index-key": "warn",
  "no-children-count": "warn",
  "no-children-for-each": "warn",
  "no-children-map": "warn",
  "no-children-only": "warn",
  // "no-children-prop": "warn",
  "no-children-to-array": "warn",
  // "no-class-component": "warn",
  "no-clone-element": "warn",
  "no-comment-textnodes": "warn",
  // "no-complex-conditional-rendering": "warn",
  "no-component-will-mount": "error",
  "no-component-will-receive-props": "error",
  "no-component-will-update": "error",
  "no-create-ref": "error",
  "no-default-props": "error",
  "no-direct-mutation-state": "error",
  "no-duplicate-key": "error",
  // "no-implicit-key": "error",
  // "no-leaked-conditional-rendering": "warn",
  // "no-missing-component-display-name": "warn",
  "no-missing-key": "error",
  "no-nested-components": "error",
  "no-prop-types": "error",
  "no-redundant-should-component-update": "error",
  "no-set-state-in-component-did-mount": "warn",
  "no-set-state-in-component-did-update": "warn",
  "no-set-state-in-component-will-update": "warn",
  "no-string-refs": "error",
  "no-unsafe-component-will-mount": "warn",
  "no-unsafe-component-will-receive-props": "warn",
  "no-unsafe-component-will-update": "warn",
  "no-unstable-context-value": "warn",
  "no-unstable-default-props": "warn",
  "no-unused-class-component-members": "warn",
  "no-unused-state": "warn",
  // "no-useless-fragment": "warn",
  // "prefer-read-only-props": "warn",
  // "prefer-destructuring-assignment": "warn",
  // "prefer-shorthand-boolean": "warn",
  // "prefer-shorthand-fragment": "warn",
} as const satisfies RulePreset;

const domPreset = {
  "dom/no-children-in-void-dom-elements": "warn",
  "dom/no-dangerously-set-innerhtml": "warn",
  "dom/no-dangerously-set-innerhtml-with-children": "error",
  "dom/no-find-dom-node": "error",
  "dom/no-missing-button-type": "warn",
  "dom/no-missing-iframe-sandbox": "warn",
  "dom/no-namespace": "error",
  "dom/no-render-return-value": "error",
  "dom/no-script-url": "warn",
  "dom/no-unknown-property": "warn",
  "dom/no-unsafe-iframe-sandbox": "warn",
  "dom/no-unsafe-target-blank": "warn",
} as const satisfies RulePreset;

const webApiPreset = {
  "web-api/no-leaked-event-listener": "warn",
  "web-api/no-leaked-interval": "warn",
  "web-api/no-leaked-resize-observer": "warn",
  "web-api/no-leaked-timeout": "warn",
} as const satisfies RulePreset;

const hooksExtraPreset = {
  "hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "hooks-extra/no-redundant-custom-hook": "warn",
  "hooks-extra/prefer-use-state-lazy-initialization": "warn",
} as const satisfies RulePreset;

const recommendedPreset = {
  ...corePreset,
  ...domPreset,
  ...webApiPreset,
  ...hooksExtraPreset,
} as const satisfies RulePreset;

const recommendedTypeScriptPreset = {
  ...recommendedPreset,
  "dom/no-unknown-property": "off",
} as const satisfies RulePreset;

const recommendedTypeCheckedPreset = {
  ...recommendedTypeScriptPreset,
  "no-leaked-conditional-rendering": "warn",
} as const satisfies RulePreset;

const disableTypeCheckedPreset: RulePreset = {
  "no-leaked-conditional-rendering": "off",
  "prefer-read-only-props": "off",
} as const satisfies RulePreset;

const debugPreset = {
  "debug/class-component": "warn",
  "debug/function-component": "warn",
  "debug/hook": "warn",
} as const satisfies RulePreset;

const disableDomPreset = fromEntries(entries(domPreset).map(([key]) => [key, "off"] as const));
const disableWebApiPreset = fromEntries(entries(webApiPreset).map(([key]) => [key, "off"] as const));

const allPresetEntries = entries(allPreset);
const offPreset = {
  ...fromEntries(allPresetEntries.map(([key]) => [key, "off"] as const)),
  ...disableTypeCheckedPreset,
} as const satisfies RulePreset;

// #endregion

// #region  Presets Settings

const corePresetSettings = {
  ...react.DEFAULT_ESLINT_REACT_SETTINGS,
} satisfies ESLintReactSettings;

const domPresetSettings = {
  ...corePresetSettings,
  ...reactDom.DEFAULT_ESLINT_REACT_SETTINGS,
} satisfies ESLintReactSettings;

// #endregion

// #region Helpers

const legacyConfigPlugins = ["@eslint-react"] as const;

const flatConfigPlugins = {
  "@eslint-react": react,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/dom": reactDom,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
  "@eslint-react/web-api": reactWebApi,
} as const;

function createLegacyConfig<T extends RulePreset>(
  rules: T,
  settings = react.DEFAULT_ESLINT_REACT_SETTINGS,
) {
  return {
    plugins: legacyConfigPlugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
    settings: {
      "react-x": settings,
    },
  } as const;
}

function createFlatConfig<T extends RulePreset>(
  rules: T,
  settings = react.DEFAULT_ESLINT_REACT_SETTINGS,
) {
  return {
    plugins: flatConfigPlugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
    settings: {
      "react-x": settings,
    },
  } as const;
}

// #endregion

// #region Exports

export default {
  meta: {
    name,
    version,
  },
  configs: {
    /* eslint-disable perfectionist/sort-objects */
    ["core"]: createFlatConfig(corePreset, corePresetSettings),
    ["core-legacy"]: createLegacyConfig(corePreset, corePresetSettings),
    ["debug"]: createFlatConfig(debugPreset),
    ["debug-legacy"]: createLegacyConfig(debugPreset),
    ["dom"]: createFlatConfig(domPreset, domPresetSettings),
    ["dom-legacy"]: createLegacyConfig(domPreset),
    ["recommended"]: createFlatConfig(recommendedPreset),
    ["recommended-legacy"]: createLegacyConfig(recommendedPreset),
    ["recommended-typescript"]: createFlatConfig(recommendedTypeScriptPreset),
    ["recommended-typescript-legacy"]: createLegacyConfig(recommendedTypeScriptPreset),
    ["recommended-type-checked"]: createFlatConfig(recommendedTypeCheckedPreset),
    ["recommended-type-checked-legacy"]: createLegacyConfig(recommendedTypeCheckedPreset),
    // Part: disable presets
    ["disable-dom"]: createFlatConfig(disableDomPreset),
    ["disable-dom-legacy"]: createLegacyConfig(disableDomPreset),
    ["disable-web-api"]: createFlatConfig(disableWebApiPreset),
    ["disable-web-api-legacy"]: createLegacyConfig(disableWebApiPreset),
    ["disable-type-checked"]: createFlatConfig(disableTypeCheckedPreset),
    ["disable-type-checked-legacy"]: createLegacyConfig(disableTypeCheckedPreset),
    // Part: all or off presets
    ["all"]: createFlatConfig(allPreset),
    ["all-legacy"]: createLegacyConfig(allPreset),
    ["off"]: createFlatConfig(offPreset),
    ["off-legacy"]: createLegacyConfig(offPreset),
    // Part: deprecated presets
    /** @deprecated Use `disable-dom` instead */
    ["off-dom"]: createFlatConfig(disableDomPreset),
    /** @deprecated Use `disable-dom-legacy` instead */
    ["off-dom-legacy"]: createLegacyConfig(disableDomPreset),
    /* eslint-enable perfectionist/sort-objects */
  },
  rules: {
    ...react.rules,
    ...padKeysLeft(reactDom.rules, "dom/"),
    ...padKeysLeft(reactWebApi.rules, "web-api/"),
    ...padKeysLeft(reactHooksExtra.rules, "hooks-extra/"),
    ...padKeysLeft(reactNamingConvention.rules, "naming-convention/"),
    ...padKeysLeft(reactDebug.rules, "debug/"),
  },
} as const;

// #endregion
