import { remarkMermaid } from "@theguild/remark-mermaid";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      experimentalJSEngine: true,
      inline: "tailing-curly-colon",
      langs: [
        "bash",
        "css",
        "html",
        "js",
        "json",
        "jsx",
        "lisp",
        "log",
        "md",
        "mdx",
        "regexp",
        "sh",
        "shell",
        "ts",
        "tsx",
        "yaml",
        "diff",
      ],
      lazy: true,
      themes: {
        dark: "github-dark",
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
