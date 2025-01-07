import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isUseEffectCallLoose } from "../hook";

export function isSetupFunction(node: TSESTree.Node) {
  return node.parent?.type === T.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === T.Identifier
    && node.parent.arguments.at(0) === node
    && isUseEffectCallLoose(node.parent);
}

export function isCleanupFunction(node: TSESTree.Node) {
  const nearestRet = O.getOrNull(AST.findParentNodeGuard(node, AST.is(T.ReturnStatement)));
  if (!nearestRet) {
    return false;
  }
  const nearestFunction = O.getOrNull(AST.findParentNodeGuard(node, AST.isFunction));
  const nearestFunctionOfRet = O.getOrNull(AST.findParentNodeGuard(nearestRet, AST.isFunction));
  if (!nearestFunction || !nearestFunctionOfRet) {
    return false;
  }
  return nearestFunction === nearestFunctionOfRet && isSetupFunction(nearestFunction);
}
