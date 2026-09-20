import { Check, Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get the arguments of a require expression.
 * @param node The node to check.
 * @returns The require expression arguments, or `null` when the node is not a require expression.
 * @internal
 */
export function getRequireExpressionArguments(node: TSESTree.Node) {
  const unwrapped = Extract.unwrap(node);
  if (unwrapped.type === AST.CallExpression) {
    const callee = Extract.unwrap(unwrapped.callee);
    if (Check.isIdentifier(callee, "require")) return unwrapped.arguments;
    return null;
  }
  if (unwrapped.type === AST.MemberExpression) return getRequireExpressionArguments(unwrapped.object);
  return null;
}
