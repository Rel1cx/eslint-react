import fs from "node:fs";

import { superbytes } from "superbytes";

Bun.spawnSync(["pnpm", "-F", "./test/bundles/**", "run", "clean"]);
Bun.spawnSync(["pnpm", "-F", "./test/bundles/**", "run", "build"]);
Bun.spawnSync(["pnpm", "-F", "./test/bundles/**", "run", "pack"]);
const files = new Bun.Glob("test/bundles/**/dist/**/*");
const gzips = new Bun.Glob("test/bundles/**/*.tgz");
const filesStat = [...files.scanSync()].toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => `${a}${f} ${superbytes(fs.statSync(f).size)}\n`, "");
const gzipsStat = [...gzips.scanSync()].toSorted((a, b) => a.localeCompare(b))
  .reduce((a, f) => `${a}${f} ${superbytes(fs.statSync(f).size)}\n`, "");
fs.writeFileSync("test/bundles.log", "Bundled Size:\n");
fs.appendFileSync("test/bundles.log", filesStat);
fs.appendFileSync("test/bundles.log", "\nGzipped Bundled Size:\n");
fs.appendFileSync("test/bundles.log", gzipsStat);
