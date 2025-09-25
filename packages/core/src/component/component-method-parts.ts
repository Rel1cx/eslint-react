import * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import { isComponentDidMount, isComponentWillUnmount } from "./component-method";

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
