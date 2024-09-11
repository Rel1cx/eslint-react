import * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, isInversePhase, PHASE_RELEVANCE } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import { Data, F, isBoolean, O } from "@eslint-react/tools";
import * as VAR from "@eslint-react/var";
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

export type AEntry = EventListenerEntry & { _tag: "AddEventListener" };

export type REntry = EventListenerEntry & { _tag: "RemoveEventListener" };

// #endregion

// #region Helpers

const defaultOptions = Data.struct({
  capture: O.some<boolean>(false),
  once: O.some<boolean>(false),
  signal: O.none<TSESTree.Node>(),
});

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"), node.callee.name):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"), node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
}

function getOptions(node: TSESTree.CallExpressionArgument, initialScope: Scope): typeof defaultOptions {
  const findProp = (properties: TSESTree.ObjectExpression["properties"], propName: string) => {
    return JSX.findPropInProperties(properties, initialScope)(propName);
  };
  const getPropValue = (prop: TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement) => {
    if (prop.type !== AST_NODE_TYPES.Property) return O.none();
    const { value } = prop;
    switch (value.type) {
      case AST_NODE_TYPES.Literal: {
        return O.some(value.value);
      }
      default: {
        return O.fromNullable(getStaticValue(value, initialScope)?.value);
      }
    }
  };
  function getOpts(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case AST_NODE_TYPES.Literal: {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return Data.struct({ ...defaultOptions, capture: O.some(!!node.value) });
      }
      case AST_NODE_TYPES.ObjectExpression: {
        const pOnce = findProp(node.properties, "once");
        const vOnce = O.flatMap(pOnce, getPropValue).pipe(O.filter(isBoolean));
        const pCapture = findProp(node.properties, "capture");
        const vCapture = O.flatMap(pCapture, getPropValue).pipe(O.filter(isBoolean));
        const pSignal = findProp(node.properties, "signal");
        const vSignal = O.flatMapNullable(pSignal, prop => prop.type === AST_NODE_TYPES.Property ? prop.value : null);
        return Data.struct({ capture: vCapture, once: vOnce, signal: vSignal });
      }
      case AST_NODE_TYPES.Identifier: {
        return F.pipe(
          VAR.findVariable(node, initialScope),
          O.flatMap(VAR.getVariableNode(0)),
          O.filter(AST.is(AST_NODE_TYPES.ObjectExpression)),
          O.map(getOpts),
          O.getOrElse(() => defaultOptions),
        );
      }
      default: {
        return defaultOptions;
      }
    }
  }
  return getOpts(node);
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
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const aEntries: AEntry[] = [];
    const rEntries: REntry[] = [];
    const abortedSignals: TSESTree.Expression[] = [];
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
      options: typeof defaultOptions,
    ): O.Option<ReportDescriptor<MessageID>> {
      const [_, listener] = node.arguments;
      if (!AST.isFunction(listener)) return O.none();
      if (O.isSome(options.signal)) return O.none();
      // if (O.exists(options.once, F.identity)) return O.none();
      return O.some({
        messageId: "noLeakedEventListenerOfInlineFunction",
        node: listener,
        data: { eventMethodKind: callKind },
      });
    }
    const isSameObject: {
      (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
      (a: TSESTree.Node, b: TSESTree.Node): boolean;
    } = F.dual(2, (a: TSESTree.Node, b: TSESTree.Node) => {
      switch (true) {
        case a.type === AST_NODE_TYPES.MemberExpression
          && b.type === AST_NODE_TYPES.MemberExpression:
          return AST.isNodeEqual(a.object, b.object);
        // TODO: Maybe there other cases to consider here.
        default:
          return false;
      }
    });
    const isInverseEntry: {
      (aEntry: AEntry): (rEntry: REntry) => boolean;
      (aEntry: AEntry, rEntry: REntry): boolean;
    } = F.dual(2, (aEntry: AEntry, rEntry: REntry) => {
      const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = aEntry;
      const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = rEntry;
      if (!isInversePhase(aPhase, rPhase)) return false;
      return isSameObject(aCallee, rCallee)
        && AST.isNodeEqual(aListener, rListener)
        && VAR.isNodeValueEqual(aType, rType, [
          context.sourceCode.getScope(aType),
          context.sourceCode.getScope(rType),
        ])
        && O.getOrElse(aCapture, F.constFalse) === O.getOrElse(rCapture, F.constFalse);
    });
    return {
      [":function"](node: AST.TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        fStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const [fNode, fKind] = fStack.findLast(f => f.at(1) !== "other") ?? [];
        if (!fNode || !fKind) return;
        if (!PHASE_RELEVANCE.has(fKind)) return;
        match(getCallKind(node))
          .with("addEventListener", (callKind) => {
            const [type, listener, options] = node.arguments;
            if (!type || !listener) return;
            const opts = options ? getOptions(options, context.sourceCode.getScope(options)) : defaultOptions;
            const { callee } = node;
            O.map(checkInlineFunction(node, callKind, opts), context.report);
            aEntries.push(EventListenerEntry.AddEventListener({
              ...opts,
              type,
              node,
              callee,
              listener,
              phase: fKind,
            }));
          })
          .with("removeEventListener", (callKind) => {
            const [type, listener, options] = node.arguments;
            if (!type || !listener) return;
            const opts = options ? getOptions(options, context.sourceCode.getScope(options)) : defaultOptions;
            const { callee } = node;
            O.map(checkInlineFunction(node, callKind, opts), context.report);
            rEntries.push(EventListenerEntry.RemoveEventListener({
              ...opts,
              type,
              node,
              callee,
              listener,
              phase: fKind,
            }));
          })
          .with("abort", () => {
            abortedSignals.push(node.callee);
          })
          .otherwise(F.constVoid);
      },
      ["Program:exit"]() {
        for (const aEntry of aEntries) {
          if (O.exists(aEntry.signal, signal => abortedSignals.some(isSameObject(signal)))) continue;
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
