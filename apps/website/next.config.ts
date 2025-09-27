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
        source: "/:path*.md",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/:path*.mdx",
        destination: "/:path*",
        permanent: false,
      },
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
        destination: "/docs/getting-started/typescript",
        permanent: true,
      },
      {
        source: "/docs/rules",
        destination: "/docs/rules/overview",
        permanent: true,
      },
      {
        source: "/docs/configuration",
        destination: "/docs/configuration/configure-analyzer",
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
        source: "/docs/release-notes",
        destination: "/docs/release-notes/v2.0.0",
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
