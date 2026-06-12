import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./find-attribute";
import type { JsxAttributeValue } from "./jsx-attribute-value";
import { resolveAttributeValue } from "./resolve-attribute-value";

/**
 * Find an attribute by name on a JSX element and resolve its value in a single call
 *
 * This is a convenience composition of {@link findAttribute} and
 * {@link resolveAttributeValue} that eliminates the most common two-step
 * pattern in lint rules.
 * @param context The ESLint rule context
 * @param element The `JSXElement` node to search
 * @param name The attribute name to look up (ex: "className")
 * @returns A {@link JsxAttributeValue} descriptor, or `null` when the attribute is not present on the element
 */
export function getAttributeValue(
  context: RuleContext,
  element: TSESTree.JSXElement,
  name: string,
): JsxAttributeValue | null {
  const attr = findAttribute(context, element, name);
  if (attr == null) return null;
  return resolveAttributeValue(context, attr);
}
