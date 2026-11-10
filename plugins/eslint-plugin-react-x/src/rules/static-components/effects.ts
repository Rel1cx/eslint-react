import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { ComponentUsageFact } from "./collect";
import type { IsInsideRender } from "./helpers";
import { resolveDynamicComponentOrigin, resolveDynamicMemberOrigin } from "./origins";

export type CreatedComponentViolation = {
  name: string;
  creationNode: TSESTree.Node;
  node: TSESTree.JSXIdentifier | TSESTree.JSXMemberExpression;
};

/**
 * Turn collected JSX component usages into violations: a usage is a violation when the
 * binding it refers to is declared inside a component's render body and its value is
 * dynamically created, i.e. the component is recreated on every render.
 * @param context The rule context
 * @param componentUsages The collected JSX component usages
 * @param isInsideRender The predicate telling whether a node lies within a component's render body
 * @returns The violations to report, in report order
 */
export function inferViolations(
  context: RuleContext,
  componentUsages: readonly ComponentUsageFact[],
  isInsideRender: IsInsideRender,
): CreatedComponentViolation[] {
  const violations: CreatedComponentViolation[] = [];

  for (const usage of componentUsages) {
    const variable = findVariable(context.sourceCode.getScope(usage.node), usage.name);
    // Unresolvable bindings (ex: globals) cannot be traced to a creation site
    if (variable == null) continue;

    // At least one declaration of the component's value must live inside a component's render body for it to be a candidate for "created during render".
    if (!variable.defs.some((def) => isInsideRender(def.node))) continue;

    // A member tag (`<Ns.Bar />`) resolves the root binding down its property
    // path; a plain identifier tag resolves the binding directly
    const { creationNode, isDynamic } = usage.path.length === 0
      ? resolveDynamicComponentOrigin(context, variable, isInsideRender)
      : resolveDynamicMemberOrigin(context, variable, usage.path, isInsideRender);
    // Static values (ex: a reference to an outer-scope component) are allowed
    if (!isDynamic) continue;

    violations.push({ name: usage.name, creationNode, node: usage.node });
  }

  return violations;
}
