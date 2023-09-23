import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createEslintRule } from "../../tools/create-eslint-rule";
import { I } from "../lib/primitives/data";
import { AST } from "../utils/ast";

export const RULE_NAME = "no-deprecated-string-refs";

type MessageID = "DEPRECATED_STRING_REF";

type Options = readonly [];

const defaultOptions = [] as const satisfies Options;

function containsStringLiteral({ value }: TSESTree.JSXAttribute) {
    if (I.isNullable(value)) {
        return false;
    }

    return AST.is(N.Literal)(value) && I.isString(value.value);
}

function containsStringExpressionContainer({ value }: TSESTree.JSXAttribute) {
    if (I.isNullable(value)) {
        return false;
    }

    return (
        AST.is(N.JSXExpressionContainer)(value)
        && ((AST.is(N.Literal)(value.expression) && I.isString(value.expression.value))
            || AST.is(N.TemplateLiteral)(value.expression))
    );
}

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow using deprecated string refs",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            DEPRECATED_STRING_REF: "String refs are deprecated. Use callback refs instead.",
        },
    },
    defaultOptions,
    create(context) {
        return {
            JSXAttribute(node) {
                if (!("name" in node) || node.name.name !== "ref") {
                    return;
                }

                const hasStringLiteral = containsStringLiteral(node) || containsStringExpressionContainer(node);
                if (hasStringLiteral) {
                    context.report({
                        messageId: "DEPRECATED_STRING_REF",
                        node,
                    });
                }
            },
        };
    },
});
