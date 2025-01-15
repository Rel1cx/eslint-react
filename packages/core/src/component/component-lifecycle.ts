import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isClassComponent } from "./is";
import { isMatching, P } from "ts-pattern";

export function isComponentDidMount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentDidMount";
}

export function isComponentWillUnmount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUnmount";
}

export function isComponentDidCatch(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentDidCatch";
}

export function isGetDerivedStateFromError(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDerivedStateFromError";
}

export function isGetDerivedStateFromProps(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDerivedStateFromProps";
}

export function isFunctionOfComponentDidMount(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

export function isFunctionOfComponentWillUnmount(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}

export function isRenderMethodLike(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
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
  return AST.findParentNode(node, (node) =>
    isRenderMethodLike(node)
    && isClassComponent(node.parent.parent)) != null;
}
