import type { ScopeManager } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function getScope(node: TSESTree.Node, scopeManager: ScopeManager) {
  const { type, parent } = node;
  const inner = type !== AST_NODE_TYPES.Program;
  const scope = scopeManager.acquire(node, inner);
  if (scope) return scope;
  if (parent) return getScope(parent, scopeManager);
  return null;
}
