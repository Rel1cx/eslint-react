import type { ScopeManager } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function getScope(node: TSESTree.Node, scopeManager: ScopeManager) {
  const { type, parent } = node;
  const inner = type !== T.Program;
  const scope = scopeManager.acquire(node, inner);
  if (scope != null) {
    return scope;
  }
  if (parent != null) {
    return getScope(parent, scopeManager);
  }
  return null;
}
