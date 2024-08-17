/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { is, isFunction, isFunctionOfImmediatelyInvoked, isNodeEqual, traverseUpGuard } from "@eslint-react/ast";
import { findPropInProperties } from "@eslint-react/jsx";
import { F, isBoolean, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue, getStringIfConstant } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
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
type EffectFunctionKind = "setup" | "cleanup";
type LifecycleFunctionKind = "mount" | "unmount";
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "immediate" | "other";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

function isSetupFunction(node: TSESTree.Node) {
  return node.parent?.type === AST_NODE_TYPES.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === AST_NODE_TYPES.Identifier
    // && node.parent.callee.name === "useEffect"
    && /^(use(?:\w+)?Effect)$/u.test(node.parent.callee.name)
    && node.parent.arguments.at(0) === node;
}

function isCleanupFunction(node: TSESTree.Node) {
  const nearestRet = O.getOrNull(traverseUpGuard(node, is(AST_NODE_TYPES.ReturnStatement)));
  if (!nearestRet) return false;
  const nearestFunction = O.getOrNull(traverseUpGuard(node, isFunction));
  const nearestFunctionOfRet = O.getOrNull(traverseUpGuard(nearestRet, isFunction));
  if (!nearestFunction || !nearestFunctionOfRet) return false;
  return nearestFunction === nearestFunctionOfRet && isSetupFunction(nearestFunction);
}

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

function getFunctionKind(node: TSESTreeFunction) {
  return match<TSESTreeFunction, FunctionKind>(node)
    .when(isSetupFunction, () => "setup")
    .when(isCleanupFunction, () => "cleanup")
    .when(isFunctionOfImmediatelyInvoked, () => "immediate")
    .otherwise(() => "other");
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
        "A '{{eventMethodKind}}' in '{{lifecycleMethodKind}}' should have a corresponding '{{eventMethodKind}}' in '{{lifecycleMethodKind}}'.",
      symmetricEventListenerNoInlineFunction: "A '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const defaultOptions = { capture: O.none(), once: O.none(), signal: O.none() };
    const callStack: [node: TSESTree.CallExpression, kind: CallKind][] = [];
    const functionStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    /* eslint-disable perfectionist/sort-object-types */
    const addedEventListeners: {
      listener: TSESTree.Node;
      object: TSESTree.Node;
      type: TSESTree.Node;
      capture: O.Option<boolean>;
      signal: O.Option<unknown>;
    }[] = [];
    const removedEventListeners: {
      listener: TSESTree.Node;
      object: TSESTree.Node;
      type: TSESTree.Node;
      capture: O.Option<boolean>;
    }[] = [];
    /* eslint-enable perfectionist/sort-object-types */
    function getOptions(node?: TSESTree.CallExpressionArgument) {
      if (!node) return defaultOptions;
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
          const pSignal = findProp(node.properties, "signal");
          const vSignal = O.flatMap(pSignal, getPropValue);
          return { capture: vCapture, once: vOnce, signal: vSignal };
        }
        default: {
          return defaultOptions;
        }
      }
    }
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
    ): O.Option<ReportDescriptor<MessageID>> {
      const [_, listener] = node.arguments;
      if (!isFunction(listener)) return O.none();
      return O.some(
        {
          messageId: "symmetricEventListenerNoInlineFunction",
          node,
          data: { eventMethodKind: callKind },
        } as const,
      );
    }
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
        callStack.push([node, callKind]);
        switch (callKind) {
          case "addEventListener": {
            O.map(checkInlineFunction(node, callKind), context.report);
            const [_, listener, options] = node.arguments;
            const [functionNode, functionKind] = functionStack.at(-1) ?? [];
            if (!functionNode || !listener || !functionKind) return;
            if (functionKind === "setup") {
              const [object, type] = node.arguments;
              if (!object || !type) return;
              const opts = getOptions(options);
              addedEventListeners.push({ ...opts, type, listener, object });
            }
            break;
          }
          case "removeEventListener": {
            O.map(checkInlineFunction(node, callKind), context.report);
            const [_, listener, options] = node.arguments;
            const [functionNode, functionKind] = functionStack.at(-1) ?? [];
            if (!functionNode || !listener || !functionKind) return;
            if (functionKind === "cleanup") {
              const [object, type] = node.arguments;
              if (!object || !type) return;
              const opts = getOptions(options);
              removedEventListeners.push({ ...opts, type, listener, object });
            }
            break;
          }
        }
      },
      ["CallExpression:exit"](node) {
        callStack.pop();
      },
      ["Program:exit"]() {
        for (const { type, capture, listener, object, signal } of addedEventListeners) {
          if (
            removedEventListeners.some(
              ({ type: rType, capture: rCapture, listener: rListener, object: rObject }) =>
                isNodeEqual(listener, rListener)
                && isNodeEqual(object, rObject)
                && isNodeValueEqual(type, rType, [
                  context.sourceCode.getScope(type),
                  context.sourceCode.getScope(rType),
                ]),
              // && isNodeValueEqual(capture, rCapture),
            )
          ) {
            continue;
          }
          context.report({
            messageId: "symmetricEventListenerInEffect",
            node: listener,
            data: {
              effectMethodKind: "useEffect",
              eventMethodKind: "addEventListener",
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
