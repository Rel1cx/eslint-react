import { isString } from "@effect/data/Predicate";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
export const RULE_NAME = "no-deprecated-string-refs";

type MessageID = "INVALID";

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
    return value?.type === N.Literal && isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
    if (value?.type !== N.JSXExpressionContainer) {
        return false;
    }

    if (value.expression.type === N.Literal) {
        return isString(value.expression.value);
    }

    return value.expression.type === N.TemplateLiteral;
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow using deprecated string refs",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID: "String refs are deprecated. Use callback refs instead.",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXAttribute(node) {
                if (node.name.name !== "ref") {
                    return;
                }

                if (containsStringLiteral(node) || containsStringExpressionContainer(node)) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
        };
    },
});
