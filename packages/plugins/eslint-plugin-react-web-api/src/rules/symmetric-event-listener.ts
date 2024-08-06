/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "symmetric-event-listener";

export type MessageID =
  | "symmetricEventListenerInComponentDidMount"
  | "symmetricEventListenerInUseEffect"
  | "symmetricEventListenerInUseLayoutEffect"
  | "symmetricEventListenerNoInlineFunction";

// eslint-disable-next-line perfectionist/sort-union-types
type FunctionKind = "effect" | "cleanup" | "mount" | "unmount" | "other";

// TODO: Implement the rule
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "ensure that every 'addEventListener' in a React component or custom hook has a corresponding 'removeEventListener'",
    },
    messages: {
      symmetricEventListenerInComponentDidMount:
        "A 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount'.",
      symmetricEventListenerInUseEffect:
        "A 'addEventListener' in 'useEffect' should have a corresponding 'removeEventListener' in the cleanup function.",
      symmetricEventListenerInUseLayoutEffect:
        "A 'addEventListener' in 'useLayoutEffect' should have a corresponding 'removeEventListener' in the cleanup function.",
      symmetricEventListenerNoInlineFunction: "A 'addEventListener' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const functionStack: [node: TSESTree.Node, kind: FunctionKind][] = [];
    const addedEventListeners = new Map<TSESTree.CallExpression, Set<TSESTree.Node>>();
    const removedEventListeners = new Map<TSESTree.CallExpression, Set<TSESTree.Node>>();

    return {
      ["CallExpression"](node) {},
      ["CallExpression:exit"](node) {},
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
