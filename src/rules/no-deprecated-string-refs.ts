import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createRule } from "../../tools/create-rule";
import { isNil, isString } from "../lib/primitives";
import * as AST from "../utils/ast";

export const RULE_NAME = "no-deprecated-string-refs";

type MessageID = "INVALID";

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
    if (isNil(value)) {
        return false;
    }

    return AST.is(N.Literal)(value) && isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
    if (isNil(value)) {
        return false;
    }

    return (
        AST.is(N.JSXExpressionContainer)(value)
        && (
            // Check if the expression container contains a string literal
            (AST.is(N.Literal)(value.expression) && isString(value.expression.value))
            // Or is a template literal
            || AST.is(N.TemplateLiteral)(value.expression)
        )
    );
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
                if (!("name" in node) || node.name.name !== "ref") {
                    return;
                }

                const hasStringLiteral = containsStringLiteral(node) || containsStringExpressionContainer(node);
                if (hasStringLiteral) {
                    context.report({
                        messageId: "INVALID",
                        node,
                    });
                }
            },
        };
    },
});
