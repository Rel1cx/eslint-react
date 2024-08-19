/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { F } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
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

// TODO: Implement rule
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
      },
      ["Program:exit"]() {},
    };
  },
  defaultOptions: [],
});

// #endregion
