import type * as ast from "@eslint-react/ast";
import { RE_COMPONENT_NAME, RE_COMPONENT_NAME_LOOSE, type RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

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
 * Check if a function has a loose component name
 * @param context The rule context
 * @param fn The function to check
 * @param allowNone Whether to allow no name
 * @returns Whether the function has a loose component name
 */
export function isFunctionWithLooseComponentName(context: RuleContext, fn: ast.TSESTreeFunction, allowNone = false) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return allowNone;
  if (id.type === AST.Identifier) {
    return isComponentNameLoose(id.name);
  }
  if (id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
    return isComponentNameLoose(id.property.name);
  }
  return false;
}
