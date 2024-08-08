import { is, isFunction, traverseUp, traverseUpGuard } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isReactHook, isReactHookCall } from "./is";

export function isInsideReactHook(node: TSESTree.Node) {
  return O.exists(traverseUpGuard(node, isFunction), isReactHook);
}

export function isInsideReactHookCall(node: TSESTree.Node): boolean {
  return O.isSome(traverseUp(node, n => is(AST_NODE_TYPES.CallExpression)(n) && isReactHookCall(n)));
}
