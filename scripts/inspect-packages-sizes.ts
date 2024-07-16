import fs from "node:fs";
import { formatBytes } from "@pantajoe/bytes";

const selfs = new Bun.Glob("packages/**/dist/**/*");
const files = new Bun.Glob("packages-sizes/**/dist/**/*");
const gzips = new Bun.Glob("packages-sizes/**/*.tgz");
const selfsStat = [...selfs.scanSync()]
  .toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => a + `${f} ${formatBytes(fs.statSync(f).size)}\n`, "");
const filesStat = [...files.scanSync()]
  .toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => a + `${f} ${formatBytes(fs.statSync(f).size)}\n`, "");
const gzipsStat = [...gzips.scanSync()]
  .toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => a + `${f} ${formatBytes(fs.statSync(f).size)}\n`, "");
fs.writeFileSync("packages-sizes.log", "Self Sizes:\n");
fs.appendFileSync("packages-sizes.log", selfsStat);
fs.appendFileSync("packages-sizes.log", "\nBundled Sizes:\n");
fs.appendFileSync("packages-sizes.log", filesStat);
fs.appendFileSync("packages-sizes.log", "\nGzipped Bundled Sizes:\n");
fs.appendFileSync("packages-sizes.log", gzipsStat);
