import { dual, unit } from "@eslint-react/eff";
import type { Scope, Variable } from "@typescript-eslint/scope-manager";
import { ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import * as ASTUtils from "@typescript-eslint/utils/ast-utils";

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

export const findVariable: {
  (initialScope: Scope): (nameOrNode: string | TSESTree.Identifier | unit) => Variable | unit;
  (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope): Variable | unit;
} = dual(2, (nameOrNode: string | TSESTree.Identifier | unit, initialScope: Scope) => {
  if (nameOrNode == null) return unit;
  return ASTUtils.findVariable(initialScope, nameOrNode) ?? unit;
});
