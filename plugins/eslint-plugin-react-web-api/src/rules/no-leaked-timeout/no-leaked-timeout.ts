import { type ComponentPhaseKind, ComponentPhaseRelevance, type TimerEntry, getPhaseKindOfFunction } from "@/types";
import { createRule } from "@/utils/create-rule";
import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { type TSESTree } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-timeout";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedClearTimeoutInCleanup"
  | "expectedTimeoutId";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type EventMethodKind = "setTimeout" | "clearTimeout";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type CallKind = EventMethodKind | EffectMethodKind | "other";

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("setTimeout", "clearTimeout"))(name)) {
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
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const sEntries: TimerEntry[] = [];
  const rEntries: TimerEntry[] = [];
  function isInverseEntry(a: TimerEntry, b: TimerEntry) {
    return isAssignmentTargetEqual(context, a.timerId, b.timerId);
  }
  return {
    [":function"](node: TSESTreeFunction) {
      const kind = getPhaseKindOfFunction(node) ?? "other";
      fEntries.push({ kind, node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      const fEntry = fEntries.findLast((f) => f.kind !== "other");
      if (!ComponentPhaseRelevance.has(fEntry?.kind)) {
        return;
      }
      switch (getCallKind(node)) {
        case "setTimeout": {
          const timeoutIdNode = resolveEnclosingAssignmentTarget(node);
          if (timeoutIdNode == null) {
            context.report({
              messageId: "expectedTimeoutId",
              node,
            });
            break;
          }
          sEntries.push({
            kind: "timeout",
            callee: node.callee,
            node,
            phase: fEntry.kind,
            timerId: timeoutIdNode,
          });
          break;
        }
        case "clearTimeout": {
          const [timeoutIdNode] = node.arguments;
          if (timeoutIdNode == null) {
            break;
          }
          rEntries.push({
            kind: "timeout",
            callee: node.callee,
            node,
            phase: fEntry.kind,
            timerId: timeoutIdNode,
          });
          break;
        }
      }
    },
    ["Program:exit"]() {
      for (const sEntry of sEntries) {
        if (rEntries.some((rEntry) => isInverseEntry(sEntry, rEntry))) {
          continue;
        }
        switch (sEntry.phase) {
          case "setup":
          case "cleanup":
            context.report({
              data: {
                kind: "useEffect",
              },
              messageId: "expectedClearTimeoutInCleanup",
              node: sEntry.node,
            });
            continue;
        }
      }
    },
  };
}

// #endregion
