/* eslint-disable no-await-in-loop */
import fs from "node:fs/promises";

import glob from "fast-glob";
import path from "pathe";

await fs.mkdir("docs/rules", { recursive: true });

const files = glob.sync("rules/**/*.md", { cwd: "src" });

for (const file of files) {
    const src = path.join("src", file);
    const dist = path.join("docs", file);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.mkdir(path.dirname(dist), { recursive: true });
    await fs.copyFile(src, dist);
}
