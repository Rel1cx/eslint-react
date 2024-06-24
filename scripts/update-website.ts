import CodeBlockWriter from "code-block-writer";
import * as Record from "effect/Record";
import path from "pathe";

import { copyFile } from "./lib/fs";

const docs = new Bun.Glob("packages/plugins/eslint-plugin-react-*/src/rules/*.md").scanSync();
const order = ["dom", "hooks-extra", "naming-convention", "debug"] as const;
const [
  files,
  rules,
] = Array.from(docs).reduce<readonly [[string, string][], [string, string][]]>(
  ([files, rules], doc) => {
    const namespace = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;
    const isCoreRule = namespace === "x";
    const name = isCoreRule ? basename : `${namespace}-${basename}`;
    const title = isCoreRule ? basename : `${namespace}/${basename}`;
    const dest = path.join("website", "pages", "rules", `${name}.mdx`);
    return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
  },
  [[], []],
);
const metaFile = path.join("website", "pages", "rules", "_meta.ts");
const metaContent = {
  overview: {
    title: "Overview",
    theme: {
      layout: "full",
    },
  },
  // eslint-disable-next-line perfectionist/sort-objects
  "---": {
    type: "separator",
  },
  ...Record.fromEntries(
    rules
      .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))
      .sort(([a], [b]) => order.findLastIndex((x) => a.startsWith(x)) - order.findLastIndex((x) => b.startsWith(x))),
  ),
};
const writer = new CodeBlockWriter({
  indentNumberOfSpaces: 2,
  newLine: "\n",
  useSingleQuote: false,
  useTabs: false,
});
writer.write("export default").block(() => {
  for (const [key, value] of Object.entries(metaContent)) {
    writer.writeLine(`${JSON.stringify(key)}: ${JSON.stringify(value)},`);
  }
});

// await Bun.write(metaFile, JSON.stringify(metaContent, null, 2));
await Bun.write(metaFile, writer.toString());
await Promise.all(files.map(([src, dest]) => copyFile(src, dest)));
