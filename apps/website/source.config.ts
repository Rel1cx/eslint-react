import { remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const { meta, docs } = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      [remarkDocGen, { generators: [] }],
      remarkInstall,
    ],
  },
});
