/* eslint-disable jsdoc/require-param */
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";

import { isJSX } from "./node-is";

function getLiteralValueType(input: bigint | boolean | null | number | string | symbol) {
  // eslint-disable-next-line nullish-comparison/v1
  if (input === null) return "null";
  return typeof input;
}

/**
 * @internal
 */
export function toDelimiterFormat(node: TSESTree.Node, delimiter = " ") {
  if (node.type === T.Literal) {
    if ("regex" in node) {
      return "RegExp literal";
    }
    return `${getLiteralValueType(node.value)} literal` as const;
  }
  if (isJSX(node)) {
    return `JSX ${toLowerCase(delimiterCase(replace(node.type, "JSX", ""), delimiter))}` as const;
  }
  return toLowerCase(delimiterCase(node.type, delimiter));
}

/**
 * Incomplete but sufficient stringification of AST nodes for common use cases
 *
 * @internal
 */
export function toStringFormat(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  switch (node.type) {
    case T.Identifier:
    case T.JSXIdentifier:
    case T.PrivateIdentifier:
      return node.name;
    case T.MemberExpression:
    case T.JSXMemberExpression:
      return `${toStringFormat(node.object, getText)}.${toStringFormat(node.property, getText)}`;
    case T.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case T.JSXText:
      return node.value;
    case T.Literal:
      return node.raw;
    default:
      return getText(node);
  }
}
