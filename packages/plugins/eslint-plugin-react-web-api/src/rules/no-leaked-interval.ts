import type * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { TimerEntry } from "../types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";

import { isMatching, P } from "ts-pattern";
import { createRule, getPhaseKindOfFunction } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearIntervalInCleanup"
  | "expectedClearIntervalInUnmount"
  | "expectedIntervalId";

// #endregion

// #region Types

type FunctionKind = ER.ComponentPhaseKind | "other";
type EventMethodKind = "setInterval" | "clearInterval";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("setInterval", "clearInterval"))(node.callee.name):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("setInterval", "clearInterval"))(node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents leaked `setInterval` in a component or custom Hook.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      expectedClearIntervalInCleanup:
        "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the cleanup function.",
      expectedClearIntervalInUnmount:
        "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the 'componentWillUnmount' method.",
      expectedIntervalId: "A 'setInterval' must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("setInterval")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
  const sEntries: TimerEntry[] = [];
  const cEntries: TimerEntry[] = [];
  function isInverseEntry(a: TimerEntry, b: TimerEntry) {
    return ER.isInstanceIdEqual(context, a.timerId, b.timerId);
  }
  return {
    [":function"](node: AST.TSESTreeFunction) {
      const kind = getPhaseKindOfFunction(node) ?? "other";
      fEntries.push({ kind, node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      switch (getCallKind(node)) {
        case "setInterval": {
          const fEntry = fEntries.findLast((x) => x.kind !== "other");
          if (fEntry == null) {
            break;
          }
          if (!ER.ComponentPhaseRelevance.has(fEntry.kind)) {
            break;
          }
          const intervalIdNode = VAR.getVariableDeclaratorId(node);
          if (intervalIdNode == null) {
            context.report({
              messageId: "expectedIntervalId",
              node,
            });
            break;
          }
          sEntries.push({
            kind: "interval",
            node,
            callee: node.callee,
            phase: fEntry.kind,
            timerId: intervalIdNode,
          });
          break;
        }
        case "clearInterval": {
          const fEntry = fEntries.findLast((x) => x.kind !== "other");
          if (fEntry == null) {
            break;
          }
          if (!ER.ComponentPhaseRelevance.has(fEntry.kind)) {
            break;
          }
          const [intervalIdNode] = node.arguments;
          if (intervalIdNode == null) {
            break;
          }
          cEntries.push({
            kind: "interval",
            node,
            callee: node.callee,
            phase: fEntry.kind,
            timerId: intervalIdNode,
          });
          break;
        }
      }
    },
    ["Program:exit"]() {
      for (const sEntry of sEntries) {
        if (cEntries.some((cEntry) => isInverseEntry(sEntry, cEntry))) {
          continue;
        }
        switch (sEntry.phase) {
          case "setup":
          case "cleanup":
            context.report({
              messageId: "expectedClearIntervalInCleanup",
              node: sEntry.node,
              data: {
                kind: "useEffect",
              },
            });
            continue;
          case "mount":
          case "unmount":
            context.report({
              messageId: "expectedClearIntervalInUnmount",
              node: sEntry.node,
              data: {
                kind: "componentDidMount",
              },
            });
            continue;
        }
      }
    },
  };
}

// #endregion
