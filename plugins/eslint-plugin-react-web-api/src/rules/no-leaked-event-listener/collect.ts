import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleListener } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { type EventMethodKind, type EventPhase, getCallKind, getEffectContext } from "./helpers";

export type EventCallFact = {
  kind: EventMethodKind | "other";
  callee: TSESTree.Node;
  effect: TSESTree.Node | null;
  enclosingFunction: TSESTreeFunction | null;
  node: TSESTree.CallExpression;
  phase: EventPhase;
};

export type NoLeakedEventListenerFacts = {
  calls: EventCallFact[];
};

export function createFactCollector() {
  const facts: NoLeakedEventListenerFacts = {
    calls: [],
  };

  const visitor: RuleListener = {
    CallExpression(node: TSESTree.CallExpression) {
      const effectContext = getEffectContext(node);
      if (effectContext == null) return;
      facts.calls.push({
        callee: Extract.unwrap(node.callee),
        effect: effectContext.effect,
        enclosingFunction: Traverse.findParent(node, Check.isFunction),
        kind: getCallKind(node),
        node,
        phase: effectContext.phase,
      });
    },
  };

  return { facts, visitor } as const;
}
