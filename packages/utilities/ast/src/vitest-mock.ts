import type { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import { isFunction } from "./node-is";

/**
 * Checks if the given node is a `vi.mock`.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock`, otherwise `false`.
 * @internal
 */
export function isViMock(node: TSESTree.Node | null | unit): node is TSESTree.MemberExpression {
  return node != null
    && node.type === T.MemberExpression
    && node.object.type === T.Identifier
    && node.object.name === "vi"
    && node.property.type === T.Identifier
    && node.property.name === "mock";
}

/**
 * Checks if the given node is a `vi.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock` callback, otherwise `false`.
 * @internal
 */
export function isViMockCallback(node: TSESTree.Node | null | unit) {
  return node != null
    && isFunction(node)
    && node.parent.type === T.CallExpression
    && isViMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
