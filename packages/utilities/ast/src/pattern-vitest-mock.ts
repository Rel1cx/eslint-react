import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isFunction } from "./node-is";

/**
 * Check if the given node is a `vi.mock`.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock`, otherwise `false`.
 * @internal
 */
export function isViMock(node: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.object.name === "vi"
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

/**
 * Check if the given node is a `jest.mock`.
 * @param node The node to check
 * @returns `true` if the node is a `jest.mock`, otherwise `false`.
 * @internal
 */
export function isJestMock(node: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.object.name === "jest"
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

/**
 * Check if the given node is a `vi.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a `vi.mock` callback, otherwise `false`.
 * @internal
 */
export function isViMockCallback(node: TSESTree.Node | null) {
  return node != null
    && isFunction(node)
    && node.parent.type === AST.CallExpression
    && isViMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}

/**
 * Check if the given node is a `jest.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a `jest.mock` callback, otherwise `false`.
 * @internal
 */
export function isJestMockCallback(node: TSESTree.Node | null) {
  return node != null
    && isFunction(node)
    && node.parent.type === AST.CallExpression
    && isJestMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}

/**
 * Check if the given node is a `vi.mock` or `jest.mock` callback.
 * @param node The node to check
 * @returns `true` if the node is a test mock callback, otherwise `false`.
 */
export function isTestMockCallback(node: TSESTree.Node | null) {
  return isViMockCallback(node) || isJestMockCallback(node);
}
