import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isComponentDidMount(
  node: TSESTree.Node,
): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentDidMount";
}

export function isComponentWillUnmount(
  node: TSESTree.Node,
): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUnmount";
}

export function isComponentDidMountFunction(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

export function isComponentWillUnmountFunction(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}
