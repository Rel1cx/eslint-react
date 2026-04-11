import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { findAttribute } from "./find-attribute";

/**
 * Check whether a JSX element carries **at least one** of the given attributes.
 *
 * This is a batch variant of {@link hasAttribute} for the common pattern of
 * short-circuiting on multiple prop names:
 *
 * ```ts
 * // before
 * if (hasAttribute(ctx, el, "key")) return;
 * if (hasAttribute(ctx, el, "ref")) return;
 *
 * // after
 * if (hasAnyAttribute(ctx, el, ["key", "ref"])) return;
 * ```
 *
 * Spread attributes are taken into account (see {@link findAttribute}).
 *
 * @param context - The ESLint rule context (needed for variable resolution in
 *                  spread attributes).
 * @param element - The `JSXElement` node to inspect.
 * @param names   - The attribute names to look for.
 * @returns `true` when **at least one** of the attributes is present.
 */
export function hasAnyAttribute(
  context: RuleContext,
  element: TSESTree.JSXElement,
  names: readonly string[],
): boolean {
  return names.some((name) => findAttribute(context, element, name) != null);
}
