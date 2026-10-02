import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { UseMemoFacts } from "./collect";
import { isOuterVariable } from "./origins";

export type UseMemoViolation =
  | { kind: "must-return-a-value"; node: TSESTree.CallExpressionArgument }
  | { kind: "no-async-or-generator-functions"; node: TSESTree.Node }
  | { kind: "no-parameters"; node: TSESTree.Node }
  | { kind: "no-reassigning-outer-variables"; node: TSESTree.Identifier }
  | { kind: "result-must-be-used"; node: TSESTree.CallExpression };

/**
 * Infer the `useMemo` usage violations from the collected facts: unused
 * results, callbacks with parameters, async or generator callbacks, outer
 * variable reassignments, and callbacks that never return a value.
 * @param context The rule context
 * @param facts The collected facts
 * @returns The violations to report, in report order
 */
export function inferViolations(context: RuleContext, facts: UseMemoFacts): UseMemoViolation[] {
  const violations: UseMemoViolation[] = [];
  for (const fact of facts.calls) {
    // Result must be used (not discarded)
    if (!fact.isResultUsed) {
      violations.push({
        kind: "result-must-be-used",
        node: fact.node,
      });
      continue;
    }

    const { callback, callbackArg } = fact;
    if (callbackArg == null || callback == null) continue;

    // No Parameters — useMemo callbacks must not accept parameters
    if (callback.params.length > 0) {
      const firstParam = callback.params[0];
      if (firstParam == null) continue;
      violations.push({
        kind: "no-parameters",
        node: Check.isIdentifier(firstParam) ? firstParam : callback,
      });
    }

    // No Async or Generator Functions — must synchronously return a value
    if (callback.async || callback.generator) {
      violations.push({
        kind: "no-async-or-generator-functions",
        node: callback,
      });
    }

    // No Reassigning Outer Variables — must be pure
    for (const write of fact.writes) {
      if (!isOuterVariable(context, write.target, callback)) continue;
      violations.push({
        kind: "no-reassigning-outer-variables",
        node: write.target,
      });
    }

    // Must Return a Value — useMemo is for computing values, not side effects
    // Arrow functions with concise body always return a value
    if (callback.type === AST.ArrowFunctionExpression && callback.body.type !== AST.BlockStatement) {
      continue;
    }
    if (callback.body.type !== AST.BlockStatement) continue;
    const hasValueReturn = fact.returnStatements.some((stmt) => stmt.argument != null);
    if (!hasValueReturn) {
      violations.push({
        kind: "must-return-a-value",
        node: callbackArg,
      });
    }
  }
  return violations;
}
