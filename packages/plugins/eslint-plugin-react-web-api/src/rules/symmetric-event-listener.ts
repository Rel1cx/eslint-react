/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunction, NodeType } from "@eslint-react/ast";
import { F } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "symmetric-event-listener";

export type MessageID =
  | "symmetricEventListenerInComponentDidMount"
  | "symmetricEventListenerInUseEffect"
  | "symmetricEventListenerInUseLayoutEffect"
  | "symmetricEventListenerNoInlineFunction";

// eslint-disable-next-line perfectionist/sort-union-types
type FunctionKind = "effect" | "cleanup" | "mount" | "unmount" | "other";
// eslint-disable-next-line perfectionist/sort-union-types
type CallKind = "addEventListener" | "removeEventListener" | "other";

function getCallKind(node: TSESTree.CallExpression): CallKind {
  return match(node.callee)
    .with({
      type: NodeType.MemberExpression,
      property: {
        type: NodeType.Identifier,
        name: P.select(P.union("addEventListener", "removeEventListener")),
      },
    }, F.identity)
    .with({
      type: NodeType.Identifier,
      name: P.select(P.union("addEventListener", "removeEventListener")),
    }, F.identity)
    .otherwise(F.constant("other"));
}

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
        "A '{{callKind}}' in 'componentDidMount' should have a corresponding '{{callKind}}' in 'componentWillUnmount'.",
      symmetricEventListenerInUseEffect:
        "A '{{callKind}}' in 'useEffect' should have a corresponding '{{callKind}}' in the cleanup function.",
      symmetricEventListenerInUseLayoutEffect:
        "A '{{callKind}}' in 'useLayoutEffect' should have a corresponding '{{callKind}}' in the cleanup function.",
      symmetricEventListenerNoInlineFunction: "A '{{callKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const functionStack: [node: TSESTree.Node, kind: FunctionKind][] = [];
    const addedEventListeners = new Map<TSESTree.CallExpression, Set<TSESTree.Node>>();
    const removedEventListeners = new Map<TSESTree.CallExpression, Set<TSESTree.Node>>();

    return {
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "addEventListener":
          case "removeEventListener": {
            const [_, listener] = node.arguments;
            if (isFunction(listener)) {
              context.report({
                data: { callKind },
                messageId: "symmetricEventListenerNoInlineFunction",
                node,
              });
            }
          }
        }
      },
      ["CallExpression:exit"](node) {},
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
