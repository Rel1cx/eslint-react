import { createRule } from "@/utils/create-rule";
import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearIntervalInCleanup"
  | "expectedIntervalId";

// #endregion

// #region Types

type FunctionKind = "cleanup" | "setup" | "other";
type TimerMethodKind = "setInterval" | "clearInterval";
type CallKind = TimerMethodKind | "other";

interface TimerEntry {
  node: TSESTree.CallExpression;
  timerId: TSESTree.Node;
}

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("setInterval", "clearInterval"))(name)) {
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
      description: "Enforces that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.",
    },
    messages: {
      expectedClearIntervalInCleanup: "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the cleanup function.",
      expectedIntervalId: "A 'setInterval' must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `setInterval` is not present in the file
  if (!context.sourceCode.text.includes("setInterval")) {
    return {};
  }
  const fEntries: FunctionKind[] = [];
  const sEntries: TimerEntry[] = [];
  const cEntries: TimerEntry[] = [];
  function isInverseEntry(a: TimerEntry, b: TimerEntry) {
    return isAssignmentTargetEqual(context, a.timerId, b.timerId);
  }
  return {
    [":function"](node: TSESTreeFunction) {
      fEntries.push(getFunctionKind(node));
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      const fKind = fEntries.findLast((kind) => kind !== "other");
      if (fKind == null) {
        return;
      }
      match(getCallKind(node))
        .with("setInterval", () => {
          const intervalIdNode = resolveEnclosingAssignmentTarget(node);
          if (intervalIdNode == null) {
            context.report({
              messageId: "expectedIntervalId",
              node,
            });
            return;
          }
          sEntries.push({
            node,
            timerId: intervalIdNode,
          });
        })
        .with("clearInterval", () => {
          const [intervalIdNode] = node.arguments;
          if (intervalIdNode == null) {
            return;
          }
          cEntries.push({
            node,
            timerId: intervalIdNode,
          });
        })
        .otherwise(() => null);
    },
    ["Program:exit"]() {
      for (const sEntry of sEntries) {
        if (cEntries.some((cEntry) => isInverseEntry(sEntry, cEntry))) {
          continue;
        }
        context.report({
          data: {
            kind: "useEffect",
          },
          messageId: "expectedClearIntervalInCleanup",
          node: sEntry.node,
        });
      }
    },
  };
}

// #endregion
