/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import {
  is,
  isFunction,
  isFunctionOfImmediatelyInvoked,
  isNodeEqual,
  isOneOf,
  traverseUpGuard,
} from "@eslint-react/ast";
import { findPropInProperties } from "@eslint-react/jsx";
import { F, isBoolean, isObject, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue, getStringIfConstant } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import birecord from "birecord";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "symmetric-event-listener";

export type MessageID =
  | "symmetricEventListenerInEffect"
  | "symmetricEventListenerInLifecycle"
  | "symmetricEventListenerNoInlineFunction";

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
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
  phase: PhaseKind;
  signal: O.Option<unknown>;
  type: TSESTree.Node;
}

interface RemovedEntry {
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
  phase: PhaseKind;
  type: TSESTree.Node;
}

// #endregion

// #region Helpers

const functionKindPairs = birecord({
  mount: "unmount",
  setup: "cleanup",
});

const defaultOptions = { capture: O.some(false), once: O.none(), signal: O.none() };

function isUseEffectCallLoose(node: TSESTree.Node) {
  if (node.type !== AST_NODE_TYPES.CallExpression) return false;
  switch (node.callee.type) {
    case AST_NODE_TYPES.Identifier:
      return /^(use(?:\w+)?Effect)$/u.test(node.callee.name);
    case AST_NODE_TYPES.MemberExpression:
      return node.callee.property.type === AST_NODE_TYPES.Identifier
        && /^(use(?:\w+)?Effect)$/u.test(node.callee.property.name);
    default:
      return false;
  }
}

function isSetupFunction(node: TSESTree.Node) {
  return node.parent?.type === AST_NODE_TYPES.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === AST_NODE_TYPES.Identifier
    && node.parent.arguments.at(0) === node
    && isUseEffectCallLoose(node.parent);
}

function isCleanupFunction(node: TSESTree.Node) {
  const nearestRet = O.getOrNull(traverseUpGuard(node, is(AST_NODE_TYPES.ReturnStatement)));
  if (!nearestRet) return false;
  const nearestFunction = O.getOrNull(traverseUpGuard(node, isFunction));
  const nearestFunctionOfRet = O.getOrNull(traverseUpGuard(nearestRet, isFunction));
  if (!nearestFunction || !nearestFunctionOfRet) return false;
  return nearestFunction === nearestFunctionOfRet && isSetupFunction(nearestFunction);
}

function isComponentDidMount(node: TSESTree.Node): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentDidMount";
}

function isComponentWillUnmount(node: TSESTree.Node): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "componentWillUnmount";
}

function isComponentDidMountFunction(node: TSESTree.Node) {
  return isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

function isComponentWillUnmountFunction(node: TSESTree.Node) {
  return isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
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
        "ensure that every 'addEventListener' in a React component or custom hook has a corresponding 'removeEventListener'",
    },
    messages: {
      symmetricEventListenerInEffect:
        "A 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in the cleanup function.",
      symmetricEventListenerInLifecycle:
        "A 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.",
      symmetricEventListenerNoInlineFunction: "A '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("addEventListener")) return {};
    if (!/use(?:\w+)?Effect|componentDidMount|componentWillUnmount/u.test(context.sourceCode.text)) return {};
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
          messageId: "symmetricEventListenerNoInlineFunction",
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
      [":function:exit"](node: TSESTreeFunction) {
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
          if (added.phase === "setup" || added.phase === "cleanup") {
            context.report({
              messageId: "symmetricEventListenerInEffect",
              node: added.listener,
              data: {
                effectMethodKind: "useEffect",
              },
            });
            return;
          }
          if (added.phase === "mount" || added.phase === "unmount") {
            context.report({
              messageId: "symmetricEventListenerInLifecycle",
              node: added.listener,
            });
            return;
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;

// #endregion
