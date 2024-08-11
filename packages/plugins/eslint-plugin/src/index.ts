import type { ESLintReactSettings } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS } from "@eslint-react/shared";
import { entries, fromEntries } from "@eslint-react/tools";
import type { RulePreset } from "@eslint-react/types";
import * as reactDebug from "eslint-plugin-react-debug";
import * as reactDom from "eslint-plugin-react-dom";
import * as reactHooksExtra from "eslint-plugin-react-hooks-extra";
import * as reactNamingConvention from "eslint-plugin-react-naming-convention";
import * as react from "eslint-plugin-react-x";

import { name, version } from "../package.json";
import { padKeysLeft } from "./utils";

const allPreset = {
  "avoid-shorthand-boolean": "warn",
  "avoid-shorthand-fragment": "warn",
  "ensure-forward-ref-using-ref": "warn",
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
  "no-nested-components": "warn",
  "no-prop-types": "error",
  "no-redundant-should-component-update": "error",
  "no-set-state-in-component-did-mount": "warn",
  "no-set-state-in-component-did-update": "warn",
  "no-set-state-in-component-will-update": "warn",
  "no-string-refs": "error",
  "no-unsafe-component-will-mount": "warn",
  "no-unsafe-component-will-receive-props": "warn",
  "no-unsafe-component-will-update": "warn",
  "no-unstable-context-value": "error",
  "no-unstable-default-props": "error",
  "no-unused-class-component-members": "warn",
  "no-unused-state": "warn",
  "no-useless-fragment": "warn",
  "prefer-destructuring-assignment": "warn",
  // "prefer-read-only-props": "warn", // This rule requires type information
  "prefer-shorthand-boolean": "warn",
  "prefer-shorthand-fragment": "warn",
  // eslint-disable-next-line perfectionist/sort-objects
  "dom/no-children-in-void-dom-elements": "warn",
  "dom/no-dangerously-set-innerhtml": "warn",
  "dom/no-dangerously-set-innerhtml-with-children": "error",
  "dom/no-find-dom-node": "error",
  "dom/no-missing-button-type": "warn",
  "dom/no-missing-iframe-sandbox": "warn",
  "dom/no-namespace": "error",
  "dom/no-render-return-value": "error",
  "dom/no-script-url": "warn",
  "dom/no-unsafe-iframe-sandbox": "warn",
  "dom/no-unsafe-target-blank": "warn",
  "hooks-extra/ensure-custom-hooks-using-other-hooks": "warn",
  "hooks-extra/ensure-use-callback-has-non-empty-deps": "warn",
  "hooks-extra/ensure-use-memo-has-non-empty-deps": "warn",
  "hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "hooks-extra/no-direct-set-state-in-use-layout-effect": "warn",
  "hooks-extra/prefer-use-state-lazy-initialization": "warn",
  "naming-convention/component-name": "warn",
  "naming-convention/filename": "warn",
  "naming-convention/filename-extension": "warn",
  "naming-convention/use-state": "warn",
} as const satisfies RulePreset;

const corePreset = {
  // "avoid-shorthand-boolean": "warn",
  // "avoid-shorthand-fragment": "warn",
  "ensure-forward-ref-using-ref": "warn",
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
  "no-nested-components": "warn",
  "no-prop-types": "error",
  "no-redundant-should-component-update": "error",
  "no-set-state-in-component-did-mount": "warn",
  "no-set-state-in-component-did-update": "warn",
  "no-set-state-in-component-will-update": "warn",
  "no-string-refs": "error",
  "no-unsafe-component-will-mount": "warn",
  "no-unsafe-component-will-receive-props": "warn",
  "no-unsafe-component-will-update": "warn",
  "no-unstable-context-value": "error",
  "no-unstable-default-props": "error",
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
  "dom/no-unsafe-iframe-sandbox": "warn",
  "dom/no-unsafe-target-blank": "warn",
} as const satisfies RulePreset;

