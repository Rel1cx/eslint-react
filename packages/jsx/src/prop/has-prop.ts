import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { findPropInAttributes } from "./get-prop";

/**
 * Check if the given prop name is present in the given attributes
 * @param attributes The attributes to search in
 * @param propName The prop name to search for
 * @param context The rule context
 * @returns `true` if the given prop name is present in the given properties
 */
export function hasProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  context: RuleContext,
) {
  return O.isSome(findPropInAttributes(attributes, context)(propName));
}

/**
 * Check if any of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param context The rule context
 * @returns `true` if any of the given prop names are present in the given attributes
 */
export function hasAnyProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  context: RuleContext,
) {
  return propNames.some((propName) => hasProp(attributes, propName, context));
}

/**
 * Check if all of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param context The rule context
 * @returns `true` if all of the given prop names are present in the given attributes
 */
export function hasEveryProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  context: RuleContext,
) {
  return propNames.every((propName) => hasProp(attributes, propName, context));
}
