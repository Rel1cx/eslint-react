import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunction, isFunctionOfImmediatelyInvoked, isNodeEqual } from "@eslint-react/ast";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { findPropInProperties } from "@eslint-react/jsx";
import { F, isBoolean, isObject, O } from "@eslint-react/tools";
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
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "other";
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

const defaultOptions = { capture: O.some(false), once: O.none(), signal: O.none() };

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
    case AST_NODE_TYPES.ObjectExpression: {
      const pCapture = findProp(node.properties, "capture");
      const vCapture = O.flatMap(pCapture, getPropValue).pipe(O.filter(isBoolean));
      const pSignal = findProp(node.properties, "signal");
      const vSignal = O.flatMap(pSignal, getPropValue);
      return { capture: vCapture, signal: vSignal };
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
      return { capture, signal };
    }
    default: {
      return defaultOptions;
    }
  }
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "ensure that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'",
    },
    messages: {
      noLeakedEventListenerInEffect:
        "A 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in the cleanup function.",
      noLeakedEventListenerInLifecycle:
        "A 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.",
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
          node,
          data: { eventMethodKind: callKind },
        } as const,
      );
    }
    function isMatchedAddAndRemove(added: AddedEntry) {
      return (removed: RemovedEntry) => {
        const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = added;
        const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = removed;
        if (aPhase === "setup" && rPhase !== "cleanup") return false;
        if (aPhase === "cleanup" && rPhase !== "setup") return false;
        if (aPhase === "mount" && rPhase !== "unmount") return false;
        if (aPhase === "unmount" && rPhase !== "mount") return false;
        const isSameObject = "object" in aCallee && "object" in rCallee && isNodeEqual(aCallee.object, rCallee.object);
        return isSameObject
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
