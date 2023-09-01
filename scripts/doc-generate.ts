import glob from "fast-glob";
import path from "pathe";
import { $, fs } from "zx";

import { BASEURL_RULE } from "../tools/create-eslint-rule";

async function main() {
    const files = glob.sync("src/rules/*.md").map((x) => path.basename(x));

    await Promise.all(files.map(async (file) => fs.copyFile(`src/rules/${file}`, `docs/rules/${file}`)));

    await $`eslint-doc-generator --rule-list-columns name,description,fixable,hasSuggestions,deprecated --rule-doc-title-format name --path-rule-list README.MD --url-rule-doc ${BASEURL_RULE}/{name}`;
}

main();
