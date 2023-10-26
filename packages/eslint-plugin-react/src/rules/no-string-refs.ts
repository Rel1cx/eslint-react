import { NodeType } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

type MessageID = "INVALID";

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
    return value?.type === NodeType.Literal && isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
    if (value?.type !== NodeType.JSXExpressionContainer) {
        return false;
    }

    if (value.expression.type === NodeType.Literal) {
        return isString(value.expression.value);
    }

    return value.expression.type === NodeType.TemplateLiteral;
}

export default createRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow using deprecated string refs",
            recommended: "recommended",
            requiresTypeChecking: false,
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
