import { type TSESTreeJSXAttributeLike, type TSESTreeJSXElementLike, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { dual } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * A test used to select a `JSXAttribute`.
 *
 * A string is matched against the full attribute name (including a namespace);
 * a function receives the attribute node.
 */
export type AttributeTest = string | ((attribute: TSESTree.JSXAttribute) => boolean);

/**
 * The structural value of an attribute.
 *
 * Direct attributes carry the source `attribute` and, when it exists, the value
 * node. The `spreadProps` variant only records the spread attribute itself: its
 * properties and values are not resolved. This is plain data; use
 * {@link resolveAttributeStaticValue} to collapse direct values to a plain
 * JavaScript value.
 */
export type AttributeValue =
  | { readonly kind: "boolean"; readonly attribute: TSESTree.JSXAttribute; readonly node: null }
  | { readonly kind: "literal"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Literal }
  | { readonly kind: "unknown"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Expression }
  | { readonly kind: "element"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTreeJSXElementLike }
  | { readonly kind: "missing"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXEmptyExpression }
  | { readonly kind: "spreadChild"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXSpreadChild }
  | { readonly kind: "spreadProps"; readonly attribute: TSESTree.JSXSpreadAttribute };

/**
 * Get the full name of a `JSXAttribute` node.
 *
 * - `className` -> `"className"`
 * - `aria-label` -> `"aria-label"`
 * - `xml:space` -> `"xml:space"`.
 * @param node The `JSXAttribute` node to get the name from.
 * @returns The attribute name as a plain string.
 */
export function getAttributeName(node: TSESTree.JSXAttribute): string {
  if (node.name.type === AST.JSXIdentifier) return node.name.name;
  return node.name.namespace.name + ":" + node.name.name.name;
}

/**
 * Check if the node is a `JSXAttribute` with the given plain identifier name.
 *
 * Namespaced attributes (ex: `xml:space`) never match; use
 * {@link isAttributeNamed} for full-name matching.
 *
 * Supports both data-first and data-last (curried) call styles:
 * - `isPlainAttribute(node, "className")`
 * - `isPlainAttribute("className")(node)`.
 * @param node The node to check.
 * @param name The plain attribute name to match (ex: "className").
 * @returns `true` if the node is a `JSXAttribute` whose identifier name is `name`.
 */
export const isPlainAttribute: {
  (name: string): (node: TSESTree.Node | null | undefined) => node is TSESTree.JSXAttribute;
  (node: TSESTree.Node | null | undefined, name: string): node is TSESTree.JSXAttribute;
} = dual(2, (node: TSESTree.Node | null | undefined, name: string): node is TSESTree.JSXAttribute => {
  return node?.type === AST.JSXAttribute
    && node.name.type === AST.JSXIdentifier
    && node.name.name === name;
});

/**
 * Check if the node is a `JSXAttribute` with the given full name.
 *
 * The name includes the namespace when present, so `xml:space` can be matched.
 * This is the name semantics used by {@link findAttribute} and the string form
 * of {@link AttributeTest}.
 *
 * Supports both data-first and data-last (curried) call styles.
 * @param node The node to check.
 * @param name The full attribute name to match (ex: "className", "xml:space").
 * @returns `true` if the node is a `JSXAttribute` whose full name is `name`.
 */
export const isAttributeNamed: {
  (name: string): (node: TSESTree.Node | null | undefined) => node is TSESTree.JSXAttribute;
  (node: TSESTree.Node | null | undefined, name: string): node is TSESTree.JSXAttribute;
} = dual(2, (node: TSESTree.Node | null | undefined, name: string): node is TSESTree.JSXAttribute => {
  return node?.type === AST.JSXAttribute && getAttributeName(node) === name;
});

/**
 * Find a direct JSX attribute by name.
 *
 * Returns the last matching attribute to mirror React's behavior where later
 * props win. Only direct `JSXAttribute` nodes are considered; spread attributes
 * are ignored rather than statically resolved.
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look for (ex: "className", "xml:space").
 * @returns The matching `JSXAttribute`, or `null` when not found.
 */
export function findAttribute(element: TSESTree.JSXElement, name: string): TSESTree.JSXAttribute | null {
  const { attributes } = element.openingElement;
  for (let i = attributes.length - 1; i >= 0; i--) {
    const attribute = attributes[i];
    if (attribute?.type === AST.JSXAttribute && isAttributeNamed(attribute, name)) return attribute;
  }
  return null;
}

/**
 * Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor,
 * optionally matching a string name or a predicate.
 * @param node The starting node for the upward search.
 * @param test Optional test to filter candidate `JSXAttribute` nodes. A string
 * matches the full attribute name (see {@link isAttributeNamed}).
 * @returns The first matching `JSXAttribute` ancestor, or `null` when none is found.
 */
export function findParentAttribute(node: TSESTree.Node | null | undefined, test?: AttributeTest): TSESTree.JSXAttribute | null {
  if (node == null) return null;
  const predicate = test == null
    ? () => true
    : typeof test === "function"
    ? test
    : isAttributeNamed(test);
  const guard = (n: TSESTree.Node): n is TSESTree.JSXAttribute => {
    return n.type === AST.JSXAttribute && predicate(n);
  };
  return Traverse.findParent(node, guard);
}

/**
 * Check if the element has a direct attribute with the given full name.
 *
 * Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.
 * @param element The `JSXElement` node to check.
 * @param name The attribute name to look for (ex: "className").
 * @returns `true` if the attribute is present on the element.
 */
export function hasAttribute(element: TSESTree.JSXElement, name: string): boolean {
  return findAttribute(element, name) != null;
}

/**
 * Check if the element has at least one of the given direct attributes.
 *
 * Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if at least one of the attributes is present.
 */
export function hasAnyAttribute(element: TSESTree.JSXElement, names: readonly string[]): boolean {
  if (names.length === 0) return false;
  const nameSet = new Set(names);
  return element.openingElement.attributes.some(
    (attribute) => attribute.type === AST.JSXAttribute && nameSet.has(getAttributeName(attribute)),
  );
}

/**
 * Check if the element has all of the given direct attributes.
 *
 * Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if every attribute is present on the element.
 */
export function hasEveryAttribute(element: TSESTree.JSXElement, names: readonly string[]): boolean {
  if (names.length === 0) return true;
  const remaining = new Set(names);
  for (const attribute of element.openingElement.attributes) {
    if (attribute.type === AST.JSXAttribute) remaining.delete(getAttributeName(attribute));
    if (remaining.size === 0) return true;
  }
  return false;
}

/**
 * Resolve a `JSXAttribute` or `JSXSpreadAttribute` into an {@link AttributeValue} descriptor.
 *
 * Spread attributes are represented structurally by the `spreadProps` kind;
 * their properties and values are not resolved.
 * @param attribute The `JSXAttribute` or `JSXSpreadAttribute` node to resolve.
 * @returns A discriminated-union descriptor of the attribute's value.
 */
export function resolveAttributeValue(attribute: TSESTreeJSXAttributeLike): AttributeValue {
  if (attribute.type === AST.JSXSpreadAttribute) {
    return { kind: "spreadProps", attribute };
  }

  const { value } = attribute;

  // Boolean attribute, no value means `true` (ex: `<input disabled />`).
  if (value == null) {
    return { kind: "boolean", attribute, node: null };
  }

  switch (value.type) {
    case AST.Literal:
      return { kind: "literal", attribute, node: value };

    case AST.JSXExpressionContainer: {
      if (value.expression.type === AST.JSXEmptyExpression) {
        return { kind: "missing", attribute, node: value.expression };
      }
      return { kind: "unknown", attribute, node: value.expression };
    }

    case AST.JSXElement:
    case AST.JSXFragment:
      return { kind: "element", attribute, node: value };

    // Not valid in attribute value position per the JSX spec and not produced
    // by current parsers, but part of the TSESTree union; reported as its own
    // kind so consumers can distinguish it from a plain expression container.
    case AST.JSXSpreadChild:
      return { kind: "spreadChild", attribute, node: value };
  }
}

/**
 * Find a direct attribute by name on a JSX element and resolve its value.
 *
 * Convenience composition of {@link findAttribute} and {@link resolveAttributeValue}.
 * Spread attributes are ignored.
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look up (ex: "className").
 * @returns An {@link AttributeValue} descriptor, or `null` when the attribute is not present.
 */
export function getAttributeValue(element: TSESTree.JSXElement, name: string): AttributeValue | null {
  const attribute = findAttribute(element, name);
  return attribute == null ? null : resolveAttributeValue(attribute);
}

/**
 * Collapse a resolved attribute value to a plain JavaScript value when possible.
 *
 * Returns `undefined` when the value is absent, is a JSX element, is an empty
 * expression container, or cannot be statically evaluated. A statically known
 * `undefined` is therefore indistinguishable from an indeterminate value.
 * @param context The ESLint rule context (needed for scope look-ups).
 * @param value The attribute value descriptor, or `null`.
 * @returns The static value, or `undefined` when it cannot be determined.
 */
export function resolveAttributeStaticValue(context: RuleContext, value: AttributeValue | null): unknown {
  if (value == null) return undefined;
  switch (value.kind) {
    case "boolean":
      return true;
    case "literal":
      return value.node.value;
    case "unknown":
      return getStaticValue(value.node, context.sourceCode.getScope(value.node))?.value;
    case "element":
    case "missing":
    case "spreadChild":
    case "spreadProps":
      return undefined;
  }
}

/**
 * Find a direct attribute by name on a JSX element and collapse its value to a
 * plain JavaScript value.
 *
 * Returns `undefined` both when the attribute is absent and when its value cannot
 * be statically determined; use {@link hasAttribute} when presence itself matters.
 * Spread attributes are ignored.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to check.
 * @param name The attribute name to look up (ex: "className").
 * @returns The static value of the attribute, or `undefined` when absent or indeterminate.
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  return resolveAttributeStaticValue(context, getAttributeValue(element, name));
}
