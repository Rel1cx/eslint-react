import type { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isFunction } from "./is";

/**
 * Check if the given node is a `vi.mock`.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock`, otherwise `false`.
 * @internal
 */
export function isViMock(node: TSESTree.Node | null | unit): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.object.name === "vi"
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

/**
 * Check if the given node is a `vi.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock` callback, otherwise `false`.
 * @internal
 */
export function isViMockCallback(node: TSESTree.Node | null | unit) {
  return node != null
    && isFunction(node)
    && node.parent.type === AST.CallExpression
    && isViMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
