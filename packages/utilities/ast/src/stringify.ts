import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Returns human readable node name for given AST node
 * @param node AST node
 * @param getText A function that returns the text of the node in the source code
 * @returns Human readable node name
 */
export function stringify(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  switch (node.type) {
    case T.CallExpression:
      return stringify(node.callee, getText);
    case T.Identifier:
    case T.PrivateIdentifier:
      return node.name;
    case T.JSXIdentifier:
      return `<${node.name}>`;
    case T.JSXMemberExpression:
      return `${stringify(node.object, getText)}.${stringify(node.property, getText)}`;
    case T.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case T.JSXText:
      return node.value;
    case T.Literal:
      return node.raw;
    case T.MemberExpression:
      return `${stringify(node.object, getText)}.${stringify(node.property, getText)}`;
    default:
      return getText(node);
  }
}
