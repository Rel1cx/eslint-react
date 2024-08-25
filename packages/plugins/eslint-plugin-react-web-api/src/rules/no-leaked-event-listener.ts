import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunction, isNodeEqual } from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, isInversePhase, PHASE_RELEVANCE } from "@eslint-react/core";
import { findPropInProperties } from "@eslint-react/jsx";
import { Data, F, isBoolean, isObject, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";
import { EventListenerEntry } from "./../models";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export type MessageID =
  | "noLeakedEventListenerInEffect"
  | "noLeakedEventListenerInLifecycle"
  | "noLeakedEventListenerOfInlineFunction";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type EventMethodKind = "addEventListener" | "removeEventListener";
type CallKind = EventMethodKind | EREffectMethodKind | ERLifecycleMethodKind | "abort" | "other";
/* eslint-enable perfectionist/sort-union-types */

export type AEntry = EventListenerEntry & { _tag: "addEventListener" };

export type REntry = EventListenerEntry & { _tag: "removeEventListener" };

// #endregion

// #region Helpers

const defaultOptions = Data.struct({ capture: O.some(false), once: O.none(), signal: O.none() });

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener"), node.callee.name):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener"), node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
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
      description:
        "enforce that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
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
    const fStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const aEntries: AEntry[] = [];
    const rEntries: REntry[] = [];
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
    ): O.Option<ReportDescriptor<MessageID>> {
      const [_, listener] = node.arguments;
      if (!isFunction(listener)) return O.none();
      return O.some({
        messageId: "noLeakedEventListenerOfInlineFunction",
        node: listener,
        data: { eventMethodKind: callKind },
      });
    }
    function isSameEventTarget(a: TSESTree.Node, b: TSESTree.Node) {
      switch (true) {
        case a.type === AST_NODE_TYPES.MemberExpression
          && b.type === AST_NODE_TYPES.MemberExpression:
          return isNodeEqual(a.object, b.object);
        // TODO: Maybe there other cases to consider here.
        default:
          return false;
      }
    }
    function isInverseEntry(aEntry: AEntry) {
      return (rEntry: REntry) => {
        const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = aEntry;
        const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = rEntry;
        if (!isInversePhase(aPhase, rPhase)) return false;
        return isSameEventTarget(aCallee, rCallee)
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
        fStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const callKind = getCallKind(node);
        switch (callKind) {
          case "addEventListener": {
            O.map(checkInlineFunction(node, callKind), context.report);
            const [type, listener, options] = node.arguments;
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!type || !listener || !fNode || !fKind) return;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const opts = options ? getOptions(options, context.sourceCode.getScope(options)) : defaultOptions;
            const callee = node.callee;
            aEntries.push(EventListenerEntry.addEventListener({
              ...opts,
              type,
              node,
              callee,
              listener,
              phase: fKind,
            }));
            break;
          }
          case "removeEventListener": {
            O.map(checkInlineFunction(node, callKind), context.report);
            const [type, listener, options] = node.arguments;
            const [fNode, fKind] = fStack.at(-1) ?? [];
            if (!type || !listener || !fNode || !fKind) return;
            if (!PHASE_RELEVANCE.has(fKind)) break;
            const opts = options ? getOptions(options, context.sourceCode.getScope(options)) : defaultOptions;
            const callee = node.callee;
            rEntries.push(EventListenerEntry.removeEventListener({
              ...opts,
              type,
              node,
              callee,
              listener,
              phase: fKind,
            }));
            break;
          }
        }
      },
      ["Program:exit"]() {
        for (const aEntry of aEntries) {
          if (rEntries.some(isInverseEntry(aEntry))) continue;
          switch (aEntry.phase) {
            case "setup":
            case "cleanup":
              context.report({
                messageId: "noLeakedEventListenerInEffect",
                node: aEntry.node,
                data: {
                  effectMethodKind: "useEffect",
                },
              });
              continue;
            case "mount":
            case "unmount":
              context.report({
                messageId: "noLeakedEventListenerInLifecycle",
                node: aEntry.node,
              });
              continue;
          }
        }
      },
    };
  },
  defaultOptions: [],
});

// #endregion
