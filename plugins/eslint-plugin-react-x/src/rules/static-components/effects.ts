import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { ComponentUsageFact } from "./collect";
import type { IsInsideRender } from "./helpers";
import { resolveDynamicComponentOrigin } from "./origins";

export type CreatedComponentEffect = {
  name: string;
  creationNode: TSESTree.Node | null;
  node: TSESTree.JSXIdentifier;
};

/**
 * Turn collected JSX component usages into effects: a usage is an effect when the
 * binding it refers to is declared inside a component's render body and its value is
 * dynamically created, i.e. the component is recreated on every render.
 */
export function inferCreatedComponents(
  context: RuleContext,
  componentUsages: readonly ComponentUsageFact[],
  isInsideRender: IsInsideRender,
): CreatedComponentEffect[] {
  const effects: CreatedComponentEffect[] = [];

  for (const usage of componentUsages) {
    const variable = findVariable(context.sourceCode.getScope(usage.node), usage.name);
    if (variable == null) continue;

    const def = variable.defs.at(0);
    if (def == null) continue;

    // The declaration of the component's value must itself live inside a component's
    // render body for it to be a candidate for "created during render".
    if (!isInsideRender(def.node)) continue;

    const { creationNode, isDynamic } = resolveDynamicComponentOrigin(context, variable, isInsideRender);
    if (!isDynamic) continue;

    effects.push({ name: usage.name, creationNode, node: usage.node });
  }

  return effects;
}
