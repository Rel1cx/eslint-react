import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, isMatching, match } from "ts-pattern";
import { resolveToObjectExpression } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-fetch";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedAbortController"
  | "expectedAbortInCleanup";

// #endregion

// #region Types

type FunctionKind = "cleanup" | "setup" | "other";
type CallKind = "fetch" | "abort" | "other";

type FetchEntry = {
  controller: TSESTree.Node | null;
  isParamSignal: boolean;
  node: TSESTree.CallExpression;
};

type AbortEntry = {
  controller: TSESTree.Node;
  node: TSESTree.CallExpression;
};

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("fetch", "abort"))(name)) {
    return name;
  }
  return "other";
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  if (isUseEffectSetupCallback(node)) return "setup";
  if (isUseEffectCleanupCallback(node)) return "cleanup";
  return "other";
}

function getControllerFromSignal(context: RuleContext, node: TSESTree.Node): { controller: TSESTree.Node | null; isParamSignal: boolean } {
  node = Extract.unwrap(node);
  switch (node.type) {
    case AST.MemberExpression:
      return { controller: node.object, isParamSignal: false };
    case AST.Identifier: {
      // FIXME: alias chains are not resolved recursively (e.g. `const s = ctrl.signal; const signal = s;`
      // resolves to an Identifier and returns `controller: null`, causing a false positive). Recurse
      // like `getSignalValueExpression` in no-leaked-event-listener/lib.ts.
      const resolved = resolve(context, node);
      const resolvedUnwrapped = resolved == null ? null : Extract.unwrap(resolved);
      if (resolvedUnwrapped?.type === AST.MemberExpression) {
        return { controller: resolvedUnwrapped.object, isParamSignal: false };
      }
      // If the identifier is a function parameter, treat it as a valid signal expression
      // (e.g. `signal` from foxact/use-abortable-effect).
      if (resolved != null && Check.isFunction(resolved)) {
        return { controller: node, isParamSignal: true };
      }
      return { controller: null, isParamSignal: false };
    }
    default:
      return { controller: null, isParamSignal: false };
  }
}

function getFetchController(context: RuleContext, node: TSESTree.CallExpression): { controller: TSESTree.Node | null; isParamSignal: boolean } {
  const [, optionsArg] = node.arguments;
  if (optionsArg == null) return { controller: null, isParamSignal: false };

  const options = resolveToObjectExpression(context, optionsArg);
  if (options == null) return { controller: null, isParamSignal: false };

  const signalProp = Extract.findProperty(options.properties, "signal");
  if (signalProp?.type !== AST.Property) return { controller: null, isParamSignal: false };

  return getControllerFromSignal(context, signalProp.value);
}

function getAbortController(node: TSESTree.CallExpression): TSESTree.Node | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type === AST.MemberExpression) {
    return callee.object;
  }
  return null;
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'fetch' in a component or custom hook has a corresponding 'AbortController' abort in the cleanup function.",
    },
    messages: {
      expectedAbortController: "A 'fetch' must be provided with an 'AbortController' for proper cleanup.",
      expectedAbortInCleanup: "A 'fetch' started in effect must be aborted with 'AbortController.abort' in the cleanup function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `fetch` is not present in the file
  if (!context.sourceCode.text.includes("fetch")) {
    return {};
  }
  if (!/use\w*Effect/u.test(context.sourceCode.text)) {
    return {};
  }

  const fEntries: FunctionKind[] = [];
  const fetchEntries: FetchEntry[] = [];
  const abortEntries: AbortEntry[] = [];
  return {
    [":function"](node: TSESTreeFunction) {
      fEntries.push(getFunctionKind(node));
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    ["CallExpression"](node) {
      match(getCallKind(node))
        .with("fetch", () => {
          // Only consider the innermost function: a `fetch` inside a nested non-effect function
          // (e.g. an event handler) is not managed by the effect's lifecycle
          if (fEntries.at(-1) !== "setup") {
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
          if (fEntries.findLast((kind) => kind !== "other") !== "cleanup") {
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
    ["Program:exit"]() {
      for (const fEntry of fetchEntries) {
        const controller = fEntry.controller;
        if (controller == null) {
          context.report({
            messageId: "expectedAbortController",
            node: fEntry.node,
          });
          continue;
        }
        // If the signal comes from a function parameter (e.g. use-abortable-effect),
        // assume the caller manages the abort lifecycle.
        if (fEntry.isParamSignal) {
          continue;
        }
        if (!abortEntries.some((aEntry) => isAssignmentTargetEqual(context, aEntry.controller, controller))) {
          context.report({
            messageId: "expectedAbortInCleanup",
            node: fEntry.node,
          });
        }
      }
    },
  };
}

// #endregion
