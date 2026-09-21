import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";
import { isFromObserver, isNewObserver } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedDisconnectInControlFlow"
  | "expectedDisconnectOrUnobserveInCleanup"
  | "unexpectedFloatingInstance";

// #endregion

// #region Types

type FunctionKind = "cleanup" | "setup" | "other";
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

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.MemberExpression) {
    return "other";
  }
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("observe", "unobserve", "disconnect"))(name) && isFromObserver(context, callee, "ResizeObserver")) {
    return name;
  }
  return "other";
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  if (isUseEffectSetupCallback(node)) return "setup";
  if (isUseEffectCleanupCallback(node)) return "cleanup";
  return "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.",
    },
    messages: {
      expectedDisconnectInControlFlow:
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      expectedDisconnectOrUnobserveInCleanup: "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      unexpectedFloatingInstance: "A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `ResizeObserver` is not present in the file
  if (!context.sourceCode.text.includes("ResizeObserver")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    phaseNode: TSESTreeFunction;
  }[] = [];
  const oEntries: OEntry[] = [];
  const uEntries: UEntry[] = [];
  const dEntries: DEntry[] = [];
  return {
    [":function"](node: TSESTreeFunction) {
      const kind = getFunctionKind(node);
      fEntries.push({ kind, node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      const fKind = fEntries.findLast((x) => x.kind !== "other")?.kind;
      if (fKind == null) {
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
      const fEntry = fEntries.findLast((x) => x.kind !== "other");
      if (fEntry == null) {
        return;
      }
      if (!isNewObserver(node, "ResizeObserver")) {
        return;
      }
      const id = resolveEnclosingAssignmentTarget(node);
      if (id == null) {
        context.report({
          messageId: "unexpectedFloatingInstance",
          node,
        });
        return;
      }
      observers.push({
        id,
        node,
        phaseNode: fEntry.node,
      });
    },
    ["Program:exit"]() {
      for (const { id, node, phaseNode } of observers) {
        // A disconnect inside the observer's own callback is not a reliable cleanup:
        // the callback may never run if the component unmounts before the element resizes
        const isInsideObserverCallback = (e: DEntry) => Traverse.findParent(e.node, (n) => n === node) != null;
        // FIXME: disconnect/unobserve entries are matched by identity only, without requiring them
        // to happen in the cleanup phase - `observer.disconnect()` called right in the setup passes
        // the check. Record `phase: fKind` on entries and require `phase === "cleanup"` when matching.
        if (dEntries.some((e) => !isInsideObserverCallback(e) && isAssignmentTargetEqual(context, e.observer, id))) {
          continue;
        }
        const matchedOEntries = oEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const matchedUEntries = uEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const isDynamic = (node: TSESTree.Node | null) => node?.type === AST.CallExpression || Check.isConditional(node);
        const isPhaseNode = (node: TSESTree.Node | null) => node === phaseNode;
        const hasDynamicallyAdded = matchedOEntries
          .some((e) => !isPhaseNode(Traverse.findParent(e.node, or(isDynamic, isPhaseNode))));
        if (hasDynamicallyAdded) {
          context.report({ messageId: "expectedDisconnectInControlFlow", node });
          continue;
        }
        for (const oEntry of matchedOEntries) {
          if (matchedUEntries.some((uEntry) => isAssignmentTargetEqual(context, uEntry.element, oEntry.element))) {
            continue;
          }
          context.report({ messageId: "expectedDisconnectOrUnobserveInCleanup", node: oEntry.node });
        }
      }
    },
  };
}

// #endregion
