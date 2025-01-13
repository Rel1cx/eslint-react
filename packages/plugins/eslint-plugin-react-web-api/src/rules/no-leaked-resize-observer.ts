import * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import { _, or } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import { createRule, getInstanceID, getPhaseKindOfFunction, isInstanceIDEqual } from "../utils";
import type { ObserverEntry, ObserverMethod } from "./../models";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noLeakedResizeObserver"
  | "noLeakedResizeObserverInControlFlow"
  | "noLeakedResizeObserverNoFloatingInstance";

// #endregion

// #region Types

type FunctionKind = ERPhaseKind | "other";
type CallKind = ObserverMethod | EREffectMethodKind | "other";

export type OEntry = ObserverEntry & { kind: "observe" };
export type UEntry = ObserverEntry & { kind: "unobserve" };
export type DEntry = ObserverEntry & { kind: "disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node | _) {
  return node?.type === T.NewExpression
    && node.callee.type === T.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(node: TSESTree.Expression, context: RuleContext): boolean {
  switch (true) {
    case node.type === T.Identifier: {
      const initialScope = context.sourceCode.getScope(node);
      const object = VAR.getVariableNode(VAR.findVariable(node, initialScope), 0);
      return isNewResizeObserver(object);
    }
    case node.type === T.MemberExpression:
      return isFromObserver(node.object, context);
    default:
      return false;
  }
}

function getCallKind(node: TSESTree.CallExpression, context: RuleContext): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.name)
      && isFromObserver(node.callee, context):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.property.name)
      && isFromObserver(node.callee, context):
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
      description: "enforce cleanup of 'ResizeObserver' instances in components and custom Hooks.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noLeakedResizeObserver:
        "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      noLeakedResizeObserverInControlFlow:
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      noLeakedResizeObserverNoFloatingInstance:
        "A 'ResizeObserver' instance created in component or custom Hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("ResizeObserver")) {
      return {};
    }
    const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
    const observers: {
      id: TSESTree.Node;
      node: TSESTree.NewExpression;
      phase: ERPhaseKind;
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
        if (fKind == null || !ERPhaseRelevance.has(fKind)) {
          return;
        }
        const { object } = node.callee;
        match(getCallKind(node, context))
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
          .otherwise(() => _);
      },
      ["NewExpression"](node) {
        const fEntry = fEntries.findLast((x) => x.kind !== "other");
        if (fEntry == null) return;
        if (!ERPhaseRelevance.has(fEntry.kind)) {
          return;
        }
        if (!isNewResizeObserver(node)) {
          return;
        }
        const id = getInstanceID(node);
        if (id == null) {
          context.report({
            messageId: "noLeakedResizeObserverNoFloatingInstance",
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
          if (dEntries.some((e) => isInstanceIDEqual(e.observer, id, context))) {
            continue;
          }
          const oentries = oEntries.filter((e) => isInstanceIDEqual(e.observer, id, context));
          const uentries = uEntries.filter((e) => isInstanceIDEqual(e.observer, id, context));
          const isDynamic = (node: TSESTree.Node | _) => node?.type === T.CallExpression || AST.isConditional(node);
          const isPhaseNode = (node: TSESTree.Node | _) => node === phaseNode;
          const hasDynamicallyAdded = oentries
            .some((e) => !isPhaseNode(AST.findParentNode(e.node, or(isDynamic, isPhaseNode))));
          if (hasDynamicallyAdded) {
            context.report({ messageId: "noLeakedResizeObserverInControlFlow", node });
            continue;
          }
          for (const oEntry of oentries) {
            if (uentries.some((uEntry) => isInstanceIDEqual(uEntry.element, oEntry.element, context))) {
              continue;
            }
            context.report({ messageId: "noLeakedResizeObserver", node: oEntry.node });
          }
        }
      },
    };
  },
  defaultOptions: [],
});

// #endregion
