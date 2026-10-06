import { Check, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { not } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { isComponentOrHookLikeFunction } from "./helpers";

export type FunctionKind =
  | "component"
  | "callback"
  | "other";

/**
 * A call expression observed while traversing, with the innermost enclosing
 * function and component captured eagerly so inference never re-walks ancestors.
 */
export type CallFact = {
  componentFunction: TSESTreeFunction | null;
  enclosingFunction: TSESTreeFunction;
  enclosingFunctionKind: FunctionKind;
  node: TSESTree.CallExpression;
};

/**
 * A return statement that belongs directly to a component function body and is
 * not its last statement, so the statements after it are conditionally guarded
 * by the early return.
 */
export type EarlyReturnFact = {
  componentFunction: TSESTreeFunction;
  node: TSESTree.ReturnStatement;
};

export type SetStateInRenderFacts = {
  calls: CallFact[];
  earlyReturns: EarlyReturnFact[];
};

export function createFactCollector(context: RuleContext) {
  const { additionalStateHooks } = getSettingsFromContext(context);
  const facts: SetStateInRenderFacts = {
    calls: [],
    earlyReturns: [],
  };

  const functionEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  // Stack of enclosing component/hook functions; entering a nested component
  // pushes onto the stack and exiting pops it, restoring the outer component so
  // setState calls after a nested declaration are still attributed to it.
  const componentFnStack: TSESTreeFunction[] = [];

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function getFunctionKind(node: TSESTreeFunction): FunctionKind {
    if (isComponentOrHookLikeFunction(context, node)) {
      return "component";
    }
    const parent = Traverse.findParent(node, not(Check.isTypeExpression)) ?? node.parent;
    if (parent.type === AST.CallExpression && parent.callee !== node) {
      return "callback";
    }
    return "other";
  }

  const visitor: RuleListener = {
    ":function"(node: TSESTreeFunction) {
      const kind = getFunctionKind(node);
      functionEntries.push({ kind, node });
      if (kind === "component") {
        componentFnStack.push(node);
      }
    },
    ":function:exit"(node: TSESTreeFunction) {
      const entry = functionEntries.at(-1);
      if (entry?.kind === "component" && componentFnStack.at(-1) === node) {
        componentFnStack.pop();
      }
      functionEntries.pop();
    },
    CallExpression(node: TSESTree.CallExpression) {
      const entry = functionEntries.at(-1);
      if (entry == null) {
        return;
      }
      if (isUseStateCall(node)) {
        return;
      }
      facts.calls.push({
        componentFunction: componentFnStack.at(-1) ?? null,
        enclosingFunction: entry.node,
        enclosingFunctionKind: entry.kind,
        node,
      });
    },
    ReturnStatement(node: TSESTree.ReturnStatement) {
      const componentFn = componentFnStack.at(-1);
      if (componentFn == null) return;
      // Only track early returns that belong directly to the component function
      const entry = functionEntries.at(-1);
      if (entry == null || entry.node !== componentFn) return;
      if (componentFn.body.type !== AST.BlockStatement) return;
      const body = componentFn.body.body;
      // Walk up from the return statement to find the direct child statement of the function body
      let stmt: TSESTree.Node = node;
      while (stmt.parent !== componentFn.body) {
        if (stmt.parent == null) return;
        stmt = stmt.parent;
      }
      // tsl-ignore dx/no-unsafe-as
      const idx = body.indexOf(stmt as TSESTree.Statement);
      if (idx !== -1 && idx < body.length - 1) {
        facts.earlyReturns.push({ componentFunction: componentFn, node });
      }
    },
  };

  return { facts, visitor } as const;
}
