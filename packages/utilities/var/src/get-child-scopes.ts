import type { Scope } from "@typescript-eslint/scope-manager";

export function getChidScopes(scope: Scope, prev: readonly Scope[] = []): readonly Scope[] {
  return [scope, ...scope.childScopes.reduce((acc, prev) => getChidScopes(prev, [...acc, prev] as const), prev)];
}
