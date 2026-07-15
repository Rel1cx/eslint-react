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

export function getCalleeName(node: TSESTree.CallExpression): string | null {
  const callee = unwrap(node.callee);
  if (callee.type === AST.Identifier) {
    return callee.name;
  }
  if (callee.type === AST.MemberExpression && !callee.computed && callee.property.type === AST.Identifier) {
    return callee.property.name;
  }
  return null;
}

export function getStaticPropertyName(prop: TSESTree.Property): string | null {
  const key = unwrap(prop.key);
  if (key.type === AST.Identifier && !prop.computed) return key.name;
  if (key.type === AST.Literal && typeof key.value === "string") return key.value;
  if (key.type === AST.TemplateLiteral && key.expressions.length === 0) {
    return key.quasis[0]?.value.cooked ?? key.quasis[0]?.value.raw ?? null;
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
