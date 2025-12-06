import type * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { RE_COMPONENT_NAME, RE_COMPONENT_NAME_LOOSE, type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { getFunctionComponentId } from "./component-id";

/**
 * Check if a string matches the strict component name pattern
 * @param name The name to check
 */
export function isComponentName(name: string) {
  return RE_COMPONENT_NAME.test(name);
}

/**
 * Check if a string matches the loose component name pattern
 * @param name The name to check
 */
export function isComponentNameLoose(name: string) {
  return RE_COMPONENT_NAME_LOOSE.test(name);
}

/**
 * Get component name from an identifier or identifier sequence (e.g., MemberExpression)
 * @param id The identifier or identifier sequence
 */
export function getComponentNameFromId(id: TSESTree.Identifier | TSESTree.Identifier[] | unit) {
  if (id == null) return unit;
  return Array.isArray(id)
    ? id.map((n) => n.name).join(".")
    : id.name;
}

/**
 * Check if the function has no name or a loose component name
 * @param context The rule context
 * @param fn The function node
 */
export function hasNoneOrLooseComponentName(context: RuleContext, fn: AST.TSESTreeFunction) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return true;
  const name = Array.isArray(id)
    ? id.at(-1)?.name
    : id.name;
  return name != null && isComponentNameLoose(name);
}
