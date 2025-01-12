import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { findPropInAttributes } from "./get-prop";

export function hasProp(
  propName: string,
  initialScope: Scope,
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
) {
  return findPropInAttributes(propName, initialScope, attributes) != null;
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
  return propNames.some((propName) => hasProp(propName, initialScope, attributes));
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
  return propNames.every((propName) => hasProp(propName, initialScope, attributes));
}
