/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunction, NodeType } from "@eslint-react/ast";
import { F } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "symmetric-event-listener";

export type MessageID =
  | "symmetricEventListenerInEffect"
  | "symmetricEventListenerInLifecycle"
  | "symmetricEventListenerNoInlineFunction";

/* eslint-disable perfectionist/sort-union-types */
type EventMethodKind = "addEventListener" | "removeEventListener";
type EffectMethodKind = "useEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type EffectFunctionKind = "effect" | "cleanup";
type LifecycleFunctionKind = "mount" | "unmount";
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "other";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

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
      symmetricEventListenerInEffect:
        "A '{{eventMethodKind}}' in '{{effectMethodKind}}' should have a corresponding '{{eventMethodKind}}' in the cleanup function.",
      symmetricEventListenerInLifecycle:
        "A '{{eventMethodKind}}' in 'lifecycleMethodKind' should have a corresponding '{{eventMethodKind}}' in 'lifecycleMethodKind'.",
      symmetricEventListenerNoInlineFunction: "A '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const functionStack: [node: TSESTree.Node, kind: FunctionKind][] = [];
    /* eslint-disable perfectionist/sort-object-types */
    const addedEventListeners: Map<
      TSESTree.Node,
      {
        object: TSESTree.Node | null;
        type: string;
        once: boolean;
        capture: boolean | null;
        signal: TSESTree.Node | null;
      }
    > = new Map();
    const removedEventListeners: Map<
      TSESTree.Node,
      {
        object: TSESTree.Node | null;
        type: string;
        capture: boolean | null;
      }
    > = new Map();
    /* eslint-enable perfectionist/sort-object-types */
    return {
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "addEventListener":
          case "removeEventListener": {
            const [_, listener] = node.arguments;
            if (isFunction(listener)) {
              context.report({
                data: { eventMethodKind: callKind },
                messageId: "symmetricEventListenerNoInlineFunction",
                node,
              });
            }
            break;
          }
        }
      },
      ["CallExpression:exit"](node) {},
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
