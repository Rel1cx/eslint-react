import { F, isString, zip } from "@eslint-react/tools";
import { ScopeManager } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * Determines whether node equals to another node
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export const isNodeEqual: {
  (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
  (a: TSESTree.Node, b: TSESTree.Node): boolean;
} = F.dual(2, (a: TSESTree.Node, b: TSESTree.Node): boolean => {
  if (a.type !== b.type) return false;
  if (a.type === AST_NODE_TYPES.ThisExpression && b.type === AST_NODE_TYPES.ThisExpression) return true;
  if (a.type === AST_NODE_TYPES.Literal && b.type === AST_NODE_TYPES.Literal) return a.value === b.value;
  if (a.type === AST_NODE_TYPES.TemplateElement && b.type === AST_NODE_TYPES.TemplateElement) {
    return a.value.raw === b.value.raw;
  }
  if (a.type === AST_NODE_TYPES.TemplateLiteral && b.type === AST_NODE_TYPES.TemplateLiteral) {
    if (a.quasis.length !== b.quasis.length || a.expressions.length !== b.expressions.length) return false;
    if (!zip(a.quasis, b.quasis).every(([a, b]) => isNodeEqual(a, b))) return false;
    if (!zip(a.expressions, b.expressions).every(([a, b]) => isNodeEqual(a, b))) return false;
    return true;
  }
  if (a.type === AST_NODE_TYPES.Identifier && b.type === AST_NODE_TYPES.Identifier) return a.name === b.name;
  if (a.type === AST_NODE_TYPES.PrivateIdentifier && b.type === AST_NODE_TYPES.PrivateIdentifier) {
    return a.name === b.name;
  }
  if (a.type === AST_NODE_TYPES.MemberExpression && b.type === AST_NODE_TYPES.MemberExpression) {
    return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
  }
  return false;
});

const scopeManager = new ScopeManager({
  globalReturn: false,
  impliedStrict: true,
  sourceType: "module",
});

/**
 * Determines whether node value equals to another node value
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node value equal
 */
export const isNodeValueEqual: {
  (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
  (a: TSESTree.Node, b: TSESTree.Node): boolean;
} = F.dual(2, (a: TSESTree.Node, b: TSESTree.Node): boolean => {
  if (a.type !== b.type) return false;
  if (a.type === AST_NODE_TYPES.Literal && b.type === AST_NODE_TYPES.Literal) return a.value === b.value;
  if (a.type === AST_NODE_TYPES.TemplateElement && b.type === AST_NODE_TYPES.TemplateElement) {
    return a.value.cooked === b.value.cooked;
  }
  if (a.type === AST_NODE_TYPES.TemplateLiteral && b.type === AST_NODE_TYPES.TemplateLiteral) {
    const va = getStaticValue(a)?.value;
    const vb = getStaticValue(b)?.value;
    if (!isString(va) || !isString(vb)) return false;
    return va === vb;
  }
  if (a.type === AST_NODE_TYPES.Identifier && b.type === AST_NODE_TYPES.Identifier) {
    const sa = scopeManager.acquire(a);
    const sb = scopeManager.acquire(b);
    if (!sa || !sb) return false;
    const da = findVariable(sa, a)?.defs[0];
    const db = findVariable(sb, b)?.defs[0];
    if (!da || !db) return false;
    if (da.node === db.node) return true;
    return isNodeEqual(da.node, db.node);
  }
  if (a.type === AST_NODE_TYPES.MemberExpression && b.type === AST_NODE_TYPES.MemberExpression) {
    return isNodeValueEqual(a.property, b.property) && isNodeValueEqual(a.object, b.object);
  }
  return false;
});
