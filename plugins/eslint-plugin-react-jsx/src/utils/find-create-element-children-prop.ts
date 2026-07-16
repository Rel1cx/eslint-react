import { Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Finds the statically named `children` property in the props object of a `createElement` call.
 * @param context The rule context
 * @param node The `CallExpression` node to inspect
 * @returns The `children` property node, or `null` when the call has no static `children` prop
 */
export function findCreateElementChildrenProp(context: RuleContext, node: TSESTree.CallExpression): TSESTree.Property | null {
  if (!core.isCreateElementCall(context, node)) return null;

  const propsArg = node.arguments[1];
  if (propsArg == null) return null;

  const propsObject = Extract.unwrap(propsArg);
  if (propsObject.type !== AST.ObjectExpression) return null;

  for (const prop of propsObject.properties) {
    if (prop.type === AST.Property && Extract.getStaticPropertyName(prop) === "children") {
      return prop;
    }
  }
  return null;
}
