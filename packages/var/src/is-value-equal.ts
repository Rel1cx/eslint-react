import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { isEqualWith } from "./value-equality";

/**
 * Check if two nodes have equal values.
 *
 * Identifiers are compared by variable identity through the scope manager:
 * identical names in different scopes are different values, and two distinct
 * variables holding the same literal are not equal.
 *
 * This function does not apply provenance heuristics. Use
 * {@link isProvenanceEqual} when bindings that share provenance (for example
 * callback parameters or loop variables over the same source) should also be
 * treated as equal.
 *
 * @param context The ESLint rule context.
 * @param a The first node to compare.
 * @param b The second node to compare.
 * @returns `true` if the two nodes have equal values.
 */
export function isValueEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node): boolean {
  return isEqualWith(context, a, b, { identifierComparison: "identity" });
}
