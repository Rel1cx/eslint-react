import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { type ComponentPhaseKind, ComponentPhaseRelevance, getPhaseKindOfFunction } from "../../types";
import { createRule } from "../../utils/create-rule";
import { findProperty, resolveToObjectExpression } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-fetch";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedAbortController"
  | "expectedAbortInCleanup";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type CallKind = "fetch" | "abort" | "other";

type FetchEntry = {
  controller: TSESTree.Node | null;
  isParamSignal: boolean;
  node: TSESTree.CallExpression;
  phase: ComponentPhaseKind;
};

type AbortEntry = {
  controller: TSESTree.Node;
  node: TSESTree.CallExpression;
  phase: ComponentPhaseKind;
};

// #endregion

// #region Helpers

function getCallKind(node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  switch (true) {
    case callee.type === AST.Identifier
      && callee.name === "fetch":
      return "fetch";
    case callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier
      && callee.property.name === "fetch":
      return "fetch";
    case callee.type === AST.Identifier
      && callee.name === "abort":
      return "abort";
    case callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier
      && callee.property.name === "abort":
      return "abort";
    default:
      return "other";
  }
}

function getControllerFromSignal(
  context: RuleContext,
  node: TSESTree.Node,
): { controller: TSESTree.Node | null; isParamSignal: boolean } {
  node = Extract.unwrap(node);
  switch (node.type) {
    case AST.MemberExpression:
      return { controller: node.object, isParamSignal: false };
    case AST.Identifier: {
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

function getFetchController(
  context: RuleContext,
  node: TSESTree.CallExpression,
): { controller: TSESTree.Node | null; isParamSignal: boolean } {
  const [, optionsArg] = node.arguments;
  if (optionsArg == null) return { controller: null, isParamSignal: false };

  const options = resolveToObjectExpression(context, optionsArg);
  if (options == null) return { controller: null, isParamSignal: false };

  const signalProp = findProperty(options.properties, "signal");
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
      description:
        "Enforces that every 'fetch' in a component or custom hook has a corresponding 'AbortController' abort in the cleanup function.",
    },
    messages: {
      expectedAbortController: "A 'fetch' must be provided with an 'AbortController' for proper cleanup.",
      expectedAbortInCleanup:
        "A 'fetch' started in effect must be aborted with 'AbortController.abort' in the cleanup function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `fetch` is not present in the file
  if (!context.sourceCode.text.includes("fetch")) return {};
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const fetchEntries: FetchEntry[] = [];
  const abortEntries: AbortEntry[] = [];
  return merge(
    {
      [":function"](node: TSESTreeFunction) {
        const kind = getPhaseKindOfFunction(node) ?? "other";
        fEntries.push({ kind, node });
      },
      [":function:exit"]() {
        fEntries.pop();
      },
      ["CallExpression"](node) {
        const fEntry = fEntries.at(-1);
        if (fEntry == null || !ComponentPhaseRelevance.has(fEntry.kind)) {
          return;
        }
        switch (getCallKind(node)) {
          case "fetch": {
            if (fEntry.kind !== "setup") return;
            const { controller, isParamSignal } = getFetchController(context, node);
            fetchEntries.push({
              controller,
              isParamSignal,
              node,
              phase: fEntry.kind,
            });
            break;
          }
          case "abort": {
            if (fEntry.kind !== "cleanup") return;
            const controller = getAbortController(node);
            if (controller == null) break;
            abortEntries.push({
              controller,
              node,
              phase: fEntry.kind,
            });
            break;
          }
        }
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
          const hasMatchingAbort = abortEntries.some((aEntry) =>
            isAssignmentTargetEqual(context, aEntry.controller, controller)
          );
          if (!hasMatchingAbort) {
            context.report({
              messageId: "expectedAbortInCleanup",
              node: fEntry.node,
            });
          }
        }
      },
    },
  );
}

// #endregion
