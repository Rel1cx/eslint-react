import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { isEqualWith } from "./value-equality";

/**
 * Check if two nodes refer to the same value or share provenance.
 *
 * This extends {@link isValueEqual} with two rules for identifiers:
 *
 * - Parameters at the same position of callbacks passed to structurally equal
 *   callees are equal (e.g. `xs.forEach((a) => ...)` and `xs.forEach((b) => ...)`).
 * - Variables bound by different `for-of` statements iterating over the same
 *   source are equal (e.g. `for (const event of xs)` and `for (const evt of xs)`).
 *   Variables from the same `for-of` statement remain distinct.
 *
 * Use this to match a value at its use site against the site that tears it
 * down (event listeners, timers, observers, and similar resources).
 *
 * @param context The ESLint rule context.
 * @param a The first node to compare.
 * @param b The second node to compare.
 * @returns `true` if the two nodes refer to the same value or share provenance.
 */
export function isProvenanceEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node): boolean {
  return isEqualWith(context, a, b, { identifierComparison: "provenance" });
}
