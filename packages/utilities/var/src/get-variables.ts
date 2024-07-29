import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import { ScopeType } from "@typescript-eslint/scope-manager";

/**
 * Get all variables from the given scope up to the global scope
 * @param initialScope The scope to start from
 * @returns All variables from the given scope up to the global scope
 */
export function getVariables(initialScope: Scope): Variable[] {
  let scope = initialScope;
  const variables = [...scope.variables];
  while (scope.type !== ScopeType.global) {
    scope = scope.upper;
    variables.push(...scope.variables);
  }
  return variables.reverse();
}