const recommendedPreset = {
  ...corePreset,
  ...domPreset,
} as const satisfies RulePreset;

const recommendedTypeCheckedPreset = {
  ...recommendedPreset,
  "no-leaked-conditional-rendering": "warn",
} as const satisfies RulePreset;

const disableTypeCheckedPreset = {
  "no-leaked-conditional-rendering": "off",
  "prefer-read-only-props": "off",
} as const satisfies RulePreset;

const corePresetSettings = {
  ...DEFAULT_ESLINT_REACT_SETTINGS,
} satisfies ESLintReactSettings;

const domPresetSettings = {
  ...corePresetSettings,
  additionalComponents: [
    {
      name: "Link",
      as: "a",
      attributes: [
        {
          name: "to",
          as: "href",
        },
      ],
    },
  ],
} satisfies ESLintReactSettings;

const debugPreset = {
  "debug/class-component": "warn",
  "debug/function-component": "warn",
  "debug/react-hooks": "warn",
} as const satisfies RulePreset;

const allPresetEntries = entries(allPreset);
const offPreset = fromEntries(allPresetEntries.map(([key]) => [key, "off"]));
const offDomPreset = fromEntries(entries(domPreset).map(([key]) => [key, "off"]));

const legacyConfigPlugins = ["@eslint-react"] as const;

const flatConfigPlugins = {
  "@eslint-react": react,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/dom": reactDom,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
} as const;

function createLegacyConfig<T extends RulePreset>(
  rules: T,
  settings = DEFAULT_ESLINT_REACT_SETTINGS,
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
  settings = DEFAULT_ESLINT_REACT_SETTINGS,
) {
  return {
    plugins: flatConfigPlugins,
    rules: padKeysLeft(rules, "@eslint-react/"),
    settings: {
      "react-x": settings,
    },
  } as const;
}

export default {
  meta: {
    name,
    version,
  },
  configs: {
    ["all"]: createFlatConfig(allPreset),
    ["all-legacy"]: createLegacyConfig(allPreset),
    ["core"]: createFlatConfig(corePreset, corePresetSettings),
    ["core-legacy"]: createLegacyConfig(corePreset, corePresetSettings),
    ["debug"]: createFlatConfig(debugPreset),
    ["debug-legacy"]: createLegacyConfig(debugPreset),
    ["dom"]: createFlatConfig(domPreset, domPresetSettings),
    ["dom-legacy"]: createLegacyConfig(domPreset),
    ["off"]: createFlatConfig(offPreset),
    /**
     * @deprecated Use `disable-dom` instead
     */
    ["off-dom"]: createFlatConfig(offDomPreset),
    /**
     * @deprecated Use `disable-dom-legacy` instead
     */
    ["off-dom-legacy"]: createLegacyConfig(offDomPreset),
    ["off-legacy"]: createLegacyConfig(offPreset),
    ["recommended"]: createFlatConfig(recommendedPreset),
    ["recommended-legacy"]: createLegacyConfig(recommendedPreset),
    ["recommended-type-checked"]: createFlatConfig(recommendedTypeCheckedPreset),
    ["recommended-type-checked-legacy"]: createLegacyConfig(recommendedTypeCheckedPreset),
    // Part: disable presets
    ["disable-dom"]: createFlatConfig(offDomPreset),
    ["disable-dom-legacy"]: createLegacyConfig(offDomPreset),
    ["disable-type-checked"]: createFlatConfig(disableTypeCheckedPreset),
    ["disable-type-checked-legacy"]: createLegacyConfig(disableTypeCheckedPreset),
  },
  rules: {
    ...react.rules,
    ...padKeysLeft(reactDom.rules, "dom/"),
    ...padKeysLeft(reactHooksExtra.rules, "hooks-extra/"),
    ...padKeysLeft(reactNamingConvention.rules, "naming-convention/"),
    ...padKeysLeft(reactDebug.rules, "debug/"),
  },
} as const;
