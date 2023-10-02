/* eslint-disable security/detect-object-injection */
import type { GenerateOptions } from "eslint-doc-generator";
import type { RuleNamesAndRules } from "eslint-doc-generator/dist/lib/types";

const defaultTitle = "react";

export default {
    "ignoreConfig": ["all", "off"],
    "ruleDocSectionInclude": ["Rule Details"],
    "ruleListSplit": (rules) => {
        const record = rules.reduce<Record<string, RuleNamesAndRules>>((acc, [name, rule]) => {
            const title = /^([\w-]+)\/[\w-]+/iu.exec(name)?.[1] ?? defaultTitle;
            acc[title] = [...(acc[title] ?? []), [name, rule]];

            return acc;
        }, {});

        return Object.keys(record).map((title) => ({
            title,
            rules: record[title] ?? [],
        }));
    },
} satisfies GenerateOptions;
