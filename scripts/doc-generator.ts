import glob from "fast-glob";
import { $, fs } from "zx";

import { BASEURL_CONFIGS, BASEURL_RULE } from "../constants";

async function main() {
    const files = await glob("rules/*.md");

    for (const file of files) {
        await fs.copyFile(file, `docs/${file}`);
    }

    await $`eslint-doc-generator --rule-list-columns name,description,fixable,hasSuggestions,deprecated --path-rule-list README.MD --url-rule-doc ${BASEURL_RULE}/{name} --url-configs ${BASEURL_CONFIGS}/configs && eslint-doc-generator --rule-list-columns name,description,fixable,hasSuggestions,deprecated --rule-doc-title-format name --path-rule-list ./docs/rules/index.md --url-rule-doc /docs/rules/{name}.md --url-configs /configs/`;
}

main();
