/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunction } from "@eslint-react/ast";
import { findPropInProperties } from "@eslint-react/jsx";
import { F, isBoolean, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
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
      type: AST_NODE_TYPES.MemberExpression,
      property: {
        type: AST_NODE_TYPES.Identifier,
        name: P.select(P.union("addEventListener", "removeEventListener")),
      },
    }, F.identity)
    .with({
      type: AST_NODE_TYPES.Identifier,
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
    function getOptions(node: TSESTree.CallExpressionArgument) {
      const initialScope = context.sourceCode.getScope(node);
      const findProp = (properties: TSESTree.ObjectExpression["properties"], propName: string) => {
        return findPropInProperties(properties, initialScope)(propName);
      };
      const getPropValue = (prop: TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement) => {
        if (prop.type !== AST_NODE_TYPES.Property) return O.none();
        const { value } = prop;
        return match(value)
          .with({ type: AST_NODE_TYPES.Literal }, v => O.some(v.value))
          .with({ type: AST_NODE_TYPES.Identifier }, v => O.some(getStaticValue(v, initialScope)?.value))
          .otherwise(O.none);
      };
      switch (node.type) {
        case AST_NODE_TYPES.ObjectExpression: {
          const pOnce = findProp(node.properties, "once");
          const pCapture = findProp(node.properties, "capture");
          const vOnce = O.flatMap(pOnce, getPropValue).pipe(O.filter(isBoolean));
          const vCapture = O.flatMap(pCapture, getPropValue).pipe(O.filter(isBoolean));
          return { capture: vCapture, once: vOnce };
        }
        case AST_NODE_TYPES.Identifier: {
          return {};
        }
        default: {
          return {};
        }
      }
    }
    return {
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "addEventListener":
          case "removeEventListener": {
            const [_, listener, opts] = node.arguments;
            const options = opts ? getOptions(opts) : {};
            if (isFunction(listener) && !options) {
              context.report({
                messageId: "symmetricEventListenerNoInlineFunction",
                node,
                data: { eventMethodKind: callKind },
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
