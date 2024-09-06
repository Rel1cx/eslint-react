import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Returns human readable node name for given AST node
 * @param node AST node
 * @param getText A function that returns the text of the node in the source code
 * @returns Human readable node name
 */
export function toReadableNodeName(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  switch (node.type) {
    case AST_NODE_TYPES.Literal:
      return node.raw;
    case AST_NODE_TYPES.Identifier:
      return node.name;
    case AST_NODE_TYPES.MemberExpression:
      return `${toReadableNodeName(node.object, getText)}.${toReadableNodeName(node.property, getText)}`;
    case AST_NODE_TYPES.CallExpression:
      return toReadableNodeName(node.callee, getText);
    case AST_NODE_TYPES.JSXIdentifier:
      return `<${node.name}>`;
    case AST_NODE_TYPES.JSXMemberExpression:
      return `${toReadableNodeName(node.object, getText)}.${toReadableNodeName(node.property, getText)}`;
    case AST_NODE_TYPES.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case AST_NODE_TYPES.JSXText:
      return node.value;
    default:
      return getText(node);
  }
}
