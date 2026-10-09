import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { getFunctionId, isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isInitializedFromReactNative, isValueEqual } from "@eslint-react/var";
import { getOrInsertComputed, isString, or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching, match } from "ts-pattern";
import { defaultOptions, getOptions } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expected-remove-event-listener-in-cleanup"
  | "unexpected-inline-function";

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

// A function called from an effect cleanup, either resolved to its function
// node or, when it cannot be resolved locally (ex: received via props), reduced
// to its name.
type CleanupCallee =
  | { kind: "function"; node: TSESTree.Node }
  | { kind: "name"; name: string };

type CleanupCallees = {
  functions: Set<TSESTree.Node>;
  names: Set<string>;
};

// #endregion

// #region Helpers

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("addEventListener", "removeEventListener"))(name)) {
    return name;
  }
  return "other";
}

/**
 * Resolve the callee of a call inside an effect cleanup to the function it refers to.
 * A bare call (`stop()`) resolves through the scope to the local function; a member call
 * (`handlers.stop()`) only counts when the receiver resolves to a local object literal
 * whose matching property is a function — an unresolvable member call says nothing about
 * a same-named local function. Falls back to the callee name when a bare call cannot be
 * resolved locally.
 * @param context The ESLint rule context
 * @param node The call expression to resolve
 * @returns The resolved function or the callee name, or null when neither applies
 */
function resolveCleanupCallee(context: RuleContext<MessageID, []>, node: TSESTree.CallExpression): CleanupCallee | null {
  const callee = Extract.unwrap(node.callee);
  switch (callee.type) {
    // stop()
    case AST.Identifier: {
      const variable = findVariable(context.sourceCode.getScope(node), callee);
      const defNode = variable?.defs.at(-1)?.node;
      const fn = defNode == null
        ? null
        : defNode.type === AST.FunctionDeclaration
        ? defNode
        : defNode.type === AST.VariableDeclarator && defNode.init != null
        ? Extract.unwrap(defNode.init)
        : null;
      return fn != null && Check.isFunction(fn)
        ? { kind: "function", node: fn }
        : { kind: "name", name: callee.name };
    }
    // handlers.stop()
    case AST.MemberExpression: {
      if (callee.computed) {
        return null;
      }
      const property = Extract.unwrap(callee.property);
      const object = Extract.unwrap(callee.object);
      if (property.type !== AST.Identifier || object.type !== AST.Identifier) {
        return null;
      }
      const variable = findVariable(context.sourceCode.getScope(node), object);
      const defNode = variable?.defs.at(-1)?.node;
      if (defNode?.type !== AST.VariableDeclarator || defNode.init == null) {
        return null;
      }
      const init = Extract.unwrap(defNode.init);
      if (init.type !== AST.ObjectExpression) {
        return null;
      }
      for (const prop of init.properties) {
        if (prop.type !== AST.Property || prop.computed) {
          continue;
        }
        const key = Extract.unwrap(prop.key);
        const keyName = key.type === AST.Identifier
          ? key.name
          : isString(key.value)
          ? key.value
          : null;
        if (keyName !== property.name) {
          continue;
        }
        const value = Extract.unwrap(prop.value);
        if (Check.isFunction(value)) {
          return { kind: "function", node: value };
        }
      }
      return null;
    }
    default:
      return null;
  }
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
      "expected-remove-event-listener-in-cleanup":
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
      "unexpected-inline-function": "A/an '{{eventMethodKind}}' should not have an inline listener function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
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
  // Functions called within each effect's cleanup, keyed by the effect call node.
  const cleanupCallees = new Map<TSESTree.Node, CleanupCallees>();
  // Whether the node references the global object. A bare call
  // (`addEventListener(...)` without a receiver) targets the global object per DOM
  // semantics, and `window`/`globalThis`/`self` alias that same global in the DOM.
  function isGlobalObject(node: TSESTree.Node) {
    return Check.isIdentifier(node)
      && (node.name === "window" || node.name === "globalThis" || node.name === "self");
  }
  function isSameObject(a: TSESTree.Node, b: TSESTree.Node) {
    switch (true) {
      case a.type === AST.MemberExpression
        && b.type === AST.MemberExpression:
        return Compare.isEqual(a.object, b.object);
      // A bare call pairs with an explicit call on the global object
      case a.type === AST.MemberExpression:
        return isGlobalObject(a.object);
      case b.type === AST.MemberExpression:
        return isGlobalObject(b.object);
      // Both sides are bare calls: both target the global object
      default:
        return true;
    }
  }
  function isInverseEntry(aEntry: AEntry, rEntry: REntry) {
    const { type: aType, callee: aCallee, capture: aCapture, effect: aEffect, listener: aListener, phase: aPhase } = aEntry;
    const { type: rType, callee: rCallee, capture: rCapture, effect: rEffect, listener: rListener, phase: rPhase } = rEntry;
    if (aPhase !== "setup") {
      return false;
    }
    if (!isSameObject(aCallee, rCallee) || !Compare.isEqual(aListener, rListener) || !isValueEqual(context, aType, rType) || aCapture !== rCapture) {
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
    if (enclosingFunction == null) {
      return false;
    }
    const callees = cleanupCallees.get(aEffect);
    if (callees == null) {
      return false;
    }
    if (callees.functions.has(enclosingFunction)) {
      return true;
    }
    const id = getFunctionId(enclosingFunction);
    return id != null && id.type === AST.Identifier && callees.names.has(id.name);
  }
  function visitInlineFunction(node: TSESTree.CallExpression, callKind: EventMethodKind, options: typeof defaultOptions) {
    const listener = node.arguments.at(1);
    if (!Check.isFunction(listener)) {
      return;
    }
    if (options.signal != null) {
      return;
    }
    context.report({
      data: { eventMethodKind: callKind },
      messageId: "unexpected-inline-function",
      node: listener,
    });
  }
  return {
    ["CallExpression"](node) {
      const fn = Traverse.findParent(node, isUseEffectCallback);
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
          const callee = resolveCleanupCallee(context, node);
          if (callee == null) {
            return;
          }
          const callees = getOrInsertComputed(cleanupCallees, effect, (): CleanupCallees => ({ functions: new Set(), names: new Set() }));
          if (callee.kind === "function") {
            callees.functions.add(callee.node);
          } else {
            callees.names.add(callee.name);
          }
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
          messageId: "expected-remove-event-listener-in-cleanup",
          node: aEntry.node,
        });
      }
    },
  };
}

// #endregion
