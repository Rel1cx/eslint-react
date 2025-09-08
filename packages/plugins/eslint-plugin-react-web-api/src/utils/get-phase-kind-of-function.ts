import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match } from "ts-pattern";

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ER.ComponentPhaseKind | null>(node)
    .when(isFunctionOfUseEffectSetup, () => "setup")
    .when(isFunctionOfUseEffectCleanup, () => "cleanup")
    .when(isFunctionOfComponentDidMount, () => "mount")
    .when(isFunctionOfComponentWillUnmount, () => "unmount")
    .otherwise(() => null);
}

export function isFunctionOfUseEffectSetup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  return node.parent?.type === T.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === T.Identifier
    && node.parent.arguments.at(0) === node
    && ER.isUseEffectLikeCall(node.parent);
}

export function isFunctionOfUseEffectCleanup(node: TSESTree.Node | unit) {
  if (node == null) return false;
  const pReturn = AST.findParentNode(node, AST.is(T.ReturnStatement));
  const pFunction = AST.findParentNode(node, AST.isFunction); // Correctly named variable
  const pFunctionOfReturn = AST.findParentNode(pReturn, AST.isFunction);
  if (pFunction !== pFunctionOfReturn) return false; // Ensure consistent variable naming
  return isFunctionOfUseEffectSetup(pFunction);
}

export function isFunctionOfComponentDidMount(node: TSESTree.Node) {
  return AST.isFunction(node)
    && ER.isComponentDidMount(node.parent)
    && node.parent.value === node;
}

export function isFunctionOfComponentWillUnmount(node: TSESTree.Node) {
  return AST.isFunction(node)
    && ER.isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}
