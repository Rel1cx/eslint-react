import { O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { findPropInAttributes } from "./get-prop";

/**
 * Check if the given prop name is present in the given attributes
 * @param attributes The attributes to search in
 * @param propName The prop name to search for
 * @param initialScope The initial scope to start from
 * @returns `true` if the given prop name is present in the given properties
 */
export function hasProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  initialScope: Scope,
) {
  return O.isSome(findPropInAttributes(attributes, initialScope)(propName));
}

/**
 * Check if any of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param initialScope The initial scope to start from
 * @returns `true` if any of the given prop names are present in the given attributes
 */
export function hasAnyProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  initialScope: Scope,
) {
  return propNames.some((propName) => hasProp(attributes, propName, initialScope));
}

/**
 * Check if all of the given prop names are present in the given attributes
 * @param attributes The attributes to search in
 * @param propNames The prop names to search for
 * @param initialScope The initial scope to start from
 * @returns `true` if all of the given prop names are present in the given attributes
 */
export function hasEveryProp(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propNames: string[],
  initialScope: Scope,
) {
  return propNames.every((propName) => hasProp(attributes, propName, initialScope));
}
