import type * as ast from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget, isAssignmentTargetEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import { P, isMatching } from "ts-pattern";

import { type ComponentPhaseKind, ComponentPhaseRelevance, type TimerEntry, getPhaseKindOfFunction } from "../types";
import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearIntervalInCleanup"
  | "expectedClearIntervalInUnmount"
  | "expectedIntervalId";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type EventMethodKind = "setInterval" | "clearInterval";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST.Identifier
      && isMatching(P.union("setInterval", "clearInterval"))(node.callee.name):
      return node.callee.name;
    case node.callee.type === AST.MemberExpression
      && node.callee.property.type === AST.Identifier
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
        "Enforces that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.",
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

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `setInterval` is not present in the file
  if (!context.sourceCode.text.includes("setInterval")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: ast.TSESTreeFunction }[] = [];
  const sEntries: TimerEntry[] = [];
  const cEntries: TimerEntry[] = [];
  function isInverseEntry(a: TimerEntry, b: TimerEntry) {
    return isAssignmentTargetEqual(context, a.timerId, b.timerId);
  }
  return defineRuleListener(
    {
      [":function"](node: ast.TSESTreeFunction) {
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
            if (!ComponentPhaseRelevance.has(fEntry.kind)) {
              break;
            }
            const intervalIdNode = findEnclosingAssignmentTarget(node);
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
            if (!ComponentPhaseRelevance.has(fEntry.kind)) {
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
    },
  );
}

// #endregion
