/* eslint-disable perfectionist/sort-objects */
export const redirects = [
  // Redirects for old documentation links
  {
    source: "/docs/getting-started/javascript-with-alternative-parser",
    destination: "/docs/using-an-alternative-parser/babel-eslint-parser",
    permanent: true,
  },
  {
    source: "/docs/getting-started/typescript-with-alternative-parser",
    destination: "/docs/using-an-alternative-parser/ts-blank-eslint-parser",
    permanent: true,
  },
  // Redirects for old rule names
  {
    source: "/docs/rules/use-jsx-vars",
    destination: "/docs/rules/jsx-uses-vars",
    permanent: true,
  },
  {
    source: "/docs/rules/no-duplicate-jsx-props",
    destination: "/docs/rules/jsx-no-duplicate-props",
    permanent: true,
  },
  {
    source: "/docs/rules/no-complicated-conditional-rendering",
    destination: "/docs/rules/no-complex-conditional-rendering",
    permanent: true,
  },
  {
    source: "/docs/rules/ensure-forward-ref-using-ref",
    destination: "/docs/rules/no-useless-forward-ref",
    permanent: true,
  },
  {
    source: "/docs/rules/no-nested-components",
    destination: "/docs/rules/no-nested-component-definitions",
    permanent: true,
  },
  {
    source: "/docs/rules/dom-no-children-in-void-dom-elements",
    destination: "/docs/rules/dom-no-void-elements-with-children",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-ensure-use-memo-has-non-empty-deps",
    destination: "/docs/rules/hooks-extra-no-unnecessary-use-memo",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-ensure-use-callback-has-non-empty-deps",
    destination: "/docs/rules/hooks-extra-no-unnecessary-use-callback",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-ensure-custom-hooks-using-other-hooks",
    destination: "/docs/rules/hooks-extra-no-unnecessary-use-prefix",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-no-redundant-custom-hook",
    destination: "/docs/rules/hooks-extra-no-unnecessary-use-prefix",
    permanent: true,
  },
  {
    source: "/docs/rules/hooks-extra-no-useless-custom-hooks",
    destination: "/docs/rules/hooks-extra-no-unnecessary-use-prefix",
    permanent: true,
  },
] as const;
