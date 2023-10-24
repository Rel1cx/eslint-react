/* eslint-disable security/detect-object-injection */
import type { GenerateOptions } from "eslint-doc-generator";
import type { RuleNamesAndRules } from "eslint-doc-generator/dist/lib/types";

const defaultTitle = "react";

// TODO: need to modify this config to support multiple eslint-plugin packages
export default {
    configEmoji: [
        ["recommended", "👍"],
        ["recommended-type-checked", "🔍"],
        ["debug", "🛠️"],
        ["jsx", "🎨"],
    ],
    ignoreConfig: ["all", "off", "debug", "recommended-type-checked"],
    pathRuleList: "../../README.md",
    ruleDocSectionInclude: ["Rule Details"],
    ruleDocTitleFormat: "name",
    ruleListSplit(rules) {
        const record = rules.reduce<Record<string, RuleNamesAndRules>>((acc, [name, rule]) => {
            const title = /^([\w-]+)\/[\w-]+/iu.exec(name)?.[1] ?? defaultTitle;

            return {
                ...acc,
                [title]: [...acc[title] ?? [], [name, rule]],
            };
        }, {});

        return Object.entries(record).map(([title, rules]) => ({ title, rules }));
    },
} satisfies GenerateOptions;
