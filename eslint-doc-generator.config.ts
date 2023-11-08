/* eslint-disable security/detect-object-injection */
import type { GenerateOptions } from "eslint-doc-generator";
import type { RuleNamesAndRules } from "eslint-doc-generator/dist/lib/types";

const defaultTitle = "react";
const order = ["jsx", "react", "hooks", "naming-convention", "debug"] as const;

export default {
  configEmoji: [
    ["recommended", "👍"],
    ["recommended-type-checked", "🔍"],
    ["debug", "🛠️"],
  ],
  ignoreConfig: [
    "debug-legacy",
    "all-legacy",
    "off-legacy",
    "recommended-legacy",
    "recommended-type-checked-legacy",

    "all",
    "off",
    "recommended-type-checked",
  ],
  pathRuleDoc(name) {
    const [plugin, rule] = name.split("/");

    return `packages/eslint-plugin-${plugin}/src/rules/${rule}.md`;
  },
  pathRuleList: "website/pages/rules/overview.md",
  ruleDocSectionInclude: ["Rule category", "What it does", "Examples"],
  ruleDocTitleFormat: "name",
  ruleListColumns: ["name", "description"],
  ruleListSplit(rules) {
    const record = rules.reduce<Record<string, RuleNamesAndRules>>((acc, [name, rule]) => {
      const title = /^([\w-]+)\/[\w-]+/iu.exec(name)?.[1] ?? defaultTitle;

      return {
        ...acc,
        [title]: [...acc[title] ?? [], [name, rule]],
      };
    }, {});

    return Object.entries(record)
      .sort(([a], [b]) => order.findIndex((x) => a.startsWith(x)) - order.findIndex((x) => b.startsWith(x)))
      .map(([title, rules]) => ({ title, rules }));
  },
} satisfies GenerateOptions;
