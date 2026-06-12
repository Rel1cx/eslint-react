import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./find-attribute";
import { resolveAttributeValue } from "./resolve-attribute-value";

/**
 * Find an attribute by name on a JSX element and collapse its value to a plain
 * JavaScript value in a single step
 *
 * This is a convenience composition of {@link findAttribute} ->
 * {@link resolveAttributeValue} -> `toStatic()`, with automatic handling of the
 * `spreadProps` case (extracts the named property from the spread object).
 *
 * Returns `undefined` when the attribute is absent or when its value cannot be
 * statically determined.
 * @param context The ESLint rule context
 * @param element The `JSXElement` node to inspect
 * @param name The attribute name to look up (ex: "className")
 * @returns The static value of the attribute, or `undefined`
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  const attr = findAttribute(context, element, name);
  if (attr == null) return undefined;
  const resolved = resolveAttributeValue(context, attr);
  if (resolved.kind === "spreadProps") {
    return resolved.getProperty(name);
  }
  return resolved.toStatic();
}
