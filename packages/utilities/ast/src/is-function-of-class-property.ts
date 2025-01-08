import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Checks if the given node is a function expression or arrow function expression of a class property.
 * @param node The node to check.
 * @returns `true` if the node is a function expression or arrow function expression of a class property, `false` otherwise.
 */
export function isFunctionOfClassProperty(node: TSESTree.Node): node is
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionExpression
{
  return (node.type === T.FunctionExpression || node.type === T.ArrowFunctionExpression)
    && node.parent.type === T.Property;
}
