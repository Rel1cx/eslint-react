import type { RuleContext } from "@eslint-react/types";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";

import { findPropInAttributes } from "./get-prop";

/**
 * Check if the given prop name is present in the given attributes
 * @param attributes The attributes to search in
 * @param propName The prop name to search for
 * @param context The rule context
 * @param initialScope
 * @returns `true` if the given prop name is present in the given properties
 */
export function hasProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  context: RuleContext,
  initialScope: Scope,
) {
  return O.isSome(findPropInAttributes(attributes, context, initialScope)(propName));
}

/**
 * Check if any of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param context The rule context
 * @param initialScope
 * @returns `true` if any of the given prop names are present in the given attributes
 */
export function hasAnyProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  context: RuleContext,
  initialScope: Scope,
) {
  return propNames.some((propName) => hasProp(attributes, propName, context, initialScope));
}

/**
 * Check if all of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param context The rule context
 * @param initialScope
 * @returns `true` if all of the given prop names are present in the given attributes
 */
export function hasEveryProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  context: RuleContext,
  initialScope: Scope,
) {
  return propNames.every((propName) => hasProp(attributes, propName, context, initialScope));
}
