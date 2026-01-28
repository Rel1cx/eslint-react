import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isComponentDidMount, isComponentWillUnmount } from "./component-method-is";

/**
 * Check if the given node is a componentDidMount callback
 * @param node The node to check
 * @returns True if the node is a componentDidMount callback, false otherwise
 */
export function isComponentDidMountCallback(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

/**
 * Check if the given node is a componentWillUnmount callback
 * @param node The node to check
 * @returns True if the node is a componentWillUnmount callback, false otherwise
 */
export function isComponentWillUnmountCallback(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}
