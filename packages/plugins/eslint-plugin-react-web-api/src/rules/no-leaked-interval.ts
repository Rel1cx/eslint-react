import type * as AST from "@eslint-react/ast";
import type { ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import type { TimerEntry } from "../models";
import { createRule, getPhaseKindOfFunction, isInstanceIdEqual } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearIntervalInCleanup"
  | "expectedClearIntervalInUnmount"
  | "expectedIntervalId";

// #endregion

// #region Types

type FunctionKind = ERPhaseKind | "other";
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
      description:
        "enforce that every 'setInterval' in a component or custom Hook has a corresponding 'clearInterval'.",
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
  create(context) {
    if (!context.sourceCode.text.includes("setInterval")) {
      return {};
    }
    const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
    const sEntries: TimerEntry[] = [];
    const cEntries: TimerEntry[] = [];
    function isInverseEntry(a: TimerEntry, b: TimerEntry) {
      return isInstanceIdEqual(a.timerId, b.timerId, context);
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
            if (!ERPhaseRelevance.has(fEntry.kind)) {
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
            if (!ERPhaseRelevance.has(fEntry.kind)) {
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
  },
  defaultOptions: [],
});

// #endregion
