import { Check, Compare, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { isValueEqual } from "./is-value-equal";

/**
 * Check if two assignment targets are equal, either directly or by their values.
 * @param context The ESLint rule context.
 * @param a The first node to compare.
 * @param b The second node to compare.
 * @returns `true` if the assignment targets are equal.
 * @internal
 */
export function isAssignmentTargetEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node) {
  const unwrappedA = Check.isTypeExpression(a) ? Extract.unwrap(a) : a;
  const unwrappedB = Check.isTypeExpression(b) ? Extract.unwrap(b) : b;
  // Same-name identifiers in different scopes are different variables,
  // so they must be compared by scope-aware value equality, not by name.
  if (Check.isIdentifier(unwrappedA) && Check.isIdentifier(unwrappedB)) {
    return isValueEqual(context, unwrappedA, unwrappedB);
  }
  return Compare.isEqual(unwrappedA, unwrappedB) || isValueEqual(context, unwrappedA, unwrappedB);
}
