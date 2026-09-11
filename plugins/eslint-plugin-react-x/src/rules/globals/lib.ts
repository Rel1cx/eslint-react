import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RichContext } from "@eslint-react/core";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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

/**
 * Collect every write target in an assignment, including destructuring
 * patterns such as `[local, globalValue] = source`.
 */
export function getAssignmentTargets(node: TSESTree.Node): (TSESTree.Identifier | TSESTree.MemberExpression)[] {
  const target = Extract.unwrap(node);
  switch (target.type) {
    case AST.Identifier:
    case AST.MemberExpression:
      return [target];
    case AST.ArrayPattern:
      return target.elements.flatMap((element) => element == null ? [] : getAssignmentTargets(element));
    case AST.AssignmentPattern:
      return getAssignmentTargets(target.left);
    case AST.ObjectPattern:
      return target.properties.flatMap((property) => {
        if (property.type === AST.RestElement) return getAssignmentTargets(property.argument);
        return getAssignmentTargets(property.value);
      });
    case AST.RestElement:
      return getAssignmentTargets(target.argument);
    default:
      return [];
  }
}

/** Resolve a direct call target, following simple function aliases. */
export function resolveToFunction(context: RichContext, node: TSESTree.Node, seen = new Set<TSESTree.Node>()): TSESTreeFunction | null {
  const expression = Extract.unwrap(node);
  if (Check.isFunction(expression)) return expression;
  if (!Check.isIdentifier(expression) || seen.has(expression)) return null;
  seen.add(expression);
  const resolved = resolve(context._, expression);
  if (resolved == null) return null;
  return resolveToFunction(context, resolved, seen);
}
