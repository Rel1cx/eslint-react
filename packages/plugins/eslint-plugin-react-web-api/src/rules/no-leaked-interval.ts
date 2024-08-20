import type { TSESTreeFunction } from "@eslint-react/ast";
import { isNodeEqual } from "@eslint-react/ast";
import type { ERSemanticEntry } from "@eslint-react/core";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
  PHASE_RELEVANCE,
} from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-interval";

export type MessageID =
  | "noLeakedIntervalInEffect"
  | "noLeakedIntervalInLifecycle"
  | "noLeakedIntervalNoIntervalId";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type EventMethodKind = "setInterval" | "clearInterval";
type EffectMethodKind = "useEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type EffectFunctionKind = "setup" | "cleanup";
type LifecycleFunctionKind = "mount" | "unmount";
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "other";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

interface Entry extends ERSemanticEntry {
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  intervalID: TSESTree.Node;
}

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

function getFunctionKind(node: TSESTreeFunction) {
  return match<TSESTreeFunction, FunctionKind>(node)
    .when(isSetupFunction, () => "setup")
    .when(isCleanupFunction, () => "cleanup")
    .when(isComponentDidMountFunction, () => "mount")
    .when(isComponentWillUnmountFunction, () => "unmount")
    .otherwise(() => "other");
}

function getIntervalID(node: TSESTree.Node, prev?: TSESTree.Node): O.Option<TSESTree.Node> {
  switch (true) {
    case node.type === AST_NODE_TYPES.VariableDeclarator
      && node.init === prev:
      return O.some(node.id);
    case node.type === AST_NODE_TYPES.AssignmentExpression
      && node.right === prev:
      return O.some(node.left);
    case node.type === AST_NODE_TYPES.BlockStatement
      || node.type === AST_NODE_TYPES.Program
      || node.parent === node:
      return O.none();
    default:
      return getIntervalID(node.parent, node);
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
    const fStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const sEntries: Entry[] = [];
    const rEntries: Entry[] = [];
    const isInverseEntry: {
      (a: Entry): (b: Entry) => boolean;
      (a: Entry, b: Entry): boolean;
    } = F.dual(2, (a: Entry, b: Entry) => {
      const aIntervalID = a.intervalID;
      const bIntervalID = b.intervalID;
      const aIntervalIDScope = context.sourceCode.getScope(aIntervalID);
      const bIntervalIDScope = context.sourceCode.getScope(bIntervalID);
      switch (true) {
        case aIntervalID.type === AST_NODE_TYPES.Identifier
          && bIntervalID.type === AST_NODE_TYPES.Identifier: {
          return isNodeValueEqual(aIntervalID, bIntervalID, [aIntervalIDScope, bIntervalIDScope]);
        }
        case aIntervalID.type === AST_NODE_TYPES.AssignmentExpression
          && bIntervalID.type === AST_NODE_TYPES.AssignmentExpression: {
          return isNodeEqual(aIntervalID.left, bIntervalID.left);
        }
        default:
          return isNodeValueEqual(aIntervalID, bIntervalID, [aIntervalIDScope, bIntervalIDScope]);
      }
    });
    return {
      [":function"](node: TSESTreeFunction) {
        const fKind = getFunctionKind(node);
        fStack.push([node, fKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "setInterval": {
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!fNode || !fKind) break;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const intervalIdNode = O.getOrNull(getIntervalID(node));
            if (!intervalIdNode) {
              context.report({
                messageId: "noLeakedIntervalNoIntervalId",
                node,
              });
              break;
            }
            sEntries.push({
              kind: callKind,
              node,
              callee: node.callee,
              intervalID: intervalIdNode,
              phase: fKind,
            });
            break;
          }
          case "clearInterval": {
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!fNode || !fKind) break;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const [intervalIdNode] = node.arguments;
            if (!intervalIdNode) break;
            rEntries.push({
              kind: callKind,
              node,
              callee: node.callee,
              intervalID: intervalIdNode,
              phase: fKind,
            });
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const sEntry of sEntries) {
          if (rEntries.some(isInverseEntry(sEntry))) continue;
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
