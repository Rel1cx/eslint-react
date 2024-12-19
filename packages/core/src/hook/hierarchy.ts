import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isReactHook, isReactHookCall } from "./is";

export function isInsideReactHook(node: TSESTree.Node) {
  return O.exists(AST.traverseUpGuard(node, AST.isFunction), isReactHook);
}

export function isInsideReactHookCall(node: TSESTree.Node): boolean {
  return O.isSome(AST.traverseUp(node, n => AST.is(AST_NODE_TYPES.CallExpression)(n) && isReactHookCall(n)));
}
