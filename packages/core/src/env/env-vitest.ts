import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/kit";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";

/**
 * Checks if the given node is inside a `vi.mock` callback.
 * @param context RuleContext
 * @param node The node to check
 * @returns `true` if the node is inside a `vi.mock` callback, otherwise `false`.
 * @internal
 */
export function isInViMockCallback(context: RuleContext, node: TSESTree.Node) {
  const found = AST.findParentNode(node, (n) => {
    if (!AST.isFunction(n)) return false;
    return n.parent.type === T.CallExpression
      && n.parent.callee.type === T.MemberExpression
      && n.parent.callee.object.type === T.Identifier
      && n.parent.callee.object.name === "vi"
      && n.parent.callee.property.type === T.Identifier
      && n.parent.callee.property.name === "mock"
      && n.parent.arguments[1] === n;
  });
  return found != null;
}
