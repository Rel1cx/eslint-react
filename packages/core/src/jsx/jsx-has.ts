import type { RuleContext } from "@eslint-react/kit";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { getAttribute } from "./jsx-attribute";

/**
 * Checks if a JSX element has a specific attribute
 *
 * @param context - ESLint rule context
 * @param name - Name of the attribute to check for
 * @param attributes - List of JSX attributes from opening element
 * @param initialScope - Optional scope for resolving variables in spread attributes
 * @returns boolean indicating whether the attribute exists
 */
export function hasAttribute(
  context: RuleContext,
  name: string,
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return getAttribute(context, name, attributes, initialScope) != null;
}

/**
 * Checks if a JSX element has at least one of the specified attributes
 *
 * @param context - ESLint rule context
 * @param names - Array of attribute names to check for
 * @param attributes - List of JSX attributes from opening element
 * @param initialScope - Optional scope for resolving variables in spread attributes
 * @returns boolean indicating whether any of the attributes exist
 */
export function hasAnyAttribute(
  context: RuleContext,
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.some((n) => hasAttribute(context, n, attributes, initialScope));
}

/**
 * Checks if a JSX element has all of the specified attributes
 *
 * @param context - ESLint rule context
 * @param names - Array of attribute names to check for
 * @param attributes - List of JSX attributes from opening element
 * @param initialScope - Optional scope for resolving variables in spread attributes
 * @returns boolean indicating whether all of the attributes exist
 */
export function hasEveryAttribute(
  context: RuleContext,
  names: string[],
  attributes: TSESTree.JSXOpeningElement["attributes"],
  initialScope?: Scope,
) {
  return names.every((n) => hasAttribute(context, n, attributes, initialScope));
}
