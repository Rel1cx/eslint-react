import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

function isMethodCall(name: string, looseMatcher?: (name: string) => boolean) {
  // eslint-disable-next-line function/function-return-boolean
  return (node: TSESTree.Node): node is TSESTree.CallExpression => {
    if (node.type !== T.CallExpression) return false;
    if (node.callee.type !== T.MemberExpression) return false;
    if (node.callee.property.type !== T.Identifier) return false;
    return node.callee.property.name === name || looseMatcher != null && looseMatcher(name);
  };
}

export const isArrayMapCallLoose = isMethodCall("map", (name) => name.endsWith("Map"));

export const isArrayFromCallLoose = isMethodCall("from", (name) => name.startsWith("from"));
