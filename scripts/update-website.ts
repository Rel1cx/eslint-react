import fs from "node:fs";

const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");

const changelogWithFrontmatter = [
  "---",
  "title: Changelog",
  "---",
  "",
  changelog,
].join("\n");

fs.writeFileSync("website/content/docs/changelog.md", changelogWithFrontmatter);
