import { copyFile } from "./lib/fs";

const source = "README.md";
const dest = ["packages/plugins/eslint-plugin/README.md"];
await Promise.all(dest.map((d) => copyFile(source, d)));
