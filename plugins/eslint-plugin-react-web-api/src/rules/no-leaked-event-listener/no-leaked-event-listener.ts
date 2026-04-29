import {
  type ComponentPhaseKind,
  ComponentPhaseRelevance,
  type EventListenerEntry,
  getPhaseKindOfFunction,
} from "@/types";
import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { isValueEqual } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";
import { defaultOptions, getOptions } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedRemoveEventListenerInCleanup"
  | "unexpectedInlineFunction";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type EventMethodKind = "addEventListener" | "removeEventListener";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type CallKind = EventMethodKind | EffectMethodKind | "abort" | "other";

export type AEntry = EventListenerEntry & { method: "addEventListener" };
export type REntry = EventListenerEntry & { method: "removeEventListener" };

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  switch (true) {
    case callee.type === AST.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(callee.name):
      return callee.name;
    case callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(callee.property.name):
      return callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
    },
    messages: {
      expectedRemoveEventListenerInCleanup:
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
      unexpectedInlineFunction: "A/an '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `addEventListener` is not present in the file
  if (!context.sourceCode.text.includes("addEventListener")) {
    return {};
  }
  if (!/use\w*Effect/u.test(context.sourceCode.text)) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const aEntries: AEntry[] = [];
  const rEntries: REntry[] = [];
  const abortedSignals: TSESTree.Expression[] = [];
  function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
    switch (true) {
      case a.type === AST.MemberExpression
        && b.type === AST.MemberExpression:
        return Compare.isEqual(a.object, b.object);
      default:
        return false;
    }
  }
  function isInverseEntry(aEntry: AEntry, rEntry: REntry) {
    const { type: aType, callee: aCallee, capture: aCapture, listener: aListener, phase: aPhase } = aEntry;
    const { type: rType, callee: rCallee, capture: rCapture, listener: rListener, phase: rPhase } = rEntry;
    if (ComponentPhaseRelevance.get(aPhase) !== rPhase) {
      return false;
    }
    return isSameObject(aCallee, rCallee)
      && Compare.isEqual(aListener, rListener)
      && isValueEqual(context, aType, rType)
      && aCapture === rCapture;
  }
  function checkInlineFunction(
    node: TSESTree.CallExpression,
    callKind: EventMethodKind,
    options: typeof defaultOptions,
  ) {
    const listener = node.arguments.at(1);
    if (!Check.isFunction(listener)) {
      return;
    }
    if (options.signal != null) {
      return;
    }
    context.report({
      data: { eventMethodKind: callKind },
      messageId: "unexpectedInlineFunction",
      node: listener,
    });
  }
  return merge(
    {
      [":function"](node: TSESTreeFunction) {
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
        if (!ComponentPhaseRelevance.has(fKind)) {
          return;
        }
        const unwrappedCallee = Extract.unwrap(node.callee);
        match(getCallKind(node))
          .with("addEventListener", (callKind) => {
            // https://github.com/Rel1cx/eslint-react/issues/1323
            const isFromReactNative = unwrappedCallee.type === AST.MemberExpression
              && unwrappedCallee.object.type === AST.Identifier
              && core.isAPIFromReactNative(unwrappedCallee.object.name, context.sourceCode.getScope(node));
            if (isFromReactNative) {
              return;
            }
            const [type, listener, options] = node.arguments;
            if (type == null || listener == null) {
              return;
            }
            const opts = options == null
              ? defaultOptions
              : getOptions(context, options);
            const { callee } = node;
            checkInlineFunction(node, callKind, opts);
            aEntries.push({
              ...opts,
              type,
              callee,
              listener,
              method: "addEventListener",
              node,
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
              : getOptions(context, options);
            const { callee } = node;
            checkInlineFunction(node, callKind, opts);
            rEntries.push({
              ...opts,
              type,
              callee,
              listener,
              method: "removeEventListener",
              node,
              phase: fKind,
            });
          })
          .with("abort", () => {
            abortedSignals.push(node.callee);
          })
          .otherwise(() => null);
      },
      ["Program:exit"]() {
        for (const aEntry of aEntries) {
          const signal = aEntry.signal;
          // https://github.com/Rel1cx/eslint-react/issues/1282#issuecomment-3536511881
          // if (signal != null && abortedSignals.some((a) => isSameObject(a, signal))) {
          //   continue;
          // }
          if (signal != null) {
            continue;
          }
          if (rEntries.some((rEntry) => isInverseEntry(aEntry, rEntry))) {
            continue;
          }
          switch (aEntry.phase) {
            case "setup":
            case "cleanup":
              context.report({
                data: {
                  effectMethodKind: "useEffect",
                },
                messageId: "expectedRemoveEventListenerInCleanup",
                node: aEntry.node,
              });
              continue;
          }
        }
      },
    },
  );
}

// #endregion
