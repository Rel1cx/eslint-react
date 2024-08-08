import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

/**
 * Checks if the given node is a function expression or arrow function expression of a class property.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a class property, `false` otherwise.
 */
export const isFunctionOfClassProperty: (node: TSESTree.Node) => boolean = isMatching({
  type: P.union([AST_NODE_TYPES.FunctionExpression, AST_NODE_TYPES.ArrowFunctionExpression]),
  parent: {
    type: AST_NODE_TYPES.Property,
    parent: {
      type: AST_NODE_TYPES.ClassBody,
    },
  },
});
