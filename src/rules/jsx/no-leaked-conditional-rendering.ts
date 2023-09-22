/* eslint-disable unicorn/no-typeof-undefined */
import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/types";
import { getParserServices } from "@typescript-eslint/utils/eslint-utils";

import { createEslintRule } from "../../../tools/create-eslint-rule";
import { AST } from "../../utils/ast";

export const RULE_NAME = "jsx/no-leaked-conditional-rendering";

type MessageID = "POTENTIAL_LEAKED_CONDITIONAL_RENDERING";

type Options = readonly [];

type TernaryAlternateValue = RegExp | bigint | boolean | null | number | string;

const defaultOptions = [] as const satisfies Options;

const COERCE_STRATEGY = "coerce";
const TERNARY_STRATEGY = "ternary";
const DEFAULT_VALID_STRATEGIES = [TERNARY_STRATEGY, COERCE_STRATEGY] as const;
const COERCE_VALID_LEFT_SIDE_EXPRESSIONS = [
    AST_NODE_TYPES.UnaryExpression,
    AST_NODE_TYPES.BinaryExpression,
    AST_NODE_TYPES.CallExpression,
] as const;

const TERNARY_INVALID_ALTERNATE_VALUES = new Set<TernaryAlternateValue>([null, false]);

function getIsCoerceValidNestedLogicalExpression(node: TSESTree.Node): boolean {
    if (AST.is(AST_NODE_TYPES.LogicalExpression)(node)) {
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

export default createEslintRule<Options, MessageID>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow problematic leaked values from being rendered",
            recommended: "recommended",
        },
        schema: [],
        messages: {
            POTENTIAL_LEAKED_CONDITIONAL_RENDERING:
                "Potential leaked value that might cause unintentionally rendered values or rendering crashes",
        },
    },
    defaultOptions,
    create(context) {
        const service = getParserServices(context);

        // TODO: Add type checking for the following
        const checker = service.program.getTypeChecker();

        return {
            "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
                if (DEFAULT_VALID_STRATEGIES.includes(TERNARY_STRATEGY)) {
                    return;
                }

                const isJSXElementAlternate = AST.is(AST_NODE_TYPES.JSXElement)(node.alternate);

                if (isValidTernaryAlternate(node) || isJSXElementAlternate) {
                    context.report({
                        messageId: "POTENTIAL_LEAKED_CONDITIONAL_RENDERING",
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

                if (AST.is(AST_NODE_TYPES.Literal)(leftSide) && leftSide.value === "") {
                    return;
                }

                context.report({
                    messageId: "POTENTIAL_LEAKED_CONDITIONAL_RENDERING",
                    node: leftSide,
                });
            },
        };
    },
});
