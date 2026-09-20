import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./attribute-find";

/**
 * Check if the element has an attribute with the given name.
 *
 * Spread attributes are taken into account: `<Comp {...{ disabled: true }} />`
 * reports `true` for `"disabled"` (see {@link findAttribute}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param name The attribute name to look for (ex: "className").
 * @returns `true` if the attribute is present on the element.
 */
export function hasAttribute(context: RuleContext, element: TSESTree.JSXElement, name: string) {
  return findAttribute(context, element, name) != null;
}

/**
 * Check if the element has at least one of the given attributes.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if at least one of the attributes is present.
 */
export function hasAnyAttribute(context: RuleContext, element: TSESTree.JSXElement, names: string[]) {
  return names.some((name) => findAttribute(context, element, name) != null);
}

/**
 * Check if the element has all of the given attributes.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if every attribute is present on the element.
 */
export function hasEveryAttribute(context: RuleContext, element: TSESTree.JSXElement, names: string[]) {
  return names.every((name) => findAttribute(context, element, name) != null);
}
