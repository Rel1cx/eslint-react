import type { RulePreset } from "@eslint-react/kit";
import reactDebug from "eslint-plugin-react-debug";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import reactWebApi from "eslint-plugin-react-web-api";

import * as dom from "./dom";
import * as x from "./x";

export const name = "@eslint-react/all";

export const rules = {
  "@eslint-react/avoid-shorthand-boolean": "warn",
  "@eslint-react/avoid-shorthand-fragment": "warn",
  "@eslint-react/jsx-key-before-spread": "warn",
  "@eslint-react/jsx-no-duplicate-props": "warn",
  "@eslint-react/jsx-no-iife": "warn",
  "@eslint-react/jsx-no-undef": "error",
  "@eslint-react/jsx-uses-react": "warn",
  "@eslint-react/jsx-uses-vars": "warn",
  "@eslint-react/no-access-state-in-setstate": "error",
  "@eslint-react/no-array-index-key": "warn",
  "@eslint-react/no-children-count": "warn",
  "@eslint-react/no-children-for-each": "warn",
  "@eslint-react/no-children-map": "warn",
  "@eslint-react/no-children-only": "warn",
  "@eslint-react/no-children-prop": "warn",
  "@eslint-react/no-children-to-array": "warn",
  "@eslint-react/no-class-component": "warn",
  "@eslint-react/no-clone-element": "warn",
  "@eslint-react/no-comment-textnodes": "warn",
  "@eslint-react/no-complex-conditional-rendering": "warn",
  "@eslint-react/no-component-will-mount": "error",
  "@eslint-react/no-component-will-receive-props": "error",
  "@eslint-react/no-component-will-update": "error",
  "@eslint-react/no-context-provider": "warn",
  "@eslint-react/no-create-ref": "error",
  "@eslint-react/no-default-props": "error",
  "@eslint-react/no-direct-mutation-state": "error",
  "@eslint-react/no-duplicate-key": "warn",
  "@eslint-react/no-forward-ref": "warn",
  "@eslint-react/no-implicit-key": "warn",
  // "@eslint-react/no-leaked-conditional-rendering": "warn",
  "@eslint-react/no-missing-component-display-name": "warn",
  "@eslint-react/no-missing-context-display-name": "warn",
  "@eslint-react/no-missing-key": "error",
  "@eslint-react/no-misused-capture-owner-stack": "error",
  "@eslint-react/no-nested-component-definitions": "error",
  "@eslint-react/no-nested-lazy-component-declarations": "warn",
  "@eslint-react/no-prop-types": "error",
  "@eslint-react/no-redundant-should-component-update": "error",
  "@eslint-react/no-set-state-in-component-did-mount": "warn",
  "@eslint-react/no-set-state-in-component-did-update": "warn",
  "@eslint-react/no-set-state-in-component-will-update": "warn",
  "@eslint-react/no-string-refs": "error",
  "@eslint-react/no-unsafe-component-will-mount": "warn",
  "@eslint-react/no-unsafe-component-will-receive-props": "warn",
  "@eslint-react/no-unsafe-component-will-update": "warn",
  "@eslint-react/no-unstable-context-value": "warn",
  "@eslint-react/no-unstable-default-props": "warn",
  "@eslint-react/no-unused-class-component-members": "warn",
  "@eslint-react/no-unused-state": "warn",
  "@eslint-react/no-use-context": "warn",
  "@eslint-react/no-useless-forward-ref": "warn",
  "@eslint-react/no-useless-fragment": "warn",
  "@eslint-react/prefer-destructuring-assignment": "warn",
  "@eslint-react/prefer-react-namespace-import": "warn",
  // "@eslint-react/prefer-read-only-props": "warn",
  "@eslint-react/prefer-shorthand-boolean": "off",
  "@eslint-react/prefer-shorthand-fragment": "off",

  "@eslint-react/dom/no-dangerously-set-innerhtml": "warn",
  "@eslint-react/dom/no-dangerously-set-innerhtml-with-children": "error",
  "@eslint-react/dom/no-find-dom-node": "error",
  "@eslint-react/dom/no-flush-sync": "error",
  "@eslint-react/dom/no-hydrate": "error",
  "@eslint-react/dom/no-missing-button-type": "warn",
  "@eslint-react/dom/no-missing-iframe-sandbox": "warn",
  "@eslint-react/dom/no-namespace": "error",
  "@eslint-react/dom/no-render": "error",
  "@eslint-react/dom/no-render-return-value": "error",
  "@eslint-react/dom/no-script-url": "warn",
  "@eslint-react/dom/no-unknown-property": "warn",
  "@eslint-react/dom/no-unsafe-iframe-sandbox": "warn",
  "@eslint-react/dom/no-unsafe-target-blank": "warn",
  "@eslint-react/dom/no-use-form-state": "error",
  "@eslint-react/dom/no-void-elements-with-children": "error",

  "@eslint-react/web-api/no-leaked-event-listener": "warn",
  "@eslint-react/web-api/no-leaked-interval": "warn",
  "@eslint-react/web-api/no-leaked-resize-observer": "warn",
  "@eslint-react/web-api/no-leaked-timeout": "warn",

  "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
  "@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect": "warn",
  "@eslint-react/hooks-extra/no-unnecessary-use-callback": "warn",
  "@eslint-react/hooks-extra/no-unnecessary-use-memo": "warn",
  "@eslint-react/hooks-extra/no-unnecessary-use-prefix": "warn",
  "@eslint-react/hooks-extra/prefer-use-state-lazy-initialization": "warn",

  "@eslint-react/naming-convention/component-name": "warn",
  "@eslint-react/naming-convention/context-name": "warn",
  "@eslint-react/naming-convention/filename": "warn",
  "@eslint-react/naming-convention/filename-extension": "warn",
  "@eslint-react/naming-convention/use-state": "warn",
} as const satisfies RulePreset;

export const plugins = {
  ...x.plugins,
  ...dom.plugins,
  "@eslint-react/debug": reactDebug,
  "@eslint-react/hooks-extra": reactHooksExtra,
  "@eslint-react/naming-convention": reactNamingConvention,
  "@eslint-react/web-api": reactWebApi,
};

export const settings = {
  ...dom.settings,
};
