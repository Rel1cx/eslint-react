import type { Scope } from "@typescript-eslint/scope-manager";

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
