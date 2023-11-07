import * as MutableList from "effect/MutableList";
import * as MutableRef from "effect/MutableRef";
import glob from "fast-glob";
import path from "path";

import { copyFile } from "./lib/fs";

const docs = glob.sync("packages/eslint-plugin-*/src/rules/*.md");

const metas = MutableRef.make<Record<string, string>>({});
const files = MutableList.make<[string, string]>();
const order = ["jsx", "react", "hooks", "naming-convention", "debug"] as const;

for (const doc of docs) {
  const namespace = /^packages\/eslint-plugin-([^/]+)/u.exec(doc)?.[1] ?? "";
  const basename = path.parse(path.basename(doc)).name;
  const filename = `${namespace}-${basename}`;
  const title = `${namespace}/${basename}`;
  const dest = path.join("website", "pages", "rules", `${filename}.md`);
  MutableRef.update(metas, (m) => ({ ...m, [filename]: title }));
  MutableList.append(files, [doc, dest]);
}

await Promise.all([...files].map(([src, dest]) => copyFile(src, dest)));

const metaFile = path.join("website", "pages", "rules", "_meta.json");
MutableRef.update(metas, (m) =>
  Object.fromEntries(
    [...Object.entries(m)]
      .sort(([a], [b]) => a.localeCompare(b))
      .sort(([a], [b]) => order.findIndex((x) => a.startsWith(x)) - order.findIndex((x) => b.startsWith(x))),
  ));
await Bun.write(metaFile, JSON.stringify(MutableRef.get(metas), null, 2));
Bun.spawnSync(["pnpm", "--filter", "website", "run", "build"], {
  stdio: ["inherit", "inherit", "inherit"],
});
