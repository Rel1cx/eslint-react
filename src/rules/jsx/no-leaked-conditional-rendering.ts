/* eslint-disable unicorn/no-typeof-undefined */
import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import { createEslintRule } from "../../../tools/create-eslint-rule";
import * as AST from "../../utils/ast";

export const RULE_NAME = "jsx/no-leaked-conditional-rendering";

type MessageID = "INVALID";

type TernaryAlternateValue = RegExp | bigint | boolean | null | number | string;

const COERCE_STRATEGY = "coerce";
const TERNARY_STRATEGY = "ternary";
const DEFAULT_VALID_STRATEGIES = [TERNARY_STRATEGY, COERCE_STRATEGY] as const;
const COERCE_VALID_LEFT_SIDE_EXPRESSIONS = [
    N.UnaryExpression,
    N.BinaryExpression,
    N.CallExpression,
] as const;

const TERNARY_INVALID_ALTERNATE_VALUES = new Set<TernaryAlternateValue>([null, false]);

function getIsCoerceValidNestedLogicalExpression(node: TSESTree.Node): boolean {
    if (AST.is(N.LogicalExpression)(node)) {
        return getIsCoerceValidNestedLogicalExpression(node.left)
            && getIsCoerceValidNestedLogicalExpression(node.right);
    }

    return AST.isOneOf(COERCE_VALID_LEFT_SIDE_EXPRESSIONS)(node);
}

function isValidTernaryAlternate(node: TSESTree.ConditionalExpression) {
    if (!("alternate" in node && "value" in node.alternate)) {
        return true;
    }

    if (typeof node.alternate.value === "undefined") {
        return false;
    }

    return !TERNARY_INVALID_ALTERNATE_VALUES.has(node.alternate.value);
}

export default createEslintRule<[], MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow problematic leaked values from being rendered",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            INVALID: "Potential leaked value that might cause unintentionally rendered values or rendering crashes",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
                if (DEFAULT_VALID_STRATEGIES.includes(TERNARY_STRATEGY)) {
                    return;
                }

                const isJSXElementAlternate = AST.is(N.JSXElement)(node.alternate);

                if (isValidTernaryAlternate(node) || isJSXElementAlternate) {
                    context.report({
                        messageId: "INVALID",
                        node: node.alternate,
                    });
                }
            },
            'JSXExpressionContainer > LogicalExpression[operator="&&"]'(node: TSESTree.LogicalExpression) {
                const leftSide = node.left;

                const isCoerceValidLeftSide = AST.isOneOf(COERCE_VALID_LEFT_SIDE_EXPRESSIONS)(leftSide);

                if (
                    DEFAULT_VALID_STRATEGIES.includes(COERCE_STRATEGY)
                    && (isCoerceValidLeftSide || getIsCoerceValidNestedLogicalExpression(leftSide))
                ) {
                    return;
                }

                if (AST.is(N.Literal)(leftSide) && leftSide.value === "") {
                    return;
                }

                context.report({
                    messageId: "INVALID",
                    node: leftSide,
                });
            },
        };
    },
});
