import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { remarkMermaid } from "@theguild/remark-mermaid";

export const docs = defineDocs({
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
        dark: "vesper",
        light: "github-light",
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
        transformerTwoslash(),
      ],
    },
    remarkPlugins: [
      [remarkDocGen, { generators: [] }],
      remarkInstall,
      remarkMermaid,
    ],
  },
});
