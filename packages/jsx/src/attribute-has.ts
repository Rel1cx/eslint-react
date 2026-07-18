import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./attribute-find";

/**
 * Check whether a JSX element carries a given attribute (prop).
 *
 * This is a thin convenience wrapper around {@link findAttribute} for the
 * common case where you only need a boolean answer.
 *
 * Spread attributes are taken into account: `<Comp {...{ disabled: true }} />`
 * will report `true` for `"disabled"`.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to inspect.
 * @param name The attribute name to look for (ex: "className").
 * @returns `true` when the attribute is present on the element.
 */
export function hasAttribute(context: RuleContext, element: TSESTree.JSXElement, name: string) {
  return findAttribute(context, element, name) != null;
}

/**
 * Check whether a JSX element carries at least one of the given attributes.
 *
 * This is a batch variant of {@link hasAttribute} for the common pattern of
 * short-circuiting on multiple prop names.
 *
 * Spread attributes are taken into account (see {@link findAttribute}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to inspect.
 * @param names The attribute names to look for.
 * @returns `true` when at least one of the attributes is present.
 */
export function hasAnyAttribute(context: RuleContext, element: TSESTree.JSXElement, names: string[]): boolean {
  return names.some((name) => findAttribute(context, element, name) != null);
}

/**
 * Check whether a JSX element carries all of the given attributes (props).
 *
 * This is a batch variant of {@link hasAttribute} for the common pattern
 * where a rule needs to verify that a set of required props are all present.
 *
 * Spread attributes are taken into account (see {@link findAttribute}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to inspect.
 * @param names The attribute names to look for.
 * @returns `true` when every name in `names` is present on the element.
 */
export function hasEveryAttribute(context: RuleContext, element: TSESTree.JSXElement, names: string[]) {
  return names.every((name) => findAttribute(context, element, name) != null);
}
