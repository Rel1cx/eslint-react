/* eslint-disable perfectionist/sort-objects */
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = {
  images: {
    qualities: [100],
  },
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: [
    "@takumi-rs/image-response",
    "twoslash",
    "typescript",
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
        source: "/docs/rules/overview",
        destination: "/docs/rules",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/docs/faq",
        permanent: true,
      },
      {
        source: "/rules/:wildcard",
        destination: "/docs/rules/:wildcard",
        permanent: true,
      },
      {
        source: "/presets/:wildcard",
        destination: "/docs/presets/:wildcard",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
