import type * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import { O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
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

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type EventMethodKind = "setTimeout" | "clearTimeout";
type CallKind = EventMethodKind | EREffectMethodKind | ERLifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("setTimeout", "clearTimeout"), node.callee.name):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
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
    if (!context.sourceCode.text.includes("setTimeout")) return {};
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const sEntries: TimerEntry[] = [];
    const rEntries: TimerEntry[] = [];
    function isInverseEntry(a: TimerEntry, b: TimerEntry) {
      return isInstanceIDEqual(a.timerID, b.timerID, context);
    }
    return {
      [":function"](node: AST.TSESTreeFunction) {
        const fKind = O.getOrElse(getPhaseKindOfFunction(node), () => "other" as const);
        fStack.push([node, fKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const [fNode, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
        if (!fNode || !fKind) return;
        if (!ERPhaseRelevance.has(fKind)) return;
        switch (getCallKind(node)) {
          case "setTimeout": {
            const timeoutIdNode = O.getOrNull(VAR.getVariableDeclaratorID(node));
            if (!timeoutIdNode) {
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
              phase: fKind,
              timerID: timeoutIdNode,
            });
            break;
          }
          case "clearTimeout": {
            const [timeoutIdNode] = node.arguments;
            if (!timeoutIdNode) break;
            rEntries.push({
              kind: "timeout",
              node,
              callee: node.callee,
              phase: fKind,
              timerID: timeoutIdNode,
            });
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const sEntry of sEntries) {
          if (rEntries.some(rEntry => isInverseEntry(sEntry, rEntry))) continue;
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
