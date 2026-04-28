import { Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get the arguments of a require expression
 * @param node The node to match
 * @returns The require expression arguments or null if the node is not a require expression
 * @internal
 */
export function getRequireExpressionArguments(node: TSESTree.Node) {
  const unwrapped = Extract.unwrap(node);
  if (unwrapped.type === AST.CallExpression) {
    const callee = Extract.unwrap(unwrapped.callee);
    if (callee.type === AST.Identifier && callee.name === "require") {
      return unwrapped.arguments;
    }
  }
  if (unwrapped.type === AST.MemberExpression) {
    return getRequireExpressionArguments(unwrapped.object);
  }
  return null;
}
