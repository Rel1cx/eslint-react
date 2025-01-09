import * as AST from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance, isInversePhase } from "@eslint-react/core";
import { F, isBoolean, O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

import { createRule, getPhaseKindOfFunction } from "../utils";
import type { EventListenerEntry } from "./../models";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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

export type AEntry = EventListenerEntry & { kind: "addEventListener" };

export type REntry = EventListenerEntry & { kind: "removeEventListener" };

// #endregion

// #region Helpers

const defaultOptions = {
  capture: O.some<boolean>(false),
  once: O.some<boolean>(false),
  signal: O.none<TSESTree.Node>(),
};

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"), node.callee.name):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"), node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
}

function getSignalValueExpression(node: TSESTree.Node, initialScope: Scope): O.Option<TSESTree.Node> {
  switch (node.type) {
    case T.Identifier:
      return F.pipe(
        VAR.findVariable(node, initialScope),
        O.flatMap(VAR.getVariableNode(0)),
        O.flatMap(n => getSignalValueExpression(n, initialScope)),
      );
    case T.MemberExpression:
      return O.some(node);
    default:
      return O.none();
  }
}

function getOptions(node: TSESTree.CallExpressionArgument, initialScope: Scope): typeof defaultOptions {
  const findProp = (properties: TSESTree.ObjectExpression["properties"], propName: string) => {
    return JSX.findPropInProperties(properties, initialScope)(propName);
  };
  const getPropValue = (prop: TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement) => {
    if (prop.type !== T.Property) {
      return O.none();
    }
    const { value } = prop;
    switch (value.type) {
      case T.Literal: {
        return O.some(value.value);
      }
      default: {
        return VAR.getStaticValue(value, initialScope);
      }
    }
  };
  function getOpts(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case T.Identifier: {
        return F.pipe(
          VAR.findVariable(node, initialScope),
          O.flatMap(VAR.getVariableNode(0)),
          O.filter(AST.is(T.ObjectExpression)),
          O.map(getOpts),
          O.getOrElse(() => defaultOptions),
        );
      }
      case T.Literal: {
        return { ...defaultOptions, capture: O.some(Boolean(node.value)) };
      }
      case T.ObjectExpression: {
        const pOnce = findProp(node.properties, "once");
        const vOnce = O.flatMap(pOnce, getPropValue).pipe(O.filter(isBoolean));
        const pCapture = findProp(node.properties, "capture");
        const vCapture = O.flatMap(pCapture, getPropValue).pipe(O.filter(isBoolean));
        const pSignal = findProp(node.properties, "signal");
        const vSignal = O.flatMap(pSignal, prop => {
          if (prop.type !== T.Property) {
            return O.none();
          }
          const { value } = prop;
          return getSignalValueExpression(value, initialScope);
        });
        return { capture: vCapture, once: vOnce, signal: vSignal };
      }
      default: {
        return defaultOptions;
      }
    }
  }
  return getOpts(node);
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce that every 'addEventListener' in a component or custom Hook has a corresponding 'removeEventListener'.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noLeakedEventListenerInEffect:
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
      noLeakedEventListenerInLifecycle:
        "An 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.",
      noLeakedEventListenerOfInlineFunction: "A/an '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("addEventListener")) {
      return {};
    }
    if (!/use\w*Effect|componentDidMount|componentWillUnmount/u.test(context.sourceCode.text)) {
      return {};
    }
    const fStack: [node: AST.TSESTreeFunction, kind: FunctionKind][] = [];
    const aEntries: AEntry[] = [];
    const rEntries: REntry[] = [];
    const abortedSignals: TSESTree.Expression[] = [];
    function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
      switch (true) {
        case a.type === T.MemberExpression
          && b.type === T.MemberExpression:
          return AST.isNodeEqual(a.object, b.object);
        // TODO: Maybe there other cases to consider here.
        default:
          return false;
      }
    }
    function isInverseEntry(aEntry: AEntry, rEntry: REntry) {
      const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = aEntry;
      const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = rEntry;
      if (!isInversePhase(aPhase, rPhase)) {
        return false;
      }
      return isSameObject(aCallee, rCallee)
        && AST.isNodeEqual(aListener, rListener)
        && VAR.isNodeValueEqual(aType, rType, [
          context.sourceCode.getScope(aType),
          context.sourceCode.getScope(rType),
        ])
        && O.getOrElse(aCapture, F.constFalse) === O.getOrElse(rCapture, F.constFalse);
    }
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
      options: typeof defaultOptions,
    ): O.Option<ReportDescriptor<MessageID>> {
      const [_, listener] = node.arguments;
      if (!AST.isFunction(listener)) {
        return O.none();
      }
      if (O.isSome(options.signal)) {
        return O.none();
      }
      return O.some({
        messageId: "noLeakedEventListenerOfInlineFunction",
        node: listener,
        data: { eventMethodKind: callKind },
      });
    }
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
        if (fNode == null || fKind == null) {
          return;
        }
        if (!ERPhaseRelevance.has(fKind)) {
          return;
        }
        match(getCallKind(node))
          .with("addEventListener", (callKind) => {
            const [type, listener, options] = node.arguments;
            if (type == null || listener == null) {
              return;
            }
            const opts = options == null
              ? defaultOptions
              : getOptions(options, context.sourceCode.getScope(options));
            const { callee } = node;
            O.map(checkInlineFunction(node, callKind, opts), context.report);
            aEntries.push({
              ...opts,
              kind: "addEventListener",
              type,
              node,
              callee,
              listener,
              phase: fKind,
            });
          })
          .with("removeEventListener", (callKind) => {
            const [type, listener, options] = node.arguments;
            if (type == null || listener == null) {
              return;
            }
            const opts = options == null
              ? defaultOptions
              : getOptions(options, context.sourceCode.getScope(options));
            const { callee } = node;
            O.map(checkInlineFunction(node, callKind, opts), context.report);
            rEntries.push({
              ...opts,
              kind: "removeEventListener",
              type,
              node,
              callee,
              listener,
              phase: fKind,
            });
          })
          .with("abort", () => {
            abortedSignals.push(node.callee);
          })
          .otherwise(F.constVoid);
      },
      ["Program:exit"]() {
        for (const aEntry of aEntries) {
          if (O.exists(aEntry.signal, signal => abortedSignals.some(as => isSameObject(as, signal)))) {
            continue;
          }
          if (rEntries.some(rEntry => isInverseEntry(aEntry, rEntry))) {
            continue;
          }
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
