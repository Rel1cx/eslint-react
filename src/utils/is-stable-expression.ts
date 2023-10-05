import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";

import * as AST from "./ast";

/**
 * Checks if the given Expression is holding a stable value.
 * @param node
 */
export function isStableExpression(node: TSESTree.Expression) {
    if (AST.is(N.Literal)(node)) {
        return !("regex" in node);
    }

    if (AST.is(N.CallExpression)(node)) {
        return !("callee" in node
            && AST.is(N.Identifier)(node.callee)
            && node.callee.name === "Symbol");
    }

    return !AST.isOneOf([
        N.JSXElement,
        N.ArrayExpression,
        N.ObjectExpression,
        N.FunctionExpression,
        N.ArrowFunctionExpression,
        N.ClassExpression,
        N.NewExpression,
    ])(node);
}
