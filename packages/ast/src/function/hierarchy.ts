import { M } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "../node";

/**
 * Checks if the given node is a function expression or arrow function expression of a object method.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a object method, `false` otherwise.
 */
export const isFunctionOfObjectMethod: (node: TSESTree.Node) => boolean = M.isMatching({
  type: M.P.union([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]),
  parent: {
    type: NodeType.Property,
    parent: {
      type: NodeType.ObjectExpression,
    },
  },
});

/**
 * Checks if the given node is a function expression or arrow function expression of a class method.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a class method, `false` otherwise.
 */
export const isFunctionOfClassMethod: (node: TSESTree.Node) => boolean = M.isMatching({
  type: M.P.union([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]),
  parent: {
    type: NodeType.MethodDefinition,
    parent: {
      type: NodeType.ClassBody,
    },
  },
});

/**
 * Checks if the given node is a function expression or arrow function expression of a class property.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a class property, `false` otherwise.
 */
export const isFunctionOfClassProperty: (node: TSESTree.Node) => boolean = M.isMatching({
  type: M.P.union([NodeType.FunctionExpression, NodeType.ArrowFunctionExpression]),
  parent: {
    type: NodeType.Property,
    parent: {
      type: NodeType.ClassBody,
    },
  },
});
