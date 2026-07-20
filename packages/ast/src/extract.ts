import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Check from "./check";
import type { TSESTreeTypeExpression } from "./types";

export function unwrap(node: TSESTree.Node): Exclude<TSESTree.Node, TSESTreeTypeExpression> {
  if (Check.isTypeExpression(node) || node.type === AST.ChainExpression) {
    return unwrap(node.expression);
  }
  return node;
}

export function findProperty(properties: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null {
  for (const property of properties) {
    if (property.type === AST.Property && getPropertyName(property) === name) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, name);
      if (found != null) return found;
    }
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

export function getPropertyName(property: TSESTree.Property, effort: "min" | "max" = "min"): string | null {
  const key = unwrap(property.key);
  if (key.type === AST.Identifier && !property.computed) return key.name;
  if (effort === "min") return null;
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

export function getIdentifierAt(node: TSESTree.Expression | TSESTree.PrivateIdentifier, position: number): TSESTree.Identifier | null {
  const identifiers: Array<TSESTree.Identifier | null> = [];
  let current: TSESTree.Node = unwrap(node);
  while (current.type === AST.MemberExpression) {
    const property = unwrap(current.property);
    identifiers.unshift(property.type === AST.Identifier ? property : null);
    current = unwrap(current.object);
  }
  identifiers.unshift(current.type === AST.Identifier ? current : null);
  return identifiers.at(position) ?? null;
}
