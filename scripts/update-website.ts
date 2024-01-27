import * as ReadonlyRecord from "effect/ReadonlyRecord";
import path from "path";

import { copyFile } from "./lib/fs";

const docs = new Bun.Glob("packages/plugins/eslint-plugin-*/src/rules/*.md").scanSync();
const order = ["jsx", "react", "react-dom", "react-hooks", "naming-convention", "debug"] as const;
const [
  files,
  rules,
] = Array.from(docs).reduce<readonly [[string, string][], [string, string][]]>(
  ([files, rules], doc) => {
    const namespace = /^packages\/plugins\/eslint-plugin-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;
    const title = `${namespace}/${basename}`;
    const filename = `${namespace}-${basename}`;
    const dest = path.join("website", "pages", "rules", `${filename}.md`);
    return [[...files, [doc, dest]], [...rules, [filename, title]]] as const;
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
