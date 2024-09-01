import type { TSESTreeFunction } from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, PHASE_RELEVANCE } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { getVariableDeclaratorID } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import type { TimerEntry } from "../models";
import { createRule, isTimerIDEqual } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

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
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("setInterval", "clearInterval"), node.callee.name):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("setInterval", "clearInterval"), node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce that every 'setInterval' in a component or custom hook has a corresponding 'clearInterval'.",
    },
    messages: {
      noLeakedIntervalInEffect: "'setInterval' must be paired with 'clearInterval' in {{kind}}",
      noLeakedIntervalInLifecycle: "'setInterval' must be paired with 'clearInterval' in {{kind}}",
      noLeakedIntervalNoIntervalId: "'setInterval' must have a interval ID assigned to a variable",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("setInterval")) return {};
    const fStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const sEntries: TimerEntry[] = [];
    const cEntries: TimerEntry[] = [];
    const isInverseEntry: {
      (a: TimerEntry): (b: TimerEntry) => boolean;
      (a: TimerEntry, b: TimerEntry): boolean;
    } = F.dual(2, (a: TimerEntry, b: TimerEntry) => {
      return isTimerIDEqual(a.timerID, b.timerID, context);
    });
    return {
      [":function"](node: TSESTreeFunction) {
        const fKind = O.getOrElse(getPhaseKindOfFunction(node), () => "other" as const);
        fStack.push([node, fKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        switch (getCallKind(node)) {
          case "setInterval": {
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!fNode || !fKind) break;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const intervalIdNode = O.getOrNull(getVariableDeclaratorID(node));
            if (!intervalIdNode) {
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
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!fNode || !fKind) break;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const [intervalIdNode] = node.arguments;
            if (!intervalIdNode) break;
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
          if (cEntries.some(isInverseEntry(sEntry))) continue;
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
