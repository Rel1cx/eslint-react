import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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
