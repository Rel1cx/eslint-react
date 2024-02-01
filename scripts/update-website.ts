import * as ReadonlyRecord from "effect/ReadonlyRecord";
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
    const isCoreRule = namespace === "core";
    const name = isCoreRule ? basename : `${namespace}-${basename}`;
    const title = isCoreRule ? basename : `${namespace}/${basename}`;
    const dest = path.join("website", "pages", "rules", `${name}.mdx`);
    return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
  },
  [[], []],
);
const metaFile = path.join("website", "pages", "rules", "_meta.json");
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
  ...ReadonlyRecord.fromEntries(
    rules
      .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))
      .sort(([a], [b]) => order.findLastIndex((x) => a.startsWith(x)) - order.findLastIndex((x) => b.startsWith(x))),
  ),
};
await Bun.write(metaFile, JSON.stringify(metaContent, null, 2));
await Promise.all(files.map(([src, dest]) => copyFile(src, dest)));
