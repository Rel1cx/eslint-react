import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { getOrInsertComputed } from "@local/eff";
import type { TSESTree } from "@typescript-eslint/types";
import type { SetStateInRenderFacts } from "./collect";
import { isInsideConditional } from "./helpers";
import { createSetStateResolver } from "./origins";

export type SetStateViolation = {
  name: string;
  node: TSESTree.CallExpression;
};

/**
 * Infer the setState calls that run unconditionally during render from the
 * collected facts: calls made directly in a component function body that are
 * neither guarded by a conditional nor positioned after an early return.
 * @param context The rule context
 * @param facts The collected facts
 * @returns The violations to report, in report order
 */
export function inferViolations(context: RuleContext, facts: SetStateInRenderFacts): SetStateViolation[] {
  const resolver = createSetStateResolver(context);
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  const earlyReturnPositions = new Map<TSESTreeFunction, number[]>();
  for (const { componentFunction, node } of facts.earlyReturns) {
    getOrInsertComputed(earlyReturnPositions, componentFunction, () => []).push(node.range[0]);
  }

  const violations: SetStateViolation[] = [];
  for (const { componentFunction, enclosingFunction, node } of facts.calls) {
    if (componentFunction == null) continue;
    // Allow setState inside nested functions (event handlers, callbacks, etc.)
    if (enclosingFunction !== componentFunction) continue;
    if (!resolver.isSetStateCall(node)) continue;
    // Allow setState inside conditional blocks
    if (isInsideConditional(node, componentFunction)) continue;
    // Allow setState after an early return (it is conditionally guarded by the early return)
    if (earlyReturnPositions.get(componentFunction)?.some((pos) => pos < node.range[0]) === true) continue;
    violations.push({
      name: getText(Extract.unwrap(node.callee)),
      node,
    });
  }
  return violations;
}
