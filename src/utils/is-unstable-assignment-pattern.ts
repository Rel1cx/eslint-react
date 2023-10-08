import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import type { Narrow } from "../lib";
import * as AST from "./ast-types";

export const unstableAssignmentPatternTypes = [
    N.JSXElement,
    N.ArrayExpression,
    N.ObjectExpression,
    N.FunctionExpression,
    N.ArrowFunctionExpression,
    N.ClassExpression,
    N.NewExpression,
    N.CallExpression,
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
    if (right.type === N.Literal) {
        return "regex" in right;
    }

    return AST.isOneOf(unstableAssignmentPatternTypes)(right);
}
