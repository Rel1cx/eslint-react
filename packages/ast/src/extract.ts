import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Check from "./check";
import type { TSESTreeTypeExpression } from "./types";

export function unwrap(node: TSESTree.Node): Exclude<TSESTree.Node, TSESTreeTypeExpression> {
  if (Check.isTypeExpression(node) || node.type === AST.ChainExpression) {
    return unwrap(node.expression);
  }
  return node;
}

export function getRootIdentifier(node: TSESTree.Expression | TSESTree.PrivateIdentifier): TSESTree.Identifier | null {
  const expr = unwrap(node);
  if (expr.type === AST.Identifier) return expr;
  if (expr.type === AST.MemberExpression) {
    return getRootIdentifier(expr.object);
  }
  return null;
}

export function getPropertyName(node: TSESTree.Node, resolve = (n: TSESTree.Identifier | TSESTree.PrivateIdentifier): string | null => n.name): string | null {
  node = unwrap(node);
  if (node.type === AST.Identifier || node.type === AST.PrivateIdentifier) {
    return resolve(node);
  }
  if (node.type === AST.Literal) {
    return String(node.value);
  }
  if (node.type === AST.TemplateLiteral && node.expressions.length === 0) {
    return node.quasis[0]?.value.cooked ?? node.quasis[0]?.value.raw ?? null;
  }
  return null;
}

export function getFullyQualifiedName(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  const expr = unwrap(node);
  switch (expr.type) {
    case AST.Identifier:
    case AST.JSXIdentifier:
    case AST.PrivateIdentifier:
      return expr.name;
    case AST.MemberExpression: {
      if (expr.computed) return getText(expr);
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    }
    case AST.JSXMemberExpression:
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    case AST.JSXNamespacedName:
      return `${expr.namespace.name}:${expr.name.name}`;
    case AST.JSXText:
      return expr.value;
    case AST.Literal:
      return expr.raw;
    default:
      return getText(expr);
  }
}
