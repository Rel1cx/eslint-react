import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isClassComponent } from "./is";

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
