import { createRule } from "@/utils/create-rule";
import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-timeout";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearTimeoutInCleanup"
  | "expectedTimeoutId";

// #endregion

// #region Types

type FunctionKind = "cleanup" | "setup" | "other";
type TimerMethodKind = "setTimeout" | "clearTimeout";
type CallKind = TimerMethodKind | "other";

interface TimerEntry {
  node: TSESTree.CallExpression;
  timerId: TSESTree.Node;
}

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("setTimeout", "clearTimeout"))(name)) {
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
      description: "Enforces that every 'setTimeout' in a component or custom hook has a corresponding 'clearTimeout'.",
    },
    messages: {
      expectedClearTimeoutInCleanup: "A 'setTimeout' created in '{{ kind }}' must be cleared with 'clearTimeout' in the cleanup function.",
      expectedTimeoutId: "A 'setTimeout' must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `setTimeout` is not present in the file
  if (!context.sourceCode.text.includes("setTimeout")) {
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
        .with("setTimeout", () => {
          const timeoutIdNode = resolveEnclosingAssignmentTarget(node);
          if (timeoutIdNode == null) {
            context.report({
              messageId: "expectedTimeoutId",
              node,
            });
            return;
          }
          sEntries.push({
            node,
            timerId: timeoutIdNode,
          });
        })
        .with("clearTimeout", () => {
          const [timeoutIdNode] = node.arguments;
          if (timeoutIdNode == null) {
            return;
          }
          cEntries.push({
            node,
            timerId: timeoutIdNode,
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
          messageId: "expectedClearTimeoutInCleanup",
          node: sEntry.node,
        });
      }
    },
  };
}

// #endregion
