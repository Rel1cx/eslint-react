import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Get the stringified representation of a JSX node
 * @param node The JSX node
 * @returns The stringified representation
 */
export function stringifyJsx(
  node:
    | TSESTree.JSXIdentifier
    | TSESTree.JSXMemberExpression
    | TSESTree.JSXNamespacedName
    | TSESTree.JSXOpeningElement
    | TSESTree.JSXClosingElement
    | TSESTree.JSXOpeningFragment
    | TSESTree.JSXClosingFragment
    | TSESTree.JSXText,
): string {
  switch (node.type) {
    case T.JSXIdentifier:
      return node.name;
    case T.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case T.JSXMemberExpression:
      return `${stringifyJsx(node.object)}.${stringifyJsx(node.property)}`;
    case T.JSXText:
      return node.value;
    case T.JSXOpeningElement:
      return `<${stringifyJsx(node.name)}>`;
    case T.JSXClosingElement:
      return `</${stringifyJsx(node.name)}>`;
    case T.JSXOpeningFragment:
      return "<>";
    case T.JSXClosingFragment:
      return "</>";
  }
}
