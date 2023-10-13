import { isOneOf, NodeType } from "@eslint-react/ast";
import type { Narrow } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export const unstableAssignmentPatternTypes = [
    NodeType.JSXElement,
    NodeType.ArrayExpression,
    NodeType.ObjectExpression,
    NodeType.FunctionExpression,
    NodeType.ArrowFunctionExpression,
    NodeType.ClassExpression,
    NodeType.NewExpression,
    NodeType.CallExpression,
] as const;

/**
 * Check if the given node is an unstable assignment pattern (will change between assignments)
 * @param node
 * @param node.right
 */
export function isUnstableAssignmentPattern(node: TSESTree.AssignmentPattern): node is
    & TSESTree.AssignmentPattern
    & Narrow<{
        right: TSESTree.RegExpLiteral | typeof unstableAssignmentPatternTypes[number];
    }>
{
    const { right } = node;
    if (right.type === NodeType.Literal) {
        return "regex" in right;
    }

    return isOneOf(unstableAssignmentPatternTypes)(right);
}
