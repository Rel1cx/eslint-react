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

/**
 * Create a collector that gathers the raw facts needed to infer unconditional
 * setState calls during render: observed call expressions with their enclosing
 * function and component context, and the early returns that guard the
 * statements after them
 * @param context The rule context
 * @returns The collected facts and the visitor that fills them
 */
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
    return node.type === AST.CallExpression && core.isUseStateLikeCall(node, additionalStateHooks);
  }

  /**
   * Classify a function by its role in the render phase
   * @param node The function node to classify
   * @returns The function kind
   */
  function getFunctionKind(node: TSESTreeFunction): FunctionKind {
    // Component and hook bodies run during render
    if (isComponentOrHookLikeFunction(context, node)) {
      return "component";
    }
    const parent = Traverse.findParent(node, not(Check.isTypeExpression)) ?? node.parent;
    // A function passed as an argument is treated as a callback that runs
    // outside of the synchronous render (event handlers, effect setups, etc.)
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
      // A call outside any function (ex: module scope) has no render context
      if (entry == null) return;
      // A `useState` call declares the setter; it is not a setState usage
      if (isUseStateCall(node)) return;
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
      if (entry == null) return;
      if (entry.node !== componentFn) return;
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
      // Only a non-last return leaves following statements guarded by it
      const isEarlyReturn = idx !== -1 && idx < body.length - 1;
      if (isEarlyReturn) {
        facts.earlyReturns.push({ componentFunction: componentFn, node });
      }
    },
  };

  return { facts, visitor } as const;
}
