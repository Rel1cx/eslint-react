// import { nodeTypes } from "@mdx-js/mdx"
// import rehypeRaw from "rehype-raw"
// import remarkShikiTwoslash from "remark-shiki-twoslash"
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import nextra from "nextra";
import codeImport from "remark-code-import";
import remarkGFM from "remark-gfm";

import redirects from "./migrations/1.0-1.5/redirects.json" assert { type: "json" };

const withVanillaExtract = createVanillaExtractPlugin();

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: false,
  newNextLinkBehavior: true,
  mdxOptions: {
    // rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
    remarkPlugins: [
      remarkGFM,
      codeImport,
      // [
      //   remarkShikiTwoslash.default,
      //   {
      //     defaultCompilerOptions: {
      //       types: ["node"],
      //     },
      //     themes: ["dark-plus", "light-plus"],
      //   },
      // ],
    ],
  },
  images: {
    allowFutureImage: true,
  },
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  redirects() {
    return redirects;
  },
};

export default withVanillaExtract(withNextra(nextConfig));
