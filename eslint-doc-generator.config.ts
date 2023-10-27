/* eslint-disable security/detect-object-injection */
import type { GenerateOptions } from "eslint-doc-generator";
import type { RuleNamesAndRules } from "eslint-doc-generator/dist/lib/types";

const defaultTitle = "react";

export default {
  configEmoji: [
    ["recommended-legacy", "👍"],
    ["recommended-type-checked-legacy", "🔍"],
    ["debug-legacy", "🛠️"],
    ["jsx-legacy", "🎨"],
  ],
  ignoreConfig: [
    "all-legacy",
    "off-legacy",
    "debug-legacy",
    "recommended-type-checked-legacy",
    "all",
    "debug",
    "jsx",
    "off",
    "recommended",
    "recommended-type-checked",
  ],
  pathRuleDoc(name) {
    const [plugin, rule] = name.split("/");

    return `packages/eslint-plugin-${plugin}/src/rules/${rule}.md`;
  },
  pathRuleList: "README.md",
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
