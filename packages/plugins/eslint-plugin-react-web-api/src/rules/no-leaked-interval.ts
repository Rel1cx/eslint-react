import type * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance } from "@eslint-react/core";
import { O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import type { TimerEntry } from "../models";
import { createRule, getPhaseKindOfFunction, isInstanceIDEqual } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noLeakedIntervalInEffect"
  | "noLeakedIntervalInLifecycle"
  | "noLeakedIntervalNoIntervalId";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type EventMethodKind = "setInterval" | "clearInterval";
type CallKind = EventMethodKind | EREffectMethodKind | ERLifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("setInterval", "clearInterval"), node.callee.name):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("setInterval", "clearInterval"), node.callee.property.name):
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
      noLeakedIntervalInEffect:
        "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the cleanup function.",
      noLeakedIntervalInLifecycle:
        "A 'setInterval' created in '{{ kind }}' must be cleared with 'clearInterval' in the 'componentWillUnmount' method.",
      noLeakedIntervalNoIntervalId: "A 'setInterval' must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("setInterval")) {
      return {};
    }
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const sEntries: TimerEntry[] = [];
    const cEntries: TimerEntry[] = [];
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
        switch (getCallKind(node)) {
          case "setInterval": {
            const [fNode, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
            if (fNode == null || fKind == null) {
              break;
            }
            if (!ERPhaseRelevance.has(fKind)) {
              break;
            }
            const intervalIdNode = O.getOrNull(VAR.getVariableDeclaratorID(node));
            if (intervalIdNode == null) {
              context.report({
                messageId: "noLeakedIntervalNoIntervalId",
                node,
              });
              break;
            }
            sEntries.push({
              kind: "interval",
              node,
              callee: node.callee,
              phase: fKind,
              timerID: intervalIdNode,
            });
            break;
          }
          case "clearInterval": {
            const [fNode, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
            if (fNode == null || fKind == null) {
              break;
            }
            if (!ERPhaseRelevance.has(fKind)) {
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
              phase: fKind,
              timerID: intervalIdNode,
            });
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const sEntry of sEntries) {
          if (cEntries.some(cEntry => isInverseEntry(sEntry, cEntry))) {
            continue;
          }
          switch (sEntry.phase) {
            case "setup":
            case "cleanup":
              context.report({
                messageId: "noLeakedIntervalInEffect",
                node: sEntry.node,
                data: {
                  kind: "useEffect",
                },
              });
              continue;
            case "mount":
            case "unmount":
              context.report({
                messageId: "noLeakedIntervalInLifecycle",
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
