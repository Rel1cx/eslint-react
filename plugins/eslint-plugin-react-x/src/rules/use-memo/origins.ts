import type { TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";

function isDeclaredInsideCallback(variable: Scope.Variable, callback: TSESTreeFunction): boolean {
  let scope: Scope.Scope | null = variable.scope;
  while (scope != null) {
    if (scope.block === callback) return true;
    scope = scope.upper;
  }
  return false;
}

/**
 * Resolve whether an identifier written inside a `useMemo` callback refers to a
 * variable declared outside the callback. Unresolved identifiers and variables
 * without definitions are treated as outer variables.
 * @param context The rule context
 * @param target The written identifier
 * @param callback The `useMemo` callback the write occurs in
 * @returns `true` when the write reassigns an outer variable
 */
export function isOuterVariable(context: RuleContext, target: TSESTree.Identifier, callback: TSESTreeFunction): boolean {
  const scope = context.sourceCode.getScope(target);
  const variable = findVariable(scope, target);
  if (variable == null || variable.defs.length === 0) return true;
  return !isDeclaredInsideCallback(variable, callback);
}
