import { mkdirSync } from "node:fs";

import glob from "fast-glob";
import path from "pathe";

import { copyFile } from "./lib/fs";

const files = glob.sync("src/rules/*.md").map((x) => path.basename(x));

mkdirSync("docs/rules", { recursive: true });

files.map((file) => copyFile(`src/rules/${file}`, `docs/rules/${file}`));
