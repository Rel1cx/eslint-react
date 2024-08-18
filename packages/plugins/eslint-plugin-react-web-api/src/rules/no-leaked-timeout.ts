/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunctionOfImmediatelyInvoked } from "@eslint-react/ast";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { F } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import birecord from "birecord";
import { match, P } from "ts-pattern";

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
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "immediate" | "other";
type PhaseKind = EffectFunctionKind | LifecycleFunctionKind;
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

interface AddedEntry {
  callee: TSESTree.Node;
  phase: PhaseKind;
  timeoutID: TSESTree.Node;
}

interface RemovedEntry {
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
  return match(node.callee)
    .with({
      type: AST_NODE_TYPES.MemberExpression,
      property: {
        type: AST_NODE_TYPES.Identifier,
        name: P.select(P.union("setTimeout", "clearTimeout")),
      },
    }, F.identity)
    .with({
      type: AST_NODE_TYPES.Identifier,
      name: P.select(P.union("setTimeout", "clearTimeout")),
    }, F.identity)
    .otherwise(F.constant("other"));
}

function getFunctionKind(node: TSESTreeFunction) {
  return match<TSESTreeFunction, FunctionKind>(node)
    .when(isSetupFunction, () => "setup")
    .when(isCleanupFunction, () => "cleanup")
    .when(isComponentDidMountFunction, () => "mount")
    .when(isComponentWillUnmountFunction, () => "unmount")
    .when(isFunctionOfImmediatelyInvoked, () => "immediate")
    .otherwise(() => "other");
}

// #endregion

// #region Rule Definition

// TODO: Implement rule
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "ensure that every 'setTimeout' in a component or custom hook has a corresponding 'clearTimeout'.",
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
    const functionStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    return {
      [":function"](node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        functionStack.push([node, functionKind]);
      },
      [":function:exit"](node: TSESTreeFunction) {
        functionStack.pop();
      },
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
      },
      ["Program:exit"]() {},
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;

// #endregion
