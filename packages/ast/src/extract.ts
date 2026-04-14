import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";
import * as Check from "./check";
import type { TSESTreeTypeExpression } from "./types";

export function unwrapped(
  from: TSESTree.Node,
): Exclude<TSESTree.Node, TSESTreeTypeExpression> {
  if (Check.isTypeExpression(from)) {
    return unwrapped(from.expression);
  }
  return from;
}

export function rootIdentifier(
  from: TSESTree.Expression | TSESTree.PrivateIdentifier,
): TSESTree.Identifier | null {
  const node = unwrapped(from);
  if (node.type === AST.Identifier) return node;
  if (node.type === AST.MemberExpression) {
    return rootIdentifier(node.object);
  }
  return null;
}

export function propertyName(from: TSESTree.Node): string | null {
  if (Check.isTypeExpression(from)) {
    return propertyName(unwrapped(from));
  }
  if (from.type === AST.Identifier || from.type === AST.PrivateIdentifier) {
    return from.name;
  }
  if (from.type === AST.Literal) {
    return String(from.value);
  }
  if (from.type === AST.TemplateLiteral && from.expressions.length === 0) {
    return from.quasis[0]?.value.cooked ?? from.quasis[0]?.value.raw ?? null;
  }
  return null;
}

export function fullyQualifiedName(
  from: TSESTree.Node,
  using: (node: TSESTree.Node) => string,
): string {
  switch (from.type) {
    case AST.Identifier:
    case AST.JSXIdentifier:
    case AST.PrivateIdentifier:
      return from.name;
    case AST.MemberExpression:
    case AST.JSXMemberExpression:
      return `${fullyQualifiedName(from.object, using)}.${fullyQualifiedName(from.property, using)}`;
    case AST.JSXNamespacedName:
      return `${from.namespace.name}:${from.name.name}`;
    case AST.JSXText:
      return from.value;
    case AST.Literal:
      return from.raw;
    default:
      return using(from);
  }
}

export function humanReadableKind(
  of: TSESTree.Node,
  delimiter: string = " ",
): string {
  if (of.type === AST.Literal) {
    if ("regex" in of) return "RegExp literal";
    // tsl-ignore dx/nullish
    if (of.value === null) return "null literal";
    return `${typeof of.value} literal`;
  }
  if (Check.isJSX(of)) {
    return `JSX ${toLowerCase(delimiterCase(replace(of.type, "JSX", ""), delimiter))}`;
  }
  return toLowerCase(delimiterCase(of.type, delimiter));
}
