import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findVariable, isValueEqual } from "@eslint-react/var";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching, match } from "ts-pattern";

import {
  type ComponentPhaseKind,
  ComponentPhaseRelevance,
  type EventListenerEntry,
  getPhaseKindOfFunction,
  isInversePhase,
} from "../../types";
import { createRule } from "../../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedRemoveEventListenerInCleanup"
  | "expectedRemoveEventListenerInUnmount"
  | "unexpectedInlineFunction";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type EventMethodKind = "addEventListener" | "removeEventListener";
type EffectMethodKind = "useEffect" | "useInsertionEffect" | "useLayoutEffect";
type LifecycleMethodKind = "componentDidMount" | "componentWillUnmount";
type CallKind = EventMethodKind | EffectMethodKind | LifecycleMethodKind | "abort" | "other";

export type AEntry = EventListenerEntry & { method: "addEventListener" };

export type REntry = EventListenerEntry & { method: "removeEventListener" };

// #endregion

// #region Helpers

const defaultOptions: {
  capture: boolean | unit;
  // once: boolean | unit;
  signal: TSESTree.Node | unit;
} = {
  capture: false,
  // once: false,
  signal: unit,
};

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(node.callee.name):
      return node.callee.name;
    case node.callee.type === AST.MemberExpression
      && node.callee.property.type === AST.Identifier
      && isMatching(P.union("addEventListener", "removeEventListener", "abort"))(node.callee.property.name):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: ast.TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
}

function getSignalValueExpression(node: TSESTree.Node | unit, initialScope: Scope): TSESTree.Node | unit {
  if (node == null) return unit;
  switch (node.type) {
    case AST.Identifier: {
      function resolve(v: Variable | unit) {
        if (v == null) return unit;
        const def = v.defs.at(0);
        if (def == null) return unit;
        if (
          "init" in def.node
          && def.node.init != null
          && !("declarations" in def.node.init)
        ) {
          return def.node.init;
        }
        return unit;
      }
      return getSignalValueExpression(resolve(findVariable(node, initialScope)), initialScope);
    }
    case AST.MemberExpression:
      return node;
    default:
      return unit;
  }
}

function getOptions(node: TSESTree.CallExpressionArgument, initialScope: Scope): typeof defaultOptions {
  function getOpts(node: TSESTree.Node): typeof defaultOptions {
    switch (node.type) {
      case AST.Identifier: {
        function resolve(v: typeof variable) {
          if (v == null) return unit;
          const def = v.defs.at(0);
          if (def == null) return unit;
          if (
            "init" in def.node
            && def.node.init != null
            && !("declarations" in def.node.init)
          ) {
            return def.node.init;
          }
          return unit;
        }
        const variable = findVariable(node, initialScope);
        const variableNode = resolve(variable);
        if (variableNode?.type === AST.ObjectExpression) {
          return getOpts(variableNode);
        }
        return defaultOptions;
      }
      case AST.Literal: {
        return { ...defaultOptions, capture: Boolean(node.value) };
      }
      case AST.ObjectExpression: {
        const pCapture = ast.findProperty(node.properties, "capture");
        const vCapture = match(pCapture)
          .with(P.nullish, () => false)
          .with({ type: AST.Property }, (prop) => {
            const value = prop.value;
            switch (value.type) {
              case AST.Literal:
                return Boolean(value.value);
              default:
                return Boolean(getStaticValue(value, initialScope)?.value);
            }
          })
          .otherwise(() => false);
        const pSignal = ast.findProperty(node.properties, "signal");
        const vSignal = pSignal?.type === AST.Property
          ? getSignalValueExpression(pSignal.value, initialScope)
          : unit;
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
        "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
    },
    messages: {
      expectedRemoveEventListenerInCleanup:
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
      expectedRemoveEventListenerInUnmount:
        "An 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.",
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
  if (!/use\w*Effect|componentDidMount|componentWillUnmount/u.test(context.sourceCode.text)) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: ast.TSESTreeFunction }[] = [];
  const aEntries: AEntry[] = [];
  const rEntries: REntry[] = [];
  const abortedSignals: TSESTree.Expression[] = [];
  function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
    switch (true) {
      case a.type === AST.MemberExpression
        && b.type === AST.MemberExpression:
        return ast.isNodeEqual(a.object, b.object);
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
      && ast.isNodeEqual(aListener, rListener)
      && isValueEqual(aType, rType, [
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
    if (!ast.isFunction(listener)) {
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
  return defineRuleListener(
    {
      [":function"](node: ast.TSESTreeFunction) {
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
        match(getCallKind(node))
          .with("addEventListener", (callKind) => {
            // https://github.com/Rel1cx/eslint-react/issues/1323
            const isFromReactNative = node.callee.type === AST.MemberExpression
              && node.callee.object.type === AST.Identifier
              && core.isInitializedFromReactNative(node.callee.object.name, context.sourceCode.getScope(node));
            if (isFromReactNative) {
              return;
            }
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
              : getOptions(options, context.sourceCode.getScope(options));
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
            case "mount":
            case "unmount":
              context.report({
                messageId: "expectedRemoveEventListenerInUnmount",
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
