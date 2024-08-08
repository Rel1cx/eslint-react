import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

/**
 * Checks if the given node is a function expression or arrow function expression of a object method.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a object method, `false` otherwise.
 */
export const isFunctionOfObjectMethod: (node: TSESTree.Node) => boolean = isMatching({
  type: P.union([AST_NODE_TYPES.FunctionExpression, AST_NODE_TYPES.ArrowFunctionExpression]),
  parent: {
    type: AST_NODE_TYPES.Property,
    parent: {
      type: AST_NODE_TYPES.ObjectExpression,
    },
  },
});
