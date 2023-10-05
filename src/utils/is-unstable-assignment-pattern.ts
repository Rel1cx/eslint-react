import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import * as AST from "./ast";

/**
 * Check if the given node is an unstable assignment pattern (will change between assignments)
 * @param node
 * @param node.right
 */
export function isUnstableAssignmentPattern({ right }: TSESTree.AssignmentPattern) {
    if (right.type === N.Literal) {
        return "regex" in right;
    }

    return AST.isOneOf([
        N.JSXElement,
        N.ArrayExpression,
        N.ObjectExpression,
        N.FunctionExpression,
        N.ArrowFunctionExpression,
        N.ClassExpression,
        N.NewExpression,
        N.CallExpression,
    ])(right);
}
