import type * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import type { TimerEntry } from "../models";
import { createRule, getPhaseKindOfFunction, isInstanceIDEqual } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-timeout";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noLeakedTimeoutInEffect"
  | "noLeakedTimeoutInLifecycle"
  | "noLeakedTimeoutNoTimeoutId";

// #endregion

// #region Types

type FunctionKind = ERPhaseKind | "other";
type EventMethodKind = "setTimeout" | "clearTimeout";
type CallKind = EventMethodKind | EREffectMethodKind | ERLifecycleMethodKind | "other";

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("setTimeout", "clearTimeout"), node.callee.name):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("setTimeout", "clearTimeout"), node.callee.property.name):
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
      description: "enforce that every 'setTimeout' in a component or custom Hook has a corresponding 'clearTimeout'.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noLeakedTimeoutInEffect:
        "A 'setTimeout' created in '{{ kind }}' must be cleared with 'clearTimeout' in the cleanup function.",
      noLeakedTimeoutInLifecycle:
        "A 'setTimeout' created in '{{ kind }}' must be cleared with 'clearTimeout' in the 'componentWillUnmount' method.",
      noLeakedTimeoutNoTimeoutId: "A 'setTimeout' must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("setTimeout")) {
      return {};
    }
    const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
    const sEntries: TimerEntry[] = [];
    const rEntries: TimerEntry[] = [];
    function isInverseEntry(a: TimerEntry, b: TimerEntry) {
      return isInstanceIDEqual(a.timerId, b.timerId, context);
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
        const fEntry = fEntries.findLast((f) => f.kind !== "other");
        if (!ERPhaseRelevance.has(fEntry?.kind)) {
          return;
        }
        switch (getCallKind(node)) {
          case "setTimeout": {
            const timeoutIdNode = VAR.getVariableDeclaratorId(node);
            if (timeoutIdNode == null) {
              context.report({
                messageId: "noLeakedTimeoutNoTimeoutId",
                node,
              });
              break;
            }
            sEntries.push({
              kind: "timeout",
              node,
              callee: node.callee,
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
              node,
              callee: node.callee,
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
                messageId: "noLeakedTimeoutInEffect",
                node: sEntry.node,
                data: {
                  kind: "useEffect",
                },
              });
              continue;
            case "mount":
            case "unmount":
              context.report({
                messageId: "noLeakedTimeoutInLifecycle",
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
