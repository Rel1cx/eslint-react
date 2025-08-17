import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
export function isRenderMethodLike(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name.startsWith("render")
    && node.parent.parent.type === T.ClassDeclaration;
}
