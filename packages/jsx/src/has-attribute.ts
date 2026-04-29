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
 *
 * @param context - The ESLint rule context (needed for variable resolution in
 *                  spread attributes).
 * @param element - The `JSXElement` node to inspect.
 * @param name    - The attribute name to look for (e.g. `"className"`).
 * @returns `true` when the attribute is present on the element.
 *
 * @example
 * ```ts
 * import { hasAttribute } from "@eslint-react/jsx";
 *
 * if (hasAttribute(context, node, "key")) {
 *   // element has a `key` prop
 * }
 * ```
 */
export function hasAttribute(
  context: RuleContext,
  element: TSESTree.JSXElement,
  name: string,
): boolean {
  return findAttribute(context, element, name) != null;
}
