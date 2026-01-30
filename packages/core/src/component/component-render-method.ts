import * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Check whether given node is a render method of a class component
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   renderHeader = () => <div />;
 *   renderFooter = () => <div />;
 * }
 * ```
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderMethodLike(node: TSESTree.Node): node is ast.TSESTreeMethodOrProperty {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name.startsWith("render")
    && node.parent.parent.type === AST.ClassDeclaration;
}
