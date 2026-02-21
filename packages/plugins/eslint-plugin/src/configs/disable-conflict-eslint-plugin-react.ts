import type { RuleConfig } from "@eslint-react/shared";

// This rulelist should be kept in sync with `apps/website/content/docs/migration.mdx`
// Rules provided by `eslint-plugin-react` that exist in this plugin.
// Rules provided by `@stylistic` are also omitted from this list.
const conflictingRules = [
  "react/button-has-type",
  "react/destructuring-assignment",
  "react/display-name",
  "react/forbid-prop-types",
  "react/forward-ref-uses-ref",
  "react/hook-use-state",
  "react/iframe-missing-sandbox",
  "react/jsx-boolean-value",
  "react/jsx-filename-extension",
  "react/jsx-fragments",
  "react/jsx-key",
  "react/jsx-no-comment-textnodes",
  "react/jsx-no-constructed-context-values",
  "react/jsx-no-duplicate-props",
  "react/jsx-no-leaked-render",
  "react/jsx-no-script-url",
  "react/jsx-no-target-blank",
  "react/jsx-no-useless-fragment",
  "react/jsx-pascal-case",
  "react/jsx-uses-react",
  "react/jsx-uses-vars",
  "react/no-access-state-in-setstate",
  "react/no-array-index-key",
  "react/no-children-prop",
  "react/no-danger",
  "react/no-danger-with-children",
  "react/no-deprecated",
  "react/no-did-mount-set-state",
  "react/no-did-update-set-state",
  "react/no-direct-mutation-state",
  "react/no-find-dom-node",
  "react/no-namespace",
  "react/no-object-type-as-default-prop",
  "react/no-redundant-should-component-update",
  "react/no-render-return-value",
  "react/no-string-refs",
  "react/no-unknown-property",
  "react/no-unsafe",
  "react/no-unstable-nested-components",
  "react/no-unused-class-component-members",
  "react/no-unused-state",
  "react/no-will-update-set-state",
  "react/prefer-read-only-props",
  "react/prop-types",
  "react/void-dom-elements-no-children",
];

export const name = "@eslint-react/disable-conflict-eslint-plugin-react";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  conflictingRules.map((key) => [key, "off"] as const),
);
