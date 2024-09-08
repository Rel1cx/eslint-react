import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isUseEffectCallLoose } from "../hook";

export function isSetupFunction(node: TSESTree.Node) {
  return node.parent?.type === AST_NODE_TYPES.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === AST_NODE_TYPES.Identifier
    && node.parent.arguments.at(0) === node
    && isUseEffectCallLoose(node.parent);
}

export function isCleanupFunction(node: TSESTree.Node) {
  const nearestRet = O.getOrNull(AST.traverseUpGuard(node, AST.is(AST_NODE_TYPES.ReturnStatement)));
  if (!nearestRet) return false;
  const nearestFunction = O.getOrNull(AST.traverseUpGuard(node, AST.isFunction));
  const nearestFunctionOfRet = O.getOrNull(AST.traverseUpGuard(nearestRet, AST.isFunction));
  if (!nearestFunction || !nearestFunctionOfRet) return false;
  return nearestFunction === nearestFunctionOfRet && isSetupFunction(nearestFunction);
}
