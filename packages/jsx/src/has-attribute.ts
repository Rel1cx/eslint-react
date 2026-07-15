import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./find-attribute";

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
