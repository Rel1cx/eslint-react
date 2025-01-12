import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { isClassComponent } from "./is";

export function isRenderMethodLike(node: TSESTree.Node): node is
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition
{
  return (node.type === T.MethodDefinition || node.type === T.PropertyDefinition)
    && node.key.type === T.Identifier
    && node.key.name === "render"
    && node.parent.parent.type === T.ClassDeclaration;
}

export function isFunctionOfRenderMethod(node: AST.TSESTreeFunction) {
  if (!isRenderMethodLike(node.parent)) {
    return false;
  }

  return isClassComponent(node.parent.parent.parent);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```jsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @returns `true` if node is inside class component's render block, `false` if not
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return !!AST.findParentNode(node, (node) =>
    isRenderMethodLike(node)
    && isClassComponent(node.parent.parent));
}
