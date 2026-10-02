import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { getFunctionId, isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isInitializedFromReactNative, isValueEqual } from "@eslint-react/var";
import { getOrInsertComputed } from "@local/eff";
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

type EventMethodKind = "addEventListener" | "removeEventListener";
type CallKind = EventMethodKind | "other";

type AEntry = {
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: boolean;
  effect: TSESTree.Node | null;
  listener: TSESTree.Node;
  method: "addEventListener";
  node: TSESTree.CallExpression;
  phase: "cleanup" | "setup";
  signal: TSESTree.Node | null;
};

type REntry = {
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: boolean;
  effect: TSESTree.Node | null;
  listener: TSESTree.Node;
  method: "removeEventListener";
  node: TSESTree.CallExpression;
  phase: "cleanup" | "setup";
};

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("addEventListener", "removeEventListener"))(name)) {
    return name;
  }
  return "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `addEventListener` is not present in the file
  if (!context.sourceCode.text.includes("addEventListener")) {
    return {};
  }
  if (!/use\w*Effect/u.test(context.sourceCode.text)) {
    return {};
  }
  const aEntries: AEntry[] = [];
  const rEntries: REntry[] = [];
  // Names of functions called within each effect's cleanup, keyed by the effect call node.
  const cleanupCallees = new Map<TSESTree.Node, Set<string>>();
  // FIXME: bare global calls (`addEventListener(...)` without a receiver, i.e. `window`) never pair up
  // because only MemberExpression callees are compared - both sides bare should fall back to
  // `Compare.isEqual(a, b)`.
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
    const { type: aType, callee: aCallee, capture: aCapture, effect: aEffect, listener: aListener, phase: aPhase } = aEntry;
    const { type: rType, callee: rCallee, capture: rCapture, effect: rEffect, listener: rListener, phase: rPhase } = rEntry;
    if (aPhase !== "setup") {
      return false;
    }
    if (
      !isSameObject(aCallee, rCallee)
      || !Compare.isEqual(aListener, rListener)
      || !isValueEqual(context, aType, rType)
      || aCapture !== rCapture
    ) {
      return false;
    }
    if (rPhase === "cleanup") {
      return true;
    }
    // A `removeEventListener` that sits in a setup-phase function is still
    // removed on unmount when the cleanup calls that function (e.g. a
    // self-removing listener whose remover is also invoked from the cleanup).
    if (aEffect == null || aEffect !== rEffect) {
      return false;
    }
    const enclosingFunction = Traverse.findParent(rEntry.node, Check.isFunction);
    const id = enclosingFunction == null ? null : getFunctionId(enclosingFunction);
    if (id == null || id.type !== AST.Identifier) {
      return false;
    }
    return cleanupCallees.get(aEffect)?.has(id.name) ?? false;
  }
  function visitInlineFunction(
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
  return {
    ["CallExpression"](node) {
      const fn = Traverse.findParent(node, (n) => isUseEffectSetupCallback(n) || isUseEffectCleanupCallback(n));
      if (fn == null) {
        return;
      }
      const fKind = isUseEffectSetupCallback(fn) ? "setup" : "cleanup";
      const setupFn = fKind === "setup" ? fn : Traverse.findParent(fn, Check.isFunction);
      const effect = setupFn == null ? null : Extract.unwrap(setupFn).parent ?? null;
      const callee = Extract.unwrap(node.callee);
      match(getCallKind(node))
        .with("addEventListener", (callKind) => {
          // https://github.com/Rel1cx/eslint-react/issues/1323
          const isFromReactNative = callee.type === AST.MemberExpression
            && Check.isIdentifier(callee.object)
            && isInitializedFromReactNative(callee.object.name, context.sourceCode.getScope(node));
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
          visitInlineFunction(node, callKind, opts);
          aEntries.push({
            ...opts,
            type,
            callee,
            effect,
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
          visitInlineFunction(node, callKind, opts);
          rEntries.push({
            type,
            callee,
            capture: opts.capture,
            effect,
            listener,
            method: "removeEventListener",
            node,
            phase: fKind,
          });
        })
        .with("other", () => {
          if (fKind !== "cleanup" || effect == null) {
            return;
          }
          const name = Extract.getCalleeName(node);
          if (name == null) {
            return;
          }
          getOrInsertComputed(cleanupCallees, effect, () => new Set<string>()).add(name);
        })
        .otherwise(() => null);
    },
    ["Program:exit"]() {
      for (const aEntry of aEntries) {
        const signal = aEntry.signal;
        if (signal != null) {
          continue;
        }
        if (rEntries.some((rEntry) => isInverseEntry(aEntry, rEntry))) {
          continue;
        }
        context.report({
          data: {
            effectMethodKind: "useEffect",
          },
          messageId: "expectedRemoveEventListenerInCleanup",
          node: aEntry.node,
        });
      }
    },
  };
}

// #endregion
