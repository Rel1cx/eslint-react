import type { Scope } from "@typescript-eslint/scope-manager";

export function getChildScopes(scope: Scope): readonly Scope[] {
  const scopes = [scope];
  for (const childScope of scope.childScopes) {
    scopes.push(...getChildScopes(childScope));
  }
  return scopes;
}
