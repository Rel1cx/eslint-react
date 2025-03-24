/* eslint-disable perfectionist/sort-objects */
import { createMDX } from "fumadocs-mdx/next";
import * as migration from "./migration";

const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  experimental: {
    // ppr: true,
    inlineCss: true,
    // reactCompiler: true,
    // viewTransition: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: [
    "typescript",
    "twoslash",
  ],
  async redirects() {
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
      ...migration.redirects,
    ];
  },
};

export default withMDX(config);
