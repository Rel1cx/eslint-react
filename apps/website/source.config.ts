import { remarkMermaid } from "@theguild/remark-mermaid";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkDocGen, remarkInstall } from "fumadocs-docgen";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  meta: {
    schema: metaSchema,
  },
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      langs: [
        "bash",
        "css",
        "html",
        "js",
        "json",
        "jsonc",
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
