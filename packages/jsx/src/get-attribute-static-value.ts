import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { findAttribute } from "./find-attribute";
import { resolveAttributeValue } from "./resolve-attribute-value";

/**
 * Find an attribute by name on a JSX element and collapse its value to a plain
 * JavaScript value in a single step.
 *
 * This is a convenience composition of {@link findAttribute} ->
 * {@link resolveAttributeValue} -> `toStatic()`, with automatic handling of the
 * `spreadProps` case (extracts the named property from the spread object).
 *
 * Returns `null` when the attribute is absent, `undefined` when the value cannot
 * be statically determined (including empty expression containers), and the
 * resolved static value otherwise.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to inspect.
 * @param name The attribute name to look up (ex: "className").
 * @returns The static value of the attribute, `null` when absent, or `undefined` when indeterminate.
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  const attr = findAttribute(context, element, name);
  if (attr == null) return null;
  const resolved = resolveAttributeValue(context, attr);
  if (resolved.kind === "spreadProps") {
    return resolved.getProperty(name);
  }
  if (resolved.kind === "missing") {
    return undefined;
  }
  return resolved.toStatic();
}
