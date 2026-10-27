import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { getFunctionId, isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext } from "@eslint-react/eslint";
import { isProvenanceEqual, resolve, resolveOrigin } from "@eslint-react/var";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching, match } from "ts-pattern";

// #region Types

export type EventPhase = "cleanup" | "setup";

export type EventMethodKind = "addEventListener" | "removeEventListener";

// A listener registration or removal collected from an effect callback.
export type EventEntry = {
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: boolean;
  effect: TSESTree.Node | null;
  listener: TSESTree.Node;
  node: TSESTree.CallExpression;
  phase: EventPhase;
};

export type ListenerOptions = {
  capture: boolean;
  signal: TSESTree.Node | null;
};

// #endregion

// #region Effect Context

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

/**
 * Get the phase and effect call node a node inside an effect callback belongs to.
 * @param node The node to inspect.
 * @returns The phase and effect call node, or null when the node is not inside an effect callback.
 */
export function getEffectContext(node: TSESTree.CallExpression): { effect: TSESTree.Node | null; phase: EventPhase } | null {
  const fn = Traverse.findParent(node, isUseEffectCallback);
  if (fn == null) {
    return null;
  }
  const phase = isUseEffectSetupCallback(fn) ? "setup" : "cleanup";
  const setupFn = phase === "setup" ? fn : Traverse.findParent(fn, Check.isFunction);
  const effect = setupFn == null ? null : Extract.unwrap(setupFn).parent ?? null;
  return { effect, phase };
}

// #endregion

// #region Call Classification

/**
 * Classify a call expression by its callee name.
 * @param node The call expression to inspect.
 * @returns The event listener method name, or `"other"` when the callee is not one.
 */
export function getCallKind(node: TSESTree.CallExpression): EventMethodKind | "other" {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("addEventListener", "removeEventListener"))(name)) {
    return name;
  }
  return "other";
}

// #endregion

// #region Cleanup Callees

/**
 * Resolve a call inside an effect cleanup to the function it refers to.
 * Bare calls fall back to the callee name; member calls resolve only through a local object literal.
 * @param context The ESLint rule context.
 * @param node The call expression to resolve.
 * @returns The resolved function or callee name, or null when unresolved.
 */
export function resolveCleanupCallee(
  context: RuleContext,
  node: TSESTree.CallExpression,
): { kind: "function"; node: TSESTree.Node } | { kind: "name"; name: string } | null {
  const callee = Extract.unwrap(node.callee);
  // stop()
  if (callee.type === AST.Identifier) {
    const resolved = resolve(context, callee, { at: -1 });
    const fn = resolved == null ? null : Extract.unwrap(resolved);
    return fn != null && Check.isFunction(fn)
      ? { kind: "function", node: fn }
      : { kind: "name", name: callee.name };
  }
  // handlers.stop()
  if (callee.type !== AST.MemberExpression || callee.computed) {
    return null;
  }
  const object = Extract.unwrap(callee.object);
  const property = Extract.unwrap(callee.property);
  if (object.type !== AST.Identifier || property.type !== AST.Identifier) {
    return null;
  }
  const init = resolve(context, object, { at: -1 });
  const objectExpression = init == null ? null : Extract.unwrap(init);
  if (objectExpression?.type !== AST.ObjectExpression) {
    return null;
  }
  for (const prop of objectExpression.properties) {
    if (prop.type !== AST.Property || prop.computed || Extract.getPropertyName(prop, "max") !== property.name) {
      continue;
    }
    const value = Extract.unwrap(prop.value);
    if (Check.isFunction(value)) {
      return { kind: "function", node: value };
    }
  }
  return null;
}

// #endregion

// #region Listener Calls

export const defaultListenerOptions: ListenerOptions = {
  capture: false,
  signal: null,
};

// Whether the identifier is bound by destructuring a `signal` property, e.g.
// `signal` in `const { signal } = ...` or `sig` in `const { signal: sig } = ...`.
function isSignalPropertyBinding(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
  const defNode = variable?.defs.at(-1)?.node;
  if (defNode?.type !== AST.VariableDeclarator || defNode.id.type !== AST.ObjectPattern) {
    return false;
  }
  for (const prop of defNode.id.properties) {
    if (prop.type !== AST.Property || prop.computed) {
      continue;
    }
    const key = Extract.unwrap(prop.key);
    if (key.type !== AST.Identifier || key.name !== "signal") {
      continue;
    }
    const value = Extract.unwrap(prop.value);
    return value.type === AST.Identifier && value.name === node.name;
  }
  return false;
}

