import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isUseEffectLikeCall } from "./hook-is";

export function isFunctionOfUseEffectSetup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  return node.parent?.type === T.CallExpression
    && node.parent.arguments.at(0) === node
    && isUseEffectLikeCall(node.parent);
}

export function isFunctionOfUseEffectCleanup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  const pReturn = AST.findParentNode(node, AST.is(T.ReturnStatement));
  const pFunction = AST.findParentNode(node, AST.isFunction); // Correctly named variable
  const pFunctionOfReturn = AST.findParentNode(pReturn, AST.isFunction);
  if (pFunction !== pFunctionOfReturn) return false; // Ensure consistent variable naming
  return isFunctionOfUseEffectSetup(pFunction);
}
