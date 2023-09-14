import { createEslintRule } from "../../tools/create-eslint-rule";
import type { RuleName } from "../../typings";

const RULE_NAME: RuleName = "no-unstable-default-props";

type MessageID = "UNSTABLE_DEFAULT_PROP";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow unstable default props",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            UNSTABLE_DEFAULT_PROP: "Unstable default props are not allowed.",
        },
    },
    defaultOptions,
    create() {
        return {
            // TODO: Implement rule
        };
    },
});
