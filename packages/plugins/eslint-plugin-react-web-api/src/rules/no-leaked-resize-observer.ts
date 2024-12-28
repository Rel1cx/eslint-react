import * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import { F, not, O, or } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import { createRule, getInstanceID, getPhaseKindOfFunction, isInstanceIDEqual } from "../utils";
import type { ObserverMethod } from "./../models";
import { ObserverEntry } from "./../models";

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

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type CallKind = ObserverMethod | EREffectMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

export type OEntry = ObserverEntry & { _tag: "Observe" };
export type UEntry = ObserverEntry & { _tag: "Unobserve" };
export type DEntry = ObserverEntry & { _tag: "Disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.NewExpression
    && node.callee.type === AST_NODE_TYPES.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(node: TSESTree.Expression, context: RuleContext): boolean {
  switch (true) {
    case node.type === AST_NODE_TYPES.Identifier:
      return F.pipe(
        VAR.findVariable(node, context.sourceCode.getScope(node)),
        O.flatMap(VAR.getVariableNode(0)),
        O.exists(isNewResizeObserver),
      );
    case node.type === AST_NODE_TYPES.MemberExpression:
      return isFromObserver(node.object, context);
    default:
      return false;
  }
}

function getCallKind(node: TSESTree.CallExpression, context: RuleContext): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.name)
      && isFromObserver(node.callee, context):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.property.name)
      && isFromObserver(node.callee, context):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
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
    if (!context.sourceCode.text.includes("ResizeObserver")) return {};
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const observers: [
      node: TSESTree.NewExpression,
      id: TSESTree.Node,
      phase: ERPhaseKind,
      phaseNode: AST.TSESTreeFunction,
    ][] = [];
    const oEntries: OEntry[] = [];
    const uEntries: UEntry[] = [];
    const dEntries: DEntry[] = [];
    return {
      [":function"](node: AST.TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        fStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const [_, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
        if (!ERPhaseRelevance.has(fKind)) return;
        const { object } = node.callee;
        match(getCallKind(node, context))
          .with("disconnect", () => {
            dEntries.push(
              ObserverEntry.Disconnect({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .with("observe", () => {
            const [element] = node.arguments;
            if (!element) return;
            oEntries.push(
              ObserverEntry.Observe({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                element,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .with("unobserve", () => {
            const [element] = node.arguments;
            if (!element) return;
            uEntries.push(
              ObserverEntry.Unobserve({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                element,
                observer: object,
                phase: fKind,
              }),
            );
          })
          .otherwise(F.constVoid);
      },
      ["NewExpression"](node) {
        const [fNode, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
        if (!fNode || !ERPhaseRelevance.has(fKind)) return;
        if (!isNewResizeObserver(node)) return;
        const id = getInstanceID(node);
        if (O.isNone(id)) {
          context.report({
            messageId: "noLeakedResizeObserverNoFloatingInstance",
            node,
          });
          return;
        }
        observers.push([node, id.value, fKind, fNode]);
      },
      ["Program:exit"]() {
        for (const [node, id, _, phaseNode] of observers) {
          if (dEntries.some(e => isInstanceIDEqual(e.observer, id, context))) continue;
          const oentries = oEntries.filter(e => isInstanceIDEqual(e.observer, id, context));
          const uentries = uEntries.filter(e => isInstanceIDEqual(e.observer, id, context));
          const isDynamic = or(AST.isConditional, AST.is(AST_NODE_TYPES.CallExpression));
          const isPhaseNode = (node: TSESTree.Node) => node === phaseNode;
          const hasDynamicallyAdded = oentries
            .some(e => O.exists(AST.traverseUp(e.node, or(isDynamic, isPhaseNode)), not(isPhaseNode)));
          if (hasDynamicallyAdded) {
            context.report({ messageId: "noLeakedResizeObserverInControlFlow", node });
            continue;
          }
          for (const oEntry of oentries) {
            if (uentries.some(uEntry => isInstanceIDEqual(uEntry.element, oEntry.element, context))) continue;
            context.report({ messageId: "noLeakedResizeObserver", node: oEntry.node });
          }
        }
      },
    };
  },
  defaultOptions: [],
});

// #endregion
