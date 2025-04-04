import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isClassComponent } from "./is";

/**
 * Check whether given node is a render function of a class component
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   render() {
 *    return <div />;
 *  }
 * }
 * ```
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isRenderLike(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "render"
    && node.parent.parent.type === T.ClassDeclaration;
}

/**
 * Check whether given node is a function of a render function of a class component
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   render = () => <div />;
 * ```
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isFunctionOfRender(node: AST.TSESTreeFunction) {
  if (!isRenderLike(node.parent)) {
    return false;
  }

  return isClassComponent(node.parent.parent.parent);
}
