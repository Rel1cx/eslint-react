import * as core from "@eslint-react/core";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if an identifier node is initialized from React
 * @param node The identifier node to check
 * @param initialScope Initial scope to search for the identifier
 * @param importSource The import source to check against
 * @returns Whether the identifier node is initialized from React
 */
export function isFromReact(
  node: TSESTree.Identifier | TSESTree.JSXIdentifier,
  initialScope: Scope,
  importSource = "react",
) {
  const name = node.name;
  switch (true) {
    case node.parent.type === AST.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.Identifier:
      return core.isAPIFromReact(node.parent.object.name, initialScope, importSource);
    case node.parent.type === AST.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.JSXIdentifier:
      return core.isAPIFromReact(node.parent.object.name, initialScope, importSource);
    default:
      return core.isAPIFromReact(name, initialScope, importSource);
  }
}
