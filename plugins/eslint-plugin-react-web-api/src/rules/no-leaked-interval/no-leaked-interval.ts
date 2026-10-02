import { createRule } from "@/utils/create-rule";
import { Extract, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expected-clear-interval-in-cleanup"
  | "expected-interval-id";

// #endregion

// #region Types

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

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.",
    },
    messages: {
      "expected-clear-interval-in-cleanup": "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the cleanup function.",
      "expected-interval-id": "A 'setInterval' must be assigned to a variable for proper cleanup.",
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
  const sEntries: TimerEntry[] = [];
  const cEntries: TimerEntry[] = [];
  function isInverseEntry(a: TimerEntry, b: TimerEntry) {
    return isAssignmentTargetEqual(context, a.timerId, b.timerId);
  }
  return {
    ["CallExpression"](node) {
      const fn = Traverse.findParent(node, (n) => isUseEffectSetupCallback(n) || isUseEffectCleanupCallback(n));
      if (fn == null) {
        return;
      }
      match(getCallKind(node))
        .with("setInterval", () => {
          const intervalIdNode = resolveEnclosingAssignmentTarget(node);
          if (intervalIdNode == null) {
            context.report({
              messageId: "expected-interval-id",
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
          messageId: "expected-clear-interval-in-cleanup",
          node: sEntry.node,
        });
      }
    },
  };
}

// #endregion
