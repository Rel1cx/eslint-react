import type * as AST from "@eslint-react/ast";
import { RE_COMPONENT_NAME, RE_COMPONENT_NAME_LOOSE, type RuleContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
export function isFunctionWithLooseComponentName(context: RuleContext, fn: AST.TSESTreeFunction, allowNone = false) {
  const id = getFunctionComponentId(context, fn);
  if (id == null) return allowNone;
  if (id.type === T.Identifier) {
    return isComponentNameLoose(id.name);
  }
  if (id.type === T.MemberExpression && id.property.type === T.Identifier) {
    return isComponentNameLoose(id.property.name);
  }
  return false;
}
