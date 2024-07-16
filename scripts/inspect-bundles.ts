import fs from "node:fs";

import { formatBytes } from "@pantajoe/bytes";

const files = new Bun.Glob("test/bundles/**/dist/**/*");
const gzips = new Bun.Glob("test/bundles/**/*.tgz");
const filesStat = [...files.scanSync()]
  .toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => `${a}${f} ${formatBytes(fs.statSync(f).size)}\n`, "");
const gzipsStat = [...gzips.scanSync()]
  .toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => `${a}${f} ${formatBytes(fs.statSync(f).size)}\n`, "");
fs.writeFileSync("test/bundles.log", "Bundled Size:\n");
fs.appendFileSync("test/bundles.log", filesStat);
fs.appendFileSync("test/bundles.log", "\nGzipped Bundled Size:\n");
fs.appendFileSync("test/bundles.log", gzipsStat);
