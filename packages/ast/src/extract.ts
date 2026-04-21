import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { delimiterCase, toLowerCase } from "string-ts";
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

export function getPropertyName(node: TSESTree.Node): string | null {
  if (Check.isTypeExpression(node)) {
    return getPropertyName(unwrap(node));
  }
  if (node.type === AST.Identifier || node.type === AST.PrivateIdentifier) {
    return node.name;
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
  switch (node.type) {
    case AST.Identifier:
    case AST.JSXIdentifier:
    case AST.PrivateIdentifier:
      return node.name;
    case AST.MemberExpression:
    case AST.JSXMemberExpression:
      return `${getFullyQualifiedName(node.object, getText)}.${getFullyQualifiedName(node.property, getText)}`;
    case AST.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case AST.JSXText:
      return node.value;
    case AST.Literal:
      return node.raw;
    default:
      return getText(node);
  }
}

export function getHumanReadableKind(node: TSESTree.Node) {
  if (node.type === AST.Literal) {
    if ("regex" in node) return "regexp literal" as const;
    // tsl-ignore dx/nullish
    if (node.value === null) return "null literal" as const;
    return `${typeof node.value} literal` as const;
  }
  return toLowerCase(delimiterCase(node.type, " "));
}
