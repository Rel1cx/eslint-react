import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import nextra from "nextra";
import codeImport from "remark-code-import";
import remarkGFM from "remark-gfm";

const withVanillaExtract = createVanillaExtractPlugin();

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: false,
  mdxOptions: {
    remarkPlugins: [
      remarkGFM,
      codeImport,
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/installation",
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
      // Redirects for renamed rules
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
        source: "/docs/rules/debug-react-hooks",
        destination: "/docs/rules/debug-hook",
        permanent: true,
      },
    ];
  },
};

export default withVanillaExtract(withNextra(nextConfig));
