import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

export type EventPhase = "cleanup" | "setup";

export type EventMethodKind = "addEventListener" | "removeEventListener";

export type EffectContext = {
  effect: TSESTree.Node | null;
  phase: EventPhase;
};

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

export function getEffectContext(node: TSESTree.CallExpression): EffectContext | null {
  const fn = Traverse.findParent(node, isUseEffectCallback);
  if (fn == null) return null;
  const phase = isUseEffectSetupCallback(fn) ? "setup" : "cleanup";
  const setupFn = phase === "setup" ? fn : Traverse.findParent(fn, Check.isFunction);
  const effect = setupFn == null ? null : Extract.unwrap(setupFn).parent ?? null;
  return { effect, phase };
}

export function getCallKind(node: TSESTree.CallExpression): EventMethodKind | "other" {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("addEventListener", "removeEventListener"))(name)) {
    return name;
  }
  return "other";
}

function isGlobalObject(node: TSESTree.Node) {
  return Check.isIdentifier(node) && (node.name === "window" || node.name === "globalThis" || node.name === "self");
}

export function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
  switch (true) {
    case a.type === AST.MemberExpression && b.type === AST.MemberExpression:
      return Compare.isEqual(a.object, b.object);
    case a.type === AST.MemberExpression:
      return isGlobalObject(a.object);
    case b.type === AST.MemberExpression:
      return isGlobalObject(b.object);
    default:
      return true;
  }
}
