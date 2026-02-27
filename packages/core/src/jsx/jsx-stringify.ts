import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Incomplete but sufficient stringification of JSX nodes for common use cases
 *
 * @param node JSX node from TypeScript ESTree
 * @returns String representation of the JSX node
 */
export function stringifyJsx(
  node:
    | TSESTree.JSXIdentifier
    | TSESTree.JSXNamespacedName
    | TSESTree.JSXMemberExpression
    | TSESTree.JSXOpeningElement
    | TSESTree.JSXClosingElement
    | TSESTree.JSXOpeningFragment
    | TSESTree.JSXClosingFragment
    | TSESTree.JSXText,
): string {
  switch (node.type) {
    case AST.JSXIdentifier:
      // Simple element names like "div" or component names like "Button"
      return node.name;
    case AST.JSXNamespacedName:
      // XML-style namespaced elements like "svg:path"
      return `${node.namespace.name}:${node.name.name}`;
    case AST.JSXMemberExpression:
      // Dot-notation components like "React.Fragment" or "Namespace.Component"
      return `${stringifyJsx(node.object)}.${stringifyJsx(node.property)}`;
    case AST.JSXText:
      // Text content inside JSX
      return node.value;
    case AST.JSXOpeningElement:
      // Opening tags like "<div>"
      return `<${stringifyJsx(node.name)}>`;
    case AST.JSXClosingElement:
      // Closing tags like "</div>"
      return `</${stringifyJsx(node.name)}>`;
    case AST.JSXOpeningFragment:
      // Fragment opening syntax "<>"
      return "<>";
    case AST.JSXClosingFragment:
      // Fragment closing syntax "</>"
      return "</>";
  }
}
