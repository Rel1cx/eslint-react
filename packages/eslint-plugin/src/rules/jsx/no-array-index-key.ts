import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../../utils";

export const RULE_NAME = "jsx/no-array-index-key";

type MessageID = "INVALID";

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow comments from being inserted as text nodes",
            recommended: "recommended",
            requiresTypeChecking: false,
        },
        schema: [],
        messages: {
            INVALID: "Missing key prop for element when rendering list",
        },
    },
    defaultOptions: [],
    create() {
        return {};
    },
});
