import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";

const RULE_NAME: RuleName = "no-constructed-context-value";

type MessageIds = "";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            // eslint-disable-next-line eslint-plugin/require-meta-docs-description
            description: "TODO: Describe this rule",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            "": "TODO: Fill me in.",
        },
    },
    create(context) {
        return {};
    },
    defaultOptions,
});
