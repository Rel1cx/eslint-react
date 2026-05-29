/* eslint-disable perfectionist/sort-objects */
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = {
  images: {
    qualities: [100],
  },
  reactStrictMode: true,
  // experimental: {
  //   inlineCss: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "twoslash",
    "typescript",
  ],
  async redirects() {
    return [
      // 1. Strip file extensions first
      {
        source: "/:path*.md",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/:path*.mdx",
        destination: "/:path*",
        permanent: false,
      },
      // 2. Exact path redirects (alphabetical by source)
      {
        source: "/docs",
        destination: "/docs/getting-started",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-no-duplicate-props",
        destination: "/docs/removed#rules",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-no-iife",
        destination: "/docs/unsupported-syntax#rules",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-no-undef",
        destination: "/docs/removed#rules",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-uses-react",
        destination: "/docs/removed#rules",
        permanent: true,
      },
      {
        source: "/docs/rules/jsx-uses-vars",
        destination: "/docs/removed#rules",
        permanent: true,
      },
      {
        source: "/docs/rules/no-useless-forward-ref",
        destination: "/docs/rules/no-forward-ref",
        permanent: true,
      },
      {
        source: "/docs/rules/hooks-extra-no-direct-set-state-in-use-effect",
        destination: "/docs/rules/set-state-in-effect",
        permanent: true,
      },
      {
        source: "/docs/rules/no-useless-fragment",
        destination: "/docs/rules/jsx-no-useless-fragment",
        permanent: true,
      },
      {
        source: "/docs/rules/overview",
        destination: "/docs/rules",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/docs/faq",
        permanent: true,
      },
      // 3. Wildcard redirects (alphabetical by source)
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
    ];
  },
};

export default withMDX(config);
