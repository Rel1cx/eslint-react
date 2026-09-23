import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolveOrigin } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Array methods that mutate the array in place.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
export const MUTATING_ARRAY_METHODS = new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift",
]);

/** Resolve a direct call target, following simple function aliases. */
export function resolveToFunction(context: RuleContext, node: TSESTree.Node, seen = new Set<TSESTree.Node>()): TSESTreeFunction | null {
  const expression = Extract.unwrap(node);
  if (Check.isFunction(expression)) return expression;
  if (!Check.isIdentifier(expression) || seen.has(expression)) return null;
  seen.add(expression);
  const resolved = resolveOrigin(context, expression);
  if (resolved == null) return null;
  return resolveToFunction(context, resolved, seen);
}
