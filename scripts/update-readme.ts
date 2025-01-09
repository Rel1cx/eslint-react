import fs from "fs/promises";

await fs.copyFile(
  "README.md",
  "packages/plugins/eslint-plugin/README.md",
);
