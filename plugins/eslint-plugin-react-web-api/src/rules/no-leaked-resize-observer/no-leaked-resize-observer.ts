import { Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";

import {
  type ComponentPhaseKind,
  ComponentPhaseRelevance,
  type ObserverEntry,
  getPhaseKindOfFunction,
} from "../../types";
import { createRule } from "../../utils";
import { isConditional, isFromObserver, isNewResizeObserver } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

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
  switch (true) {
    case callee.type === AST.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(callee.name)
      && isFromObserver(context, callee):
      return callee.name;
    case callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(callee.property.name)
      && isFromObserver(context, callee):
      return callee.property.name;
    default:
      return "other";
  }
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
      description:
        "Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.",
    },
    messages: {
      expectedDisconnectInControlFlow:
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      expectedDisconnectOrUnobserveInCleanup:
        "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      unexpectedFloatingInstance:
        "A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `ResizeObserver` is not present in the file
  if (!context.sourceCode.text.includes("ResizeObserver")) {
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
  return merge(
    {
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
              kind: "ResizeObserver",
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
              kind: "ResizeObserver",
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
              kind: "ResizeObserver",
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
        if (!isNewResizeObserver(node)) {
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
          if (dEntries.some((e) => isAssignmentTargetEqual(context, e.observer, id))) {
            continue;
          }
          const oentries = oEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
          const uentries = uEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
          const isDynamic = (node: TSESTree.Node | null) => node?.type === AST.CallExpression || isConditional(node);
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
    },
  );
}

// #endregion
