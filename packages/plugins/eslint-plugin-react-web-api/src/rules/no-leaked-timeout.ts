/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { isNodeEqual, toReadableNodeName, traverseUp, traverseUpGuard } from "@eslint-react/ast";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { findVariable, getVariableNode, isNodeValueEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import birecord from "birecord";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-timeout";

export type MessageID =
  | "noLeakedTimeoutInEffect"
  | "noLeakedTimeoutInLifecycle"
  | "noLeakedTimeoutNoTimeoutId";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type EventMethodKind = "setTimeout" | "clearTimeout";
type EffectMethodKind = "useEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type EffectFunctionKind = "setup" | "cleanup";
type LifecycleFunctionKind = "mount" | "unmount";
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "other";
type PhaseKind = EffectFunctionKind | LifecycleFunctionKind;
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

interface sEntry {
  self: TSESTree.Node;
  callee: TSESTree.Node;
  phase: PhaseKind;
  timeoutID: TSESTree.Node;
}

interface rEntry {
  self: TSESTree.Node;
  callee: TSESTree.Node;
  phase: PhaseKind;
  timeoutID: TSESTree.Node;
}

// #endregion

// #region Helpers

const functionKindPairs = birecord({
  mount: "unmount",
  setup: "cleanup",
});

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

function getFunctionKind(node: TSESTreeFunction) {
  return match<TSESTreeFunction, FunctionKind>(node)
    .when(isSetupFunction, () => "setup")
    .when(isCleanupFunction, () => "cleanup")
    .when(isComponentDidMountFunction, () => "mount")
    .when(isComponentWillUnmountFunction, () => "unmount")
    .otherwise(() => "other");
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that every 'setTimeout' in a component or custom hook has a corresponding 'clearTimeout'.",
    },
    messages: {
      noLeakedTimeoutInEffect: "'setTimeout' must be paired with 'clearTimeout' in {{kind}}",
      noLeakedTimeoutInLifecycle: "'setTimeout' must be paired with 'clearTimeout' in {{kind}}",
      noLeakedTimeoutNoTimeoutId: "'setTimeout' must have a timeout ID assigned to a variable",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const fStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const sEntries: sEntry[] = [];
    const rEntries: rEntry[] = [];
    const isPairedEntry: {
      (a: sEntry): (b: rEntry) => boolean;
      (a: sEntry, b: rEntry): boolean;
    } = F.dual(2, (a: sEntry, b: rEntry) => {
      const aTimeoutID = a.timeoutID;
      const bTimeoutID = b.timeoutID;
      const aTimeoutIDScope = context.sourceCode.getScope(aTimeoutID);
      const bTimeoutIDScope = context.sourceCode.getScope(bTimeoutID);
      switch (true) {
        case aTimeoutID.type === AST_NODE_TYPES.Identifier
          && bTimeoutID.type === AST_NODE_TYPES.Identifier: {
          return isNodeValueEqual(aTimeoutID, bTimeoutID, [aTimeoutIDScope, bTimeoutIDScope]);
        }
        case aTimeoutID.type === AST_NODE_TYPES.AssignmentExpression
          && bTimeoutID.type === AST_NODE_TYPES.AssignmentExpression: {
          return isNodeEqual(aTimeoutID.left, bTimeoutID.left);
        }
        default:
          return isNodeEqual(aTimeoutID, bTimeoutID)
            || isNodeValueEqual(aTimeoutID, bTimeoutID, [aTimeoutIDScope, bTimeoutIDScope]);
      }
    });
    return {
      [":function"](node: TSESTreeFunction) {
        const fKind = getFunctionKind(node);
        fStack.push([node, fKind]);
      },
      [":function:exit"](node: TSESTreeFunction) {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "setTimeout": {
            const [fNode, fKind] = fStack.at(-1) ?? [];
            const timeoutIdNode = F.pipe(
              traverseUp(node, (n) => {
                switch (true) {
                  case n.type === AST_NODE_TYPES.VariableDeclarator
                    && n.init === node:
                    return true;
                  case n.type === AST_NODE_TYPES.AssignmentExpression
                    && n.right === node:
                    return true;
                  default:
                    return false;
                }
              }),
              O.flatMapNullable((n) => {
                switch (n.type) {
                  case AST_NODE_TYPES.VariableDeclarator:
                    return n.id;
                  case AST_NODE_TYPES.AssignmentExpression:
                    return n.left;
                  default:
                    return null;
                }
              }),
              O.getOrNull,
            );
            if (!fNode || !fKind) break;
            if (!functionKindPairs.has(fKind)) break;
            if (!timeoutIdNode) {
              context.report({
                messageId: "noLeakedTimeoutNoTimeoutId",
                node,
              });
              break;
            }
            sEntries.push({
              self: node,
              callee: node.callee,
              phase: fKind,
              timeoutID: timeoutIdNode,
            });
            break;
          }
          case "clearTimeout": {
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!fNode || !fKind) break;
            if (!functionKindPairs.has(fKind)) break;
            const [timeoutIdNode] = node.arguments;
            if (!timeoutIdNode) break;
            rEntries.push({
              self: node,
              callee: node.callee,
              phase: fKind,
              timeoutID: timeoutIdNode,
            });
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const sEntry of sEntries) {
          if (rEntries.some(isPairedEntry(sEntry))) continue;
          switch (sEntry.phase) {
            case "setup":
            case "cleanup":
              context.report({
                messageId: "noLeakedTimeoutInEffect",
                node: sEntry.self,
                data: {
                  kind: "useEffect",
                },
              });
              continue;
            case "mount":
            case "unmount":
              context.report({
                messageId: "noLeakedTimeoutInLifecycle",
                node: sEntry.self,
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
