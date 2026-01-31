import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";

import { isJSX } from "./is";

/**
 * Convert a node type to a delimiter format string
 * @param node The AST node
 * @param delimiter The delimiter to use
 * @returns The delimiter format string
 */
export function toDelimiterFormat(node: TSESTree.Node, delimiter = " ") {
  if (node.type === AST.Literal) {
    if ("regex" in node) {
      return "RegExp literal";
    }
    // eslint-disable-next-line function-rule-2/function-rule
    if (node.value === null) {
      return "null literal" as const;
    }
    return `${typeof node.value} literal` as const;
  }
  if (isJSX(node)) {
    return `JSX ${toLowerCase(delimiterCase(replace(node.type, "JSX", ""), delimiter))}` as const;
  }
  return toLowerCase(delimiterCase(node.type, delimiter));
}

/**
 * Incomplete but sufficient stringification of AST nodes for common use cases
 * @param node The AST node
 * @param getText A function to get the text representation of a node
 * @returns A string representation of the node
 */
export function toStringFormat(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  switch (node.type) {
    case AST.Identifier:
    case AST.JSXIdentifier:
    case AST.PrivateIdentifier:
      return node.name;
    case AST.MemberExpression:
    case AST.JSXMemberExpression:
      return `${toStringFormat(node.object, getText)}.${toStringFormat(node.property, getText)}`;
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
