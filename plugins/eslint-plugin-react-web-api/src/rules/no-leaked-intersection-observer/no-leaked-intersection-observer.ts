import { type ComponentPhaseKind, ComponentPhaseRelevance, type ObserverEntry, getPhaseKindOfFunction } from "@/types";
import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";
import { isFromObserver, isNewIntersectionObserver } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-intersection-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedDisconnectInControlFlow"
  | "expectedDisconnectOrUnobserveInCleanup"
  | "unexpectedFloatingInstance";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type CallKind = ObserverEntry["method"] | "useEffect" | "useInsertionEffect" | "useLayoutEffect" | "other";

export type OEntry = ObserverEntry & { method: "observe" };
export type UEntry = ObserverEntry & { method: "unobserve" };
export type DEntry = ObserverEntry & { method: "disconnect" };

// #endregion

// #region Helpers

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.Identifier && callee.type !== AST.MemberExpression) {
    return "other";
  }
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("observe", "unobserve", "disconnect"))(name) && isFromObserver(context, callee)) {
    return name;
  }
  return "other";
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
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
      expectedDisconnectInControlFlow:
        "Dynamically added 'IntersectionObserver.observe' should be cleared all at once using 'IntersectionObserver.disconnect' in the cleanup function.",
      expectedDisconnectOrUnobserveInCleanup: "An 'IntersectionObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      unexpectedFloatingInstance: "An 'IntersectionObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `IntersectionObserver` is not present in the file
  if (!context.sourceCode.text.includes("IntersectionObserver")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    phase: ComponentPhaseKind;
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
      const unwrappedCallee = Extract.unwrap(node.callee);
      if (unwrappedCallee.type !== AST.MemberExpression) {
        return;
      }
      const fKind = fEntries.findLast((x) => x.kind !== "other")?.kind;
      if (fKind == null || !ComponentPhaseRelevance.has(fKind)) {
        return;
      }
      const { object } = unwrappedCallee;
      match(getCallKind(context, node))
        .with("disconnect", () => {
          dEntries.push({
            kind: "IntersectionObserver",
            callee: node.callee,
            method: "disconnect",
            node,
            observer: object,
            phase: fKind,
          });
        })
        .with("observe", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          oEntries.push({
            kind: "IntersectionObserver",
            callee: node.callee,
            element,
            method: "observe",
            node,
            observer: object,
            phase: fKind,
          });
        })
        .with("unobserve", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          uEntries.push({
            kind: "IntersectionObserver",
            callee: node.callee,
            element,
            method: "unobserve",
            node,
            observer: object,
            phase: fKind,
          });
        })
        .otherwise(() => null);
    },
    ["NewExpression"](node) {
      const fEntry = fEntries.findLast((x) => x.kind !== "other");
      if (fEntry == null) return;
      if (!ComponentPhaseRelevance.has(fEntry.kind)) {
        return;
      }
      if (!isNewIntersectionObserver(node)) {
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
        phase: fEntry.kind,
        phaseNode: fEntry.node,
      });
    },
    ["Program:exit"]() {
      for (const { id, node, phaseNode } of observers) {
        // A disconnect inside the observer's own callback (the observe-once pattern) is not a reliable
        // cleanup: the callback may never run if the component unmounts before the element intersects
        const isInsideObserverCallback = (e: DEntry) => Traverse.findParent(e.node, (n) => n === node) != null;
        if (dEntries.some((e) => !isInsideObserverCallback(e) && isAssignmentTargetEqual(context, e.observer, id))) {
          continue;
        }
        const oentries = oEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const uentries = uEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
        const isDynamic = (node: TSESTree.Node | null) => node?.type === AST.CallExpression || Check.isConditional(node);
        const isPhaseNode = (node: TSESTree.Node | null) => node === phaseNode;
        const hasDynamicallyAdded = oentries
          .some((e) => !isPhaseNode(Traverse.findParent(e.node, or(isDynamic, isPhaseNode))));
        if (hasDynamicallyAdded) {
          context.report({ messageId: "expectedDisconnectInControlFlow", node });
          continue;
        }
        for (const oEntry of oentries) {
          if (uentries.some((uEntry) => isAssignmentTargetEqual(context, uEntry.element, oEntry.element))) {
            continue;
          }
          context.report({ messageId: "expectedDisconnectOrUnobserveInCleanup", node: oEntry.node });
        }
      }
    },
  };
}

// #endregion
