import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isComponentDidCatch(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentDidCatch";
}

export function isComponentDidMount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentDidMount";
}

export function isComponentDidUpdate(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentDidUpdate";
}

export function isComponentWillMount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentWillMount";
}

export function isComponentWillReceiveProps(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentWillReceiveProps";
}

export function isComponentWillUnmount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUnmount";
}

export function isComponentWillUpdate(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUpdate";
}

export function isGetChildContext(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "getChildContext";
}

export function isGetDefaultProps(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDefaultProps";
}

export function isGetInitialState(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "getInitialState";
}

export function isGetSnapshotBeforeUpdate(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "getSnapshotBeforeUpdate";
}

export function isShouldComponentUpdate(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export function isUnsafeComponentWillMount(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "UNSAFE_componentWillMount";
}

export function isUnsafeComponentWillReceiveProps(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "UNSAFE_componentWillReceiveProps";
}

export function isUnsafeComponentWillUpdate(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && !node.static
    && node.key.type === T.Identifier
    && node.key.name === "UNSAFE_componentWillUpdate";
}

export function isGetDerivedStateFromProps(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDerivedStateFromProps";
}

export function isGetDerivedStateFromError(node: TSESTree.Node): node is AST.TSESTreeMethodOrProperty {
  return AST.isMethodOrProperty(node)
    && node.static
    && node.key.type === T.Identifier
    && node.key.name === "getDerivedStateFromError";
}
