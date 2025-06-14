import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { ObserverEntry, ObserverMethod } from "../types";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { or } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";

import { isMatching, match, P } from "ts-pattern";
import { createRule, getPhaseKindOfFunction } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedDisconnectInControlFlow"
  | "expectedDisconnectOrUnobserveInCleanup"
  | "unexpectedFloatingInstance";

// #endregion

// #region Types

type FunctionKind = ER.ComponentPhaseKind | "other";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type CallKind = ObserverMethod | EffectMethodKind | "other";

export type OEntry = ObserverEntry & { kind: "observe" };
export type UEntry = ObserverEntry & { kind: "unobserve" };
export type DEntry = ObserverEntry & { kind: "disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node | unit) {
  return node?.type === T.NewExpression
    && node.callee.type === T.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(context: RuleContext, node: TSESTree.Expression): boolean {
  switch (true) {
    case node.type === T.Identifier: {
      const initialScope = context.sourceCode.getScope(node);
      const object = VAR.getVariableInitNode(VAR.findVariable(node, initialScope), 0);
      return isNewResizeObserver(object);
    }
    case node.type === T.MemberExpression:
      return isFromObserver(context, node.object);
    default:
      return false;
  }
}

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(node.callee.name)
      && isFromObserver(context, node.callee):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(node.callee.property.name)
      && isFromObserver(context, node.callee):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents leaked `ResizeObserver` in a component or custom Hook.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      expectedDisconnectInControlFlow:
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      expectedDisconnectOrUnobserveInCleanup:
        "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      unexpectedFloatingInstance:
        "A 'ResizeObserver' instance created in component or custom Hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("ResizeObserver")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    phase: ER.ComponentPhaseKind;
    phaseNode: AST.TSESTreeFunction;
  }[] = [];
  const oEntries: OEntry[] = [];
  const uEntries: UEntry[] = [];
  const dEntries: DEntry[] = [];
  return {
    [":function"](node: AST.TSESTreeFunction) {
      const kind = getFunctionKind(node);
      fEntries.push({ kind, node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      if (node.callee.type !== T.MemberExpression) {
        return;
      }
      const fKind = fEntries.findLast((x) => x.kind !== "other")?.kind;
      if (fKind == null || !ER.ComponentPhaseRelevance.has(fKind)) {
        return;
      }
      const { object } = node.callee;
      match(getCallKind(context, node))
        .with("disconnect", () => {
          dEntries.push({
            kind: "disconnect",
            node,
            callee: node.callee,
            observer: object,
            observerKind: "ResizeObserver",
            phase: fKind,
          });
        })
        .with("observe", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          oEntries.push({
            kind: "observe",
            node,
            callee: node.callee,
            element,
            observer: object,
            observerKind: "ResizeObserver",
            phase: fKind,
          });
        })
        .with("unobserve", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          uEntries.push({
            kind: "unobserve",
            node,
            callee: node.callee,
            element,
            observer: object,
            observerKind: "ResizeObserver",
            phase: fKind,
          });
        })
        .otherwise(() => null);
    },
    ["NewExpression"](node) {
      const fEntry = fEntries.findLast((x) => x.kind !== "other");
      if (fEntry == null) return;
      if (!ER.ComponentPhaseRelevance.has(fEntry.kind)) {
        return;
      }
      if (!isNewResizeObserver(node)) {
        return;
      }
      const id = ER.getInstanceId(node);
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
        if (dEntries.some((e) => ER.isInstanceIdEqual(context, e.observer, id))) {
          continue;
        }
        const oentries = oEntries.filter((e) => ER.isInstanceIdEqual(context, e.observer, id));
        const uentries = uEntries.filter((e) => ER.isInstanceIdEqual(context, e.observer, id));
        const isDynamic = (node: TSESTree.Node | unit) => node?.type === T.CallExpression || AST.isConditional(node);
        const isPhaseNode = (node: TSESTree.Node | unit) => node === phaseNode;
        const hasDynamicallyAdded = oentries
          .some((e) => !isPhaseNode(AST.findParentNode(e.node, or(isDynamic, isPhaseNode))));
        if (hasDynamicallyAdded) {
          context.report({ messageId: "expectedDisconnectInControlFlow", node });
          continue;
        }
        for (const oEntry of oentries) {
          if (uentries.some((uEntry) => ER.isInstanceIdEqual(context, uEntry.element, oEntry.element))) {
            continue;
          }
          context.report({ messageId: "expectedDisconnectOrUnobserveInCleanup", node: oEntry.node });
        }
      }
    },
  };
}

// #endregion
