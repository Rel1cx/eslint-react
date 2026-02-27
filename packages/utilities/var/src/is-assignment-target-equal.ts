import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { isValueEqual } from "./is-value-equal";

/**
 * Check if two assignment targets are equal
 * Compares nodes directly or by their values
 * @param context The rule context
 * @param a The first node to compare
 * @param b The second node to compare
 * @returns True if the assignment targets are equal
 * @internal
 */
export function isAssignmentTargetEqual(
  context: RuleContext,
  a: TSESTree.Node,
  b: TSESTree.Node,
) {
  return ast.isNodeEqual(a, b) || isValueEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
