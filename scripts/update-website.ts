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
    const dest = path.join("apps", "website", "content", "docs", "rules", `${name}.md`);
    return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
  },
  [[], []],
);

await Promise.all(files.map(async ([src, dest]) => fs.copyFile(src, dest)));

// fs.writeFileSync(path.join("apps", "website", "content", "docs", "rules", "data.json"), JSON.stringify(rules, null, 2));

const changelog = await fs.readFile("CHANGELOG.md", "utf-8");

const changelogWithFrontmatter = [
  "---",
  "title: Changelog",
  "---",
  "",
  changelog,
].join("\n");

await fs.writeFile(path.join("apps", "website", "content", "docs", "changelog.md"), changelogWithFrontmatter);

// workaround for @tailwindcss/postcss plugin not working with symlinked node_modules
const linkPath = path.join("apps", "website", "node_modules", "fumadocs-ui", "dist");
const realPath = await fs.realpath(linkPath);
const distPath = path.join("apps", "website", "components", "fumadocs-ui");
await fs.rm(distPath, { force: true, recursive: true });
await fs.cp(
  realPath,
  distPath,
  { dereference: true, recursive: true },
);

// generate tailwindcss sources
// const sourcePath = path.join("apps", "website", "app", "sources.css");
// const sourceCode = [
//   '@source ".";',
//   '@source "../components";',
//   '@source "../content";',
//   `@source "../components/fumadocs-ui/**/*.js";`,
// ].join("\n");

// await fs.writeFile(sourcePath, sourceCode);
