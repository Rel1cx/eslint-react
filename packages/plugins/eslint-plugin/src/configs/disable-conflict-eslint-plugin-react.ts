import type { RulePreset } from "@eslint-react/kit";

// This rulelist should be kept in sync with `apps/website/content/docs/migration.mdx`
// Rules provided by `eslint-plugin-react` that exist in this plugin.
// Rules provided by `@stylistic` are also omitted from this list.
const conflictingRules = [
  "button-has-type",
  "destructuring-assignment",
  "display-name",
  "forbid-prop-types",
  "forward-ref-uses-ref",
  "hook-use-state",
  "iframe-missing-sandbox",
  "jsx-boolean-value",
  "jsx-filename-extension",
  "jsx-fragments",
  "jsx-key",
  "jsx-no-comment-textnodes",
  "jsx-no-constructed-context-values",
  "jsx-no-duplicate-props",
  "jsx-no-leaked-render",
  "jsx-no-script-url",
  "jsx-no-target-blank",
  "jsx-no-undef",
  "jsx-no-useless-fragment",
  "jsx-pascal-case",
  "jsx-uses-react",
  "jsx-uses-vars",
  "no-access-state-in-setstate",
  "no-array-index-key",
  "no-children-prop",
  "no-danger",
  "no-danger-with-children",
  "no-deprecated",
  "no-did-mount-set-state",
  "no-did-update-set-state",
  "no-direct-mutation-state",
  "no-find-dom-node",
  "no-namespace",
  "no-object-type-as-default-prop",
  "no-redundant-should-component-update",
  "no-render-return-value",
  "no-string-refs",
  "no-unknown-property",
  "no-unsafe",
  "no-unstable-nested-components",
  "no-unused-class-component-members",
  "no-unused-state",
  "no-will-update-set-state",
  "prefer-read-only-props",
  "prop-types",
  "void-dom-elements-no-children",
];

export const name = "@eslint-react/disable-conflict-eslint-plugin-react";

export const rules: RulePreset = Object.fromEntries(
  conflictingRules.map((key) => [key, "off"] as const),
);
