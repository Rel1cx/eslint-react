import { findImportSource } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Checks if a variable is initialized from React import
 * @param name The variable name
 * @param initialScope The initial scope
 * @param importSource Alternative import source of React (e.g., "preact/compat")
 * @returns True if the variable is initialized from React import
 */
export function isInitializedFromReact(
  name: string,
  initialScope: Scope,
  importSource = "react",
) {
  return name.toLowerCase() === "react" || Boolean(findImportSource(name, initialScope)?.startsWith(importSource));
}

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
    case node.parent.type === T.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === T.Identifier:
      return isInitializedFromReact(node.parent.object.name, initialScope, importSource);
    case node.parent.type === T.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === T.JSXIdentifier:
      return isInitializedFromReact(node.parent.object.name, initialScope, importSource);
    default:
      return isInitializedFromReact(name, initialScope, importSource);
  }
}
