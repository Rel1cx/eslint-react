import * as MutList from "effect/MutableList";
import * as MutRef from "effect/MutableRef";
import path from "path";

import { copyFile } from "./lib/fs";

const docs = new Bun.Glob("packages/plugins/eslint-plugin-*/src/rules/*.md").scanSync();

const order = ["jsx", "react", "react-hooks", "naming-convention", "debug"] as const;
const files = MutList.make<[string, string]>();
const metas = MutRef.make<Record<string, Record<string, string> | string>>({});

for (const doc of docs) {
  const namespace = /^packages\/plugins\/eslint-plugin-([^/]+)/u.exec(doc)?.[1] ?? "";
  const basename = path.parse(path.basename(doc)).name;
  const filename = `${namespace}-${basename}`;
  const title = `${namespace}/${basename}`;
  const dest = path.join("website", "pages", "rules", `${filename}.md`);
  MutRef.update(metas, (m) => ({ ...m, [filename]: title }));
  MutList.append(files, [doc, dest]);
}

await Promise.all([...files].map(([src, dest]) => copyFile(src, dest)));

const metaFile = path.join("website", "pages", "rules", "_meta.json");
MutRef.update(metas, (m) =>
  Object.fromEntries(
    [...Object.entries(m)]
      .sort(([a], [b]) => a.localeCompare(b))
      .sort(([a], [b]) => order.findLastIndex((x) => a.startsWith(x)) - order.findLastIndex((x) => b.startsWith(x))),
  ));
MutRef.update(metas, (m) => ({
  overview: "Overview",
  // eslint-disable-next-line perfectionist/sort-objects
  "---": {
    type: "separator",
  },
  ...m,
}));
await Bun.write(metaFile, JSON.stringify(MutRef.get(metas), null, 2));
