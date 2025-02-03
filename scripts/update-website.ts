import fs from "node:fs/promises";
import path from "node:path";

import { glob } from "./lib";

const docs = glob(["packages/plugins/eslint-plugin-react-*/src/rules/*.md"]);

const [
  files,
  // rules,
] = Array.from(docs).reduce<readonly [[string, string][], [string, string][]]>(
  ([files, rules], doc) => {
    const catename = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;
    const isPluginX = catename === "x";
    const name = isPluginX
      ? basename
      : `${catename}-${basename}`;
    const title = isPluginX
      ? basename
      : `${catename}/${basename}`;
    const dest = path.join("website", "content", "docs", "rules", `${name}.md`);
    return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
  },
  [[], []],
);

await Promise.all(files.map(async ([src, dest]) => fs.copyFile(src, dest)));

// fs.writeFileSync(path.join("website", "content", "docs", "rules", "data.json"), JSON.stringify(rules, null, 2));

const changelog = await fs.readFile("CHANGELOG.md", "utf-8");

const changelogWithFrontmatter = [
  "---",
  "title: Changelog",
  "---",
  "",
  changelog,
].join("\n");

await fs.writeFile("website/content/docs/changelog.md", changelogWithFrontmatter);
