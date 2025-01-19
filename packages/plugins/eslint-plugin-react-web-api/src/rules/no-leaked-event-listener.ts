import * as AST from "@eslint-react/ast";
import type { ERPhaseKind } from "@eslint-react/core";
import { ERPhaseRelevance, isInversePhase } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
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

type FunctionKind = ERPhaseKind | "other";
type EventMethodKind = "addEventListener" | "removeEventListener";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "abort" | "other";

export type AEntry = EventListenerEntry & { kind: "addEventListener" };

export type REntry = EventListenerEntry & { kind: "removeEventListener" };

// #endregion

// #region Helpers

const defaultOptions: {
  capture: boolean | _;
  // once: boolean | _;
  signal: TSESTree.Node | _;
} = {
  capture: false,
  // once: false,
  signal: _,
};

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === T.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(node.callee.name):
      return node.callee.name;
    case node.callee.type === T.MemberExpression
      && node.callee.property.type === T.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: AST.TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
}

function getSignalValueExpression(node: TSESTree.Node | _, initialScope: Scope): TSESTree.Node | _ {
  if (node == null) return _;
  switch (node.type) {
    case T.Identifier: {
      return getSignalValueExpression(VAR.getVariableNode(VAR.findVariable(node, initialScope), 0), initialScope);
    }
    case T.MemberExpression:
      return node;
    default:
      return _;
  }
}

function getOptions(node: TSESTree.CallExpressionArgument, initialScope: Scope): typeof defaultOptions {
  function findProp(properties: TSESTree.ObjectExpression["properties"], propName: string) {
    return VAR.findPropertyInProperties(propName, properties, initialScope);
  }
  function getPropValue<A>(
    prop: TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement | _,
    filter: (value: unknown) => value is A = (a): a is A => true,
  ): A | _ {
    if (prop?.type !== T.Property) return _;
    const { value } = prop;
    let v: unknown = value;
    switch (value.type) {
      case T.Literal: {
        v = value.value;
        break;
      }
      default: {
        v = VAR.toStaticValue({ kind: "lazy", node: value, initialScope }).value;
        break;
      }
    }
    return filter(v) ? v : _;
  }
  function getOpts(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case T.Identifier: {
        const variable = VAR.findVariable(node, initialScope);
        const variableNode = VAR.getVariableNode(variable, 0);
        if (variableNode?.type === T.ObjectExpression) {
          return getOpts(variableNode);
        }
        return defaultOptions;
      }
      case T.Literal: {
        return { ...defaultOptions, capture: Boolean(node.value) };
      }
      case T.ObjectExpression: {
        // const pOnce = findProp(node.properties, "once");
        // const vOnce = getPropValue(pOnce);
        const pCapture = findProp(node.properties, "capture");
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const vCapture = !!getPropValue(pCapture);
        const pSignal = findProp(node.properties, "signal");
        const vSignal = pSignal?.type === T.Property
          ? getSignalValueExpression(pSignal.value, initialScope)
          : _;
        return { capture: vCapture, signal: vSignal };
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
    const fEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
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
        && aCapture === rCapture;
    }
    function checkInlineFunction(
      node: TSESTree.CallExpression,
      callKind: EventMethodKind,
      options: typeof defaultOptions,
    ) {
      const listener = node.arguments.at(1);
      if (!AST.isFunction(listener)) {
        return;
      }
      if (options.signal != null) {
        return;
      }
      context.report({
        messageId: "noLeakedEventListenerOfInlineFunction",
        node: listener,
        data: { eventMethodKind: callKind },
      });
    }
    return {
      [":function"](node: AST.TSESTreeFunction) {
        const kind = getFunctionKind(node);
        fEntries.push({ kind, node });
      },
      [":function:exit"]() {
        fEntries.pop();
      },
      ["CallExpression"](node) {
        const fKind = fEntries.findLast((x) => x.kind !== "other")?.kind;
        if (fKind == null) {
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
            checkInlineFunction(node, callKind, opts);
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
            checkInlineFunction(node, callKind, opts);
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
          .otherwise(() => _);
      },
      ["Program:exit"]() {
        for (const aEntry of aEntries) {
          const signal = aEntry.signal;
          if (signal != null && abortedSignals.some((a) => isSameObject(a, signal))) {
            continue;
          }
          if (rEntries.some((rEntry) => isInverseEntry(aEntry, rEntry))) {
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
