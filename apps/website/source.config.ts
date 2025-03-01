import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const { meta, docs } = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      experimentalJSEngine: true,
      inline: "tailing-curly-colon",
      langs: ["js", "ts", "jsx", "tsx", "html", "mdx"],
      lazy: true,
      themes: {
        dark: "plastic",
        light: "github-light",
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
      ],
    },
    remarkPlugins: [
      [remarkDocGen, { generators: [] }],
      remarkInstall,
    ],
  },
});
