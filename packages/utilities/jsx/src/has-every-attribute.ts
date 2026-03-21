import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { findAttribute } from "./find-attribute";

/**
 * Check whether a JSX element carries **all** of the given attributes (props).
 *
 * This is a batch variant of {@link hasAttribute} for the common pattern
 * where a rule needs to verify that a set of required props are all present.
 *
 * Spread attributes are taken into account (see {@link findAttribute}).
 *
 * @param context  - The ESLint rule context (needed for variable resolution in
 *                   spread attributes).
 * @param element  - The `JSXElement` node to inspect.
 * @param names    - The attribute names to look for.
 * @returns `true` when **every** name in `names` is present on the element.
 *
 * @example
 * ```ts
 * import { hasEveryAttribute } from "@eslint-react/jsx";
 *
 * // Ensure both `alt` and `src` are provided on an <img>
 * if (hasEveryAttribute(context, node, ["alt", "src"])) {
 *   // element has both props
 * }
 * ```
 */
export function hasEveryAttribute(
  context: RuleContext,
  element: TSESTree.JSXElement,
  names: readonly string[],
): boolean {
  return names.every((name) => findAttribute(context, element, name) != null);
}
