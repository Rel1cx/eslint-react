import { createRule } from "@/utils/create-rule";
import { Check, Extract, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveOrigin } from "@eslint-react/var";
import { or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";
import { isGlobalObject, isNameBoundInEnclosingScopes, resolveToObjectExpression } from "./lib";

export const RULE_NAME = "no-leaked-fetch";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "expected-abort-controller"
  | "expected-abort-in-cleanup";

/** A call expression relevant to this rule: a `fetch` call, an `abort` call, or neither. */
type CallKind = "fetch" | "abort" | "other";

/** The AbortController recovered from a fetch's `signal` option, plus whether the signal is a caller-managed parameter. */
type FetchController = {
  controller: TSESTree.Node | null;
  isParamSignal: boolean;
};

/** A `fetch` call recorded in an effect setup, with the controller recovered from its options. */
type FetchEntry = FetchController & {
  node: TSESTree.CallExpression;
};

/** An `abort` call recorded in an effect cleanup, with the controller it is invoked on. */
type AbortEntry = {
  controller: TSESTree.Node;
  node: TSESTree.CallExpression;
};

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'fetch' in a component or custom hook has a corresponding 'AbortController' abort in the cleanup function.",
    },
    messages: {
      "expected-abort-controller": "A 'fetch' must be provided with an 'AbortController' for proper cleanup.",
      "expected-abort-in-cleanup": "A 'fetch' started in effect must be aborted with 'AbortController.abort' in the cleanup function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `fetch` is not present in the file
  if (!context.sourceCode.text.includes("fetch")) {
    return {};
  }
  // Fast path: skip if no effect-like hook is present in the file
  if (!/use\w*Effect/u.test(context.sourceCode.text)) {
    return {};
  }

  const fetchEntries: FetchEntry[] = [];
  const abortEntries: AbortEntry[] = [];
  return {
    CallExpression(node) {
      match(getCallKind(node))
        .with("fetch", () => {
          // Only consider the innermost function: a `fetch` inside a nested non-effect function
          // (e.g. an event handler) is not managed by the effect's lifecycle
          const fn = Traverse.findParent(node, Check.isFunction);
          if (fn == null || !isUseEffectSetupCallback(fn)) {
            return;
          }
          const { controller, isParamSignal } = getFetchController(context, node);
          fetchEntries.push({
            controller,
            isParamSignal,
            node,
          });
        })
        .with("abort", () => {
          // An `abort` may be nested in a callback within the cleanup function
          // (e.g. `setTimeout(() => ctrl.abort())`), so find the nearest enclosing
          // setup/cleanup function instead of requiring the innermost one
          const fn = Traverse.findParent(node, isUseEffectCallback);
          if (fn == null || !isUseEffectCleanupCallback(fn)) {
            return;
          }
          const controller = getAbortController(node);
          if (controller == null) {
            return;
          }
          abortEntries.push({
            controller,
            node,
          });
        })
        .otherwise(() => null);
    },
    "Program:exit"() {
      for (const fEntry of fetchEntries) {
        const controller = fEntry.controller;
        if (controller == null) {
          context.report({
            messageId: "expected-abort-controller",
            node: fEntry.node,
          });
          continue;
        }
        // If the signal comes from a function parameter (e.g. use-abortable-effect), assume the caller manages the abort lifecycle.
        if (fEntry.isParamSignal) {
          continue;
        }
        if (!abortEntries.some((aEntry) => isAssignmentTargetEqual(context, aEntry.controller, controller))) {
          context.report({
            messageId: "expected-abort-in-cleanup",
            node: fEntry.node,
          });
        }
      }
    },
  };
}

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

/**
 * Classify a call expression as a `fetch` call, an `abort` call, or neither
 * @param node The CallExpression node to classify
 * @returns The CallKind of the call expression
 */
