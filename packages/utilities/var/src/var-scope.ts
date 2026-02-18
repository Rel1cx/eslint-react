import { dual, unit } from "@eslint-react/eff";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import { ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as astUtils from "@typescript-eslint/utils/ast-utils";

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

/**
 * Find a variable by name or identifier node in the scope chain
 * @param initialScope The scope to start searching from
 * @returns The found variable or unit if not found
 * @overload
 * @param nameOrNode The variable name or identifier node to find
 * @param initialScope The scope to start searching from
 * @returns The found variable or unit if not found
 */
export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier | unit) => Variable | unit;
  (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope): Variable | unit;
} = dual(2, (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope) => {
  if (nameOrNode == null) return unit;
  return astUtils.findVariable(initialScope, nameOrNode) ?? unit;
});

/**
 * Get all child scopes recursively from a given scope
 * @param scope The scope to get child scopes from
 * @returns Array of all child scopes including the input scope
 */
export function getChildScopes(scope: Scope): readonly Scope[] {
  const scopes = [scope];
  for (const childScope of scope.childScopes) {
    scopes.push(...getChildScopes(childScope));
  }
  return scopes;
}
