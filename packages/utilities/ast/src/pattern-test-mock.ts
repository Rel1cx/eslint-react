import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { isFunction } from "./node-is";

export function isTestMock(node: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

export function isTestMockCallback(node: TSESTree.Node | null) {
  return node != null
    && isFunction(node)
    && node.parent.type === AST.CallExpression
    && isTestMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
