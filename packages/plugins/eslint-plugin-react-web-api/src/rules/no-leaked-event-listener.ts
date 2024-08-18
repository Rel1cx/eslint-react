import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunction, isFunctionOfImmediatelyInvoked, isNodeEqual } from "@eslint-react/ast";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { findPropInProperties } from "@eslint-react/jsx";
import { Data, F, isBoolean, isObject, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import birecord from "birecord";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export type MessageID =
  | "noLeakedEventListenerInEffect"
  | "noLeakedEventListenerInLifecycle"
  | "noLeakedEventListenerOfInlineFunction";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type EventMethodKind = "addEventListener" | "removeEventListener";
type EffectMethodKind = "useEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type EffectFunctionKind = "setup" | "cleanup";
type LifecycleFunctionKind = "mount" | "unmount";
type FunctionKind = EffectFunctionKind | LifecycleFunctionKind | "immediate" | "other";
type PhaseKind = EffectFunctionKind | LifecycleFunctionKind;
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "abort" | "other";
/* eslint-enable perfectionist/sort-union-types */

interface AddedEntry {
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
  phase: PhaseKind;
  signal: O.Option<unknown>;
}

interface RemovedEntry {
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
  phase: PhaseKind;
}

// #endregion

// #region Helpers

const functionKindPairs = birecord({
  mount: "unmount",
  setup: "cleanup",
});

const defaultOptions = Data.struct({ capture: O.some(false), once: O.none(), signal: O.none() });

function getCallKind(node: TSESTree.CallExpression): CallKind {
  return match<TSESTree.Expression, CallKind>(node.callee)
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
    .with({
      type: AST_NODE_TYPES.MemberExpression,
      property: {
        type: AST_NODE_TYPES.Identifier,
        name: "abort",
      },
    }, F.constant("abort"))
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

function getOptions(node: TSESTree.CallExpressionArgument, initialScope: Scope) {
  const findProp = (properties: TSESTree.ObjectExpression["properties"], propName: string) => {
    return findPropInProperties(properties, initialScope)(propName);
  };
  const getPropValue = (prop: TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement) => {
    if (prop.type !== AST_NODE_TYPES.Property) return O.none();
    const { value } = prop;
    return match(value)
      .with({ type: AST_NODE_TYPES.Literal }, v => O.some(v.value))
      .otherwise(() => O.fromNullable(getStaticValue(value, initialScope)?.value));
  };
  switch (node.type) {
    case AST_NODE_TYPES.Literal: {
      return Data.struct({ ...defaultOptions, capture: O.some(!!node.value) });
    }
    case AST_NODE_TYPES.ObjectExpression: {
      const pCapture = findProp(node.properties, "capture");
      const vCapture = O.flatMap(pCapture, getPropValue).pipe(O.filter(isBoolean));
      const pSignal = findProp(node.properties, "signal");
      const vSignal = O.flatMap(pSignal, getPropValue);
      return Data.struct({ capture: vCapture, signal: vSignal });
    }
    case AST_NODE_TYPES.Identifier:
    case AST_NODE_TYPES.MemberExpression: {
      const options = getStaticValue(node, initialScope);
      if (!isObject(options?.value)) return defaultOptions;
      if (!isMatching({ capture: P.optional(P.any), signal: P.optional(P.any) }, options.value)) {
        return defaultOptions;
      }
      const capture = O.fromNullable(options.value.capture).pipe(O.filter(isBoolean));
      const signal = O.fromNullable(options.value.signal);
      return Data.struct({ capture, signal });
    }
    default: {
      return defaultOptions;
    }
  }
}

// #endregion

// #region Rule Definition

// TODO: Add support for detecting event listeners removed by abort signal.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "prevent adding event listeners without removing them in the cleanup function or lifecycle method.",
    },
    messages: {
      noLeakedEventListenerInEffect:
        "A 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
      noLeakedEventListenerInLifecycle:
        "A 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.",
      // TODO: After adding support for abort signal, perform additional checks on inline functions before reporting this message.
      noLeakedEventListenerOfInlineFunction: "A '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("addEventListener")) return {};
    if (!/use\w*Effect|componentDidMount|componentWillUnmount/u.test(context.sourceCode.text)) return {};
    const functionStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const addedEventListeners: AddedEntry[] = [];
    const removedEventListeners: RemovedEntry[] = [];
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
    ): O.Option<ReportDescriptor<MessageID>> {
      const [_, listener] = node.arguments;
      if (!isFunction(listener)) return O.none();
      return O.some(
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          node: listener,
          data: { eventMethodKind: callKind },
        } as const,
      );
    }
    function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
      switch (true) {
        case a.type === AST_NODE_TYPES.ObjectExpression
          && b.type === AST_NODE_TYPES.ObjectExpression:
          return isNodeEqual(a, b);
        // TODO: Maybe there other cases to consider here.
        default:
          return false;
      }
    }
    function isMatchedAddAndRemove(added: AddedEntry) {
      return (removed: RemovedEntry) => {
        const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = added;
        const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = removed;
        if (functionKindPairs.get(aPhase) !== rPhase) return false;
        return isSameObject(aCallee, rCallee)
          && isNodeEqual(aListener, rListener)
          && isNodeValueEqual(aType, rType, [
            context.sourceCode.getScope(aType),
            context.sourceCode.getScope(rType),
          ])
          && O.getOrElse(aCapture, F.constFalse) === O.getOrElse(rCapture, F.constFalse);
      };
    }
    return {
      [":function"](node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        functionStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        functionStack.pop();
      },
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "addEventListener":
          case "removeEventListener": {
            O.map(checkInlineFunction(node, callKind), context.report);
            const [type, listener, options] = node.arguments;
            const [functionNode, functionKind] = functionStack.at(-1) ?? [];
            if (!type || !listener || !functionNode || !functionKind) return;
            if (functionKindPairs.has(functionKind)) {
              const opts = options ? getOptions(options, context.sourceCode.getScope(options)) : defaultOptions;
              const callee = node.callee;
              const listeners = callKind === "addEventListener" ? addedEventListeners : removedEventListeners;
              listeners.push({ ...opts, type, callee, listener, phase: functionKind });
            }
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const added of addedEventListeners) {
          if (removedEventListeners.some(isMatchedAddAndRemove(added))) continue;
          switch (added.phase) {
            case "setup":
            case "cleanup":
              context.report({
                messageId: "noLeakedEventListenerInEffect",
                node: added.listener,
                data: {
                  effectMethodKind: "useEffect",
                },
              });
              continue;
            case "mount":
            case "unmount":
              context.report({
                messageId: "noLeakedEventListenerInLifecycle",
                node: added.listener,
              });
              continue;
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;

// #endregion
