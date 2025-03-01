import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  serverExternalPackages: [
    "typescript",
    "twoslash",
  ],
  redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/getting-started",
        permanent: true,
      },
      {
        source: "/docs/installation",
        destination: "/docs/getting-started",
        permanent: true,
      },
      {
        source: "/docs/getting-started",
        destination: "/docs/getting-started/javascript",
        permanent: true,
      },
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
      {
        source: "/docs/rules",
        destination: "/docs/rules/overview",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/docs/faq",
        permanent: true,
      },
      {
        source: "/roadmap",
        destination: "/docs/roadmap",
        permanent: true,
      },
      {
        source: "/presets/:wildcard",
        destination: "/docs/presets/:wildcard",
        permanent: true,
      },
      {
        source: "/rules/:wildcard",
        destination: "/docs/rules/:wildcard",
        permanent: true,
      },
      // Redirects for deprecated rules
      {
        source: "/docs/rules/jsx-uses-vars",
        destination: "/docs/rules/use-jsx-vars",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-no-duplicate-props",
        destination: "/docs/rules/no-duplicate-jsx-props",
        permanent: true,
      },
      {
        source: "/docs/rules/no-complicated-conditional-rendering",
        destination: "/docs/rules/no-complex-conditional-rendering",
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
        destination: "/docs/rules/hooks-extra-no-useless-custom-hooks",
        permanent: true,
      },
      {
        source: "/docs/rules/hooks-extra-no-redundant-custom-hook",
        destination: "/docs/rules/hooks-extra-no-useless-custom-hooks",
        permanent: true,
      },
      {
        source: "/docs/rules/debug-react-hooks",
        destination: "/docs/rules/debug-hook",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