export function getSignalValueExpression(context: RuleContext, node: TSESTree.Node | null, seen: Set<TSESTree.Node> = new Set()): TSESTree.Node | null {
  if (node == null) return null;
  // Guard against alias cycles (e.g. `const a = b; const b = a;`) causing
  // infinite recursion.
  if (seen.has(node)) return null;
  seen.add(node);
  switch (node.type) {
    case AST.Identifier: {
      const resolved = resolveOrigin(context, node);
      const unwrapped = resolved == null ? null : Extract.unwrap(resolved);
      // If the identifier is a function parameter (resolveOrigin returns the containing function),
      // treat it as a valid signal expression (e.g. `signal` from foxact/use-abortable-effect).
      if (unwrapped != null && Check.isFunction(unwrapped)) {
        return node;
      }
      // A `signal` destructured from `new AbortController()` is a valid signal expression
      // (e.g. `const { signal, abort } = new AbortController()`).
      if (unwrapped != null && unwrapped.type === AST.NewExpression && isSignalPropertyBinding(context, node)) {
        const newCallee = Extract.unwrap(unwrapped.callee);
        if (newCallee.type === AST.Identifier && newCallee.name === "AbortController") {
          return node;
        }
      }
      return getSignalValueExpression(context, unwrapped, seen);
    }
    case AST.MemberExpression:
      return node;
    default:
      return null;
  }
}

export function getListenerOptions(context: RuleContext, node: TSESTree.CallExpressionArgument): ListenerOptions {
  function visit(node: TSESTree.Node): ListenerOptions {
    switch (node.type) {
      case AST.Identifier: {
        const initNode = resolve(context, node);
        if (initNode?.type === AST.ObjectExpression) {
          return visit(initNode);
        }
        return defaultListenerOptions;
      }
      case AST.Literal: {
        return { ...defaultListenerOptions, capture: Boolean(node.value) };
      }
      case AST.ObjectExpression: {
        const pCapture = Extract.findProperty(node.properties, "capture");
        const vCapture = match(pCapture)
          .with(P.nullish, () => false)
          .with({ type: AST.Property }, (prop) => {
            const value = prop.value;
            switch (value.type) {
              case AST.Literal:
                return Boolean(value.value);
              default:
                return Boolean(getStaticValue(value, context.sourceCode.getScope(node))?.value);
            }
          })
          .otherwise(() => false);
        const pSignal = Extract.findProperty(node.properties, "signal");
        const vSignal = pSignal?.type === AST.Property
          ? getSignalValueExpression(context, pSignal.value)
          : null;
        return { capture: vCapture, signal: vSignal };
      }
      default: {
        return defaultListenerOptions;
      }
    }
  }
  return visit(node);
}

/**
 * Get the event type, listener, and options of an `addEventListener`/`removeEventListener` call.
 * @param context The ESLint rule context.
 * @param node The call expression to inspect.
 * @returns The call arguments, or null when the event type or listener is missing.
 */
export function getListenerArguments(context: RuleContext, node: TSESTree.CallExpression) {
  const [type, listener, options] = node.arguments;
  if (type == null || listener == null) {
    return null;
  }
  return {
    type,
    listener,
    options: options == null ? defaultListenerOptions : getListenerOptions(context, options),
  };
}

// #endregion

// #region Entry Matching

// Whether the node references the global object. A bare call
// (`addEventListener(...)` without a receiver) targets the global object per DOM
// semantics, and `window`/`globalThis`/`self` alias that same global in the DOM.
function isGlobalObject(node: TSESTree.Node) {
  return Check.isIdentifier(node) && (node.name === "window" || node.name === "globalThis" || node.name === "self");
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

/**
 * Check whether a `removeEventListener` entry tears down the listener registered by an `addEventListener` entry.
 * @param context The ESLint rule context.
 * @param aEntry The `addEventListener` entry.
 * @param rEntry The `removeEventListener` entry to compare.
 * @param cleanupCalleeEntries Functions called from each effect cleanup, keyed by the effect call node.
 * @returns `true` if the removal is the inverse of the registration.
 */
export function isInverseEntry(
  context: RuleContext,
  aEntry: EventEntry,
  rEntry: EventEntry,
  cleanupCalleeEntries: Map<TSESTree.Node, [Set<TSESTree.Node>, Set<string>]>,
): boolean {
  const { type: aType, callee: aCallee, capture: aCapture, effect: aEffect, listener: aListener, phase: aPhase } = aEntry;
  const { type: rType, callee: rCallee, capture: rCapture, effect: rEffect, listener: rListener, phase: rPhase } = rEntry;
  if (aPhase !== "setup") {
    return false;
  }
  if (!isSameObject(aCallee, rCallee) || !Compare.isEqual(aListener, rListener) || !isProvenanceEqual(context, aType, rType) || aCapture !== rCapture) {
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
  const callees = cleanupCalleeEntries.get(aEffect);
  if (callees == null) {
    return false;
  }
  const [functions, names] = callees;
  if (functions.has(enclosingFunction)) {
    return true;
  }
  const id = getFunctionId(enclosingFunction);
  return id != null && id.type === AST.Identifier && names.has(id.name);
}

// #endregion
