import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { and, or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";
import { isFromObserver, isNewObserver } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-intersection-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expected-disconnect-in-control-flow"
  | "expected-disconnect-or-unobserve-in-cleanup"
  | "unexpected-floating-instance";

// #endregion

// #region Types

type CallKind = ObserverEntry["method"] | "other";

type ObserverEntry =
  | {
    method: "disconnect";
    node: TSESTree.CallExpression;
    observer: TSESTree.Node;
  }
  | {
    element: TSESTree.Node;
    method: "observe" | "unobserve";
    node: TSESTree.CallExpression;
    observer: TSESTree.Node;
  };

type OEntry = ObserverEntry & { method: "observe" };
type UEntry = ObserverEntry & { method: "unobserve" };
type DEntry = ObserverEntry & { method: "disconnect" };

// #endregion

// #region Helpers

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.MemberExpression) {
    return "other";
  }
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("observe", "unobserve", "disconnect"))(name) && isFromObserver(context, callee, "IntersectionObserver")) {
    return name;
  }
  return "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'IntersectionObserver' created in a component or custom hook has a corresponding 'IntersectionObserver.disconnect()'.",
    },
    messages: {
      "expected-disconnect-in-control-flow":
        "Dynamically added 'IntersectionObserver.observe' should be cleared all at once using 'IntersectionObserver.disconnect' in the cleanup function.",
      "expected-disconnect-or-unobserve-in-cleanup": "An 'IntersectionObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      "unexpected-floating-instance":
        "An 'IntersectionObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `IntersectionObserver` is not present in the file
  if (!context.sourceCode.text.includes("IntersectionObserver")) {
    return {};
  }
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    phaseNode: TSESTreeFunction;
  }[] = [];
  const oEntries: OEntry[] = [];
  const uEntries: UEntry[] = [];
  const dEntries: DEntry[] = [];
  return {
    ["CallExpression"](node) {
      if (Traverse.findParent(node, isUseEffectCallback) == null) {
        return;
      }
      const callee = Extract.unwrap(node.callee);
      if (callee.type !== AST.MemberExpression) {
        return;
      }
      const { object } = callee;
      match(getCallKind(context, node))
        .with("disconnect", () => {
          dEntries.push({
            method: "disconnect",
            node,
            observer: object,
          });
        })
        .with("observe", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          oEntries.push({
            element,
            method: "observe",
            node,
            observer: object,
          });
        })
        .with("unobserve", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          uEntries.push({
            element,
            method: "unobserve",
            node,
            observer: object,
          });
        })
        .otherwise(() => null);
    },
    ["NewExpression"](node) {
      const fn = Traverse.findParent(node, and(Check.isFunction, isUseEffectCallback));
      if (fn == null) {
        return;
      }
      if (!isNewObserver(node, "IntersectionObserver")) {
        return;
      }
      const id = resolveEnclosingAssignmentTarget(node);
      if (id == null) {
        context.report({
          messageId: "unexpected-floating-instance",
          node,
        });
        return;
      }
      observers.push({
        id,
        node,
        phaseNode: fn,
      });
    },
    ["Program:exit"]() {
      for (const { id, node, phaseNode } of observers) {
        // FIXME: disconnect/unobserve entries are matched by identity only, without requiring them
        // to happen in the cleanup phase - `observer.disconnect()` called right in the setup passes
        // the check. Record the `phase` on entries and require `phase === "cleanup"` when matching.

        // A disconnect inside the observer's own callback (the observe-once pattern) is not a reliable
        // cleanup: the callback may never run if the component unmounts before the element intersects
        if (dEntries.some((e) => Traverse.findParent(e.node, (n) => n === node) == null && isAssignmentTargetEqual(context, e.observer, id))) {
          continue;
        }
        const matchedOEntries = oEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const matchedUEntries = uEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const isDynamic = or(Check.isCallExpression, Check.isConditional);
        const isPhaseNode = (n: TSESTree.Node | null) => n === phaseNode;
        const hasDynamicallyAdded = matchedOEntries.some((e) => !isPhaseNode(Traverse.findParent(e.node, or(isDynamic, isPhaseNode))));
        if (hasDynamicallyAdded) {
          context.report({ messageId: "expected-disconnect-in-control-flow", node });
          continue;
        }
        for (const oEntry of matchedOEntries) {
          if (matchedUEntries.some((uEntry) => isAssignmentTargetEqual(context, uEntry.element, oEntry.element))) {
            continue;
          }
          context.report({ messageId: "expected-disconnect-or-unobserve-in-cleanup", node: oEntry.node });
        }
      }
    },
  };
}

// #endregion
