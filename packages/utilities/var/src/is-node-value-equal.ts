import { isNodeEqual } from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * Determines whether node value equals to another node value
 * @param a node to compare
 * @param b node to compare
 * @param initialScopes initial scopes of the two nodes
 * @returns `true` if node value equal
 */
export function isNodeValueEqual(
  a: TSESTree.Node,
  b: TSESTree.Node,
  initialScopes: [Scope, Scope],
): boolean {
  if (a.type === AST_NODE_TYPES.Literal && b.type === AST_NODE_TYPES.Literal) return a.value === b.value;
  if (a.type === AST_NODE_TYPES.TemplateElement && b.type === AST_NODE_TYPES.TemplateElement) {
    return a.value.cooked === b.value.cooked;
  }
  const [scopesA, scopesB] = initialScopes;
  const sa = getStaticValue(a, scopesA);
  const sb = getStaticValue(b, scopesB);
  if (sa && sb && sa.value === sb.value) return true;
  if (a.type === AST_NODE_TYPES.Identifier && b.type === AST_NODE_TYPES.Identifier) {
    const da = findVariable(scopesA, a)?.defs[0];
    const db = findVariable(scopesB, b)?.defs[0];
    if (!da || !db) return false;
    if (da.node === db.node) return true;
    return isNodeEqual(da.node, db.node);
  }
  if (a.type === AST_NODE_TYPES.MemberExpression && b.type === AST_NODE_TYPES.MemberExpression) {
    return isNodeEqual(a.property, b.property) && isNodeValueEqual(a.object, b.object, initialScopes);
  }
  return false;
}
