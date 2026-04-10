import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { findAttribute } from "./find-attribute";
import type { JsxAttributeValue } from "./jsx-attribute-value";
import { resolveAttributeValue } from "./resolve-attribute-value";

/**
 * Find an attribute by name on a JSX element **and** resolve its value in a
 * single call.
 *
 * This is a convenience composition of {@link findAttribute} and
 * {@link resolveAttributeValue} that eliminates the most common two-step
 * pattern in lint rules:
 *
 * ```ts
 * const attr = findAttribute(context, element, name);
 * if (attr == null) return;
 * const value = resolveAttributeValue(context, attr);
 * ```
 *
 * @param context - The ESLint rule context.
 * @param element - The `JSXElement` node to search.
 * @param name    - The attribute name to look up (e.g. `"className"`).
 * @returns A {@link JsxAttributeValue} descriptor, or `undefined` when the
 *          attribute is not present on the element.
 *
 * @example
 * ```ts
 * const value = getAttributeValue(context, node, "sandbox");
 * if (value?.kind === "literal") {
 *   console.log(value.toStatic()); // the literal value
 * }
 * ```
 */
export function getAttributeValue(
  context: RuleContext,
  element: TSESTree.JSXElement,
  name: string,
): JsxAttributeValue | undefined {
  const attr = findAttribute(context, element, name);
  if (attr == null) return undefined;
  return resolveAttributeValue(context, attr);
}
