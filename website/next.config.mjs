import nextra from "nextra";
import remarkGFM from "remark-gfm";
// import codeImport from "remark-code-import";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  // defaultShowCopyCode: false,
  mdxOptions: {
    remarkPlugins: [
      remarkGFM,
      // codeImport,
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["react-tweet"],
  output: "standalone",
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
        source: "/docs/rules/no-children-in-void-dom-elements",
        destination: "/docs/rules/no-void-elements-with-children",
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

export default withNextra(nextConfig);
