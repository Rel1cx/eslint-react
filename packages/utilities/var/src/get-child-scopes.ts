import type { Scope } from "@typescript-eslint/scope-manager";

export function getChidScopes(scope: Scope): readonly Scope[] {
  const scopes = [scope];
  for (const childScope of scope.childScopes) {
    scopes.push(...getChidScopes(childScope));
  }
  return scopes;
}