function getCallKind(node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  switch (true) {
    // A bare `fetch(...)` is the global fetch only when no enclosing scope binds that name
    // (e.g. a local `function fetch() {}` shadows it)
    case Check.isIdentifier(callee, "fetch") && !isNameBoundInEnclosingScopes("fetch", node):
      return "fetch";
    // A member access is the global fetch only on a known global object (e.g. `window.fetch(...)`)
    case callee.type === AST.MemberExpression
      && !callee.computed
      && Check.isIdentifier(callee.property, "fetch")
      && isGlobalObject(Extract.unwrap(callee.object)):
      return "fetch";
    case Extract.getCalleeName(node) === "abort":
      return "abort";
    default:
      return "other";
  }
}

/**
 * Extract the AbortController from a `fetch` call's options argument
 * @param context The rule context object
 * @param node The `fetch` CallExpression node
 * @returns The recovered controller and whether the signal is a caller-managed parameter
 */
function getFetchController(context: RuleContext, node: TSESTree.CallExpression): FetchController {
  const [, optionsArg] = node.arguments;
  if (optionsArg == null) return { controller: null, isParamSignal: false };

  const options = resolveToObjectExpression(context, optionsArg);
  if (options == null) return { controller: null, isParamSignal: false };

  const signalProp = findSignalProperty(options.properties);
  if (signalProp?.type !== AST.Property) return { controller: null, isParamSignal: false };

  return getControllerFromSignal(context, signalProp.value);
}

/**
 * Resolve the expression assigned to a `signal` option back to the AbortController it belongs to
 * @param context The rule context object
 * @param node The `signal` value expression to resolve
 * @param seen The already visited identifiers, guarding against alias cycles
 * @returns The recovered controller and whether the signal is a caller-managed parameter
 */
function getControllerFromSignal(context: RuleContext, node: TSESTree.Node, seen: Set<TSESTree.Node> = new Set()): FetchController {
  node = Extract.unwrap(node);
  switch (node.type) {
    case AST.MemberExpression:
      return { controller: node.object, isParamSignal: false };
    case AST.Identifier: {
      // Guard against alias cycles (e.g. `let a = b; let b = a;`) causing infinite recursion
      if (seen.has(node)) {
        return { controller: null, isParamSignal: false };
      }
      seen.add(node);
      const resolved = resolveOrigin(context, node);
      const resolvedUnwrapped = resolved == null ? null : Extract.unwrap(resolved);
      if (resolvedUnwrapped?.type === AST.MemberExpression) {
        return { controller: resolvedUnwrapped.object, isParamSignal: false };
      }
      // If the identifier is a function parameter, treat it as a valid signal expression (e.g. `signal` from foxact/use-abortable-effect).
      if (resolved != null && Check.isFunction(resolved)) {
        return { controller: node, isParamSignal: true };
      }
      // Recurse through alias chains (e.g. `const s = ctrl.signal; const signal = s;`)
      if (resolvedUnwrapped != null) {
        return getControllerFromSignal(context, resolvedUnwrapped, seen);
      }
      return { controller: null, isParamSignal: false };
    }
    default:
      return { controller: null, isParamSignal: false };
  }
}

/**
 * Find the `signal` property in a fetch options object, looking through inline spread object literals
 * @param properties The object literal properties to search
 * @returns The `signal` property, or `null` when no statically named `signal` key is present
 */
function findSignalProperty(properties: TSESTree.ObjectLiteralElement[]): TSESTree.Property | null {
  for (const property of properties) {
    if (property.type === AST.Property) {
      const key = Extract.unwrap(property.key);
      const name = !property.computed && Check.isIdentifier(key)
        ? key.name
        : key.type === AST.Literal && typeof key.value === "string"
        ? key.value
        : key.type === AST.TemplateLiteral && key.expressions.length === 0
        ? key.quasis[0]?.value.cooked ?? key.quasis[0]?.value.raw ?? null
        : null;
      if (name === "signal") return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findSignalProperty(property.argument.properties);
      if (found != null) return found;
    }
  }
  return null;
}

/**
 * Get the object an `abort(...)` call is invoked on
 * @param node The `abort` CallExpression node
 * @returns The receiver node, or `null` when the callee is not a member access
 */
function getAbortController(node: TSESTree.CallExpression): TSESTree.Node | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type === AST.MemberExpression) {
    return callee.object;
  }
  return null;
}
