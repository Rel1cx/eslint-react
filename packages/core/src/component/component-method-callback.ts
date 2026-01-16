import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isComponentDidMount, isComponentWillUnmount } from "./component-method-is";

/**
 * Checks if the node is a function of `componentDidMount`
 * @param node The AST node to check
 * @returns `true` if the node is a function of `componentDidMount`
 */
export function isComponentDidMountCallback(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

/**
 * Checks if the node is a function of `componentWillUnmount`
 * @param node The AST node to check
 * @returns `true` if the node is a function of `componentWillUnmount`
 */
export function isComponentWillUnmountCallback(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}
