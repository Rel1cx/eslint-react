import { type TSESTreeJSXElementLike, Traverse } from "@eslint-react/ast";
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
 * The structural value of a direct JSX attribute.
 *
 * - `boolean`: the attribute has no value (ex: `<input disabled />`).
 * - `literal`: the value is a literal.
 * - `unknown`: a non-empty expression, normally in an expression container;
 *   the expression is not evaluated.
 * - `element`: the value is a JSX element or fragment.
 * - `missing`: no expression, normally an empty expression container
 *   (`{}` or `{/* comment *\/}`).
 *
 * Every variant carries the source `attribute`; `node` is `null` only for the
 * `boolean` kind. This is plain data; use {@link getAttributeStaticValue} to
 * collapse values to a plain JavaScript value.
 * @remarks
 * The `spreadChild` variant is omitted because it is not valid in attribute
 * value position and is not produced by current parsers. The `spreadProps`
 * variant is omitted because spread props are not resolved and direct attribute
 * lookup never produces a spread descriptor.
 */
export type AttributeValue =
  | { readonly kind: "boolean"; readonly attribute: TSESTree.JSXAttribute; readonly node: null }
  | { readonly kind: "literal"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Literal }
  | { readonly kind: "unknown"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Expression }
  | { readonly kind: "element"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTreeJSXElementLike }
  | { readonly kind: "missing"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXEmptyExpression };

// | { readonly kind: "spreadChild"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXSpreadChild }
// | { readonly kind: "spreadProps"; readonly attribute: TSESTree.JSXSpreadAttribute };

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
 * Find the last direct JSX attribute with the given full name.
 *
 * Later direct attributes take precedence, matching the order in which JSX
 * props are written. Spread attributes are opaque: they are ignored by this lookup, and a
 * spread after the returned attribute may still override it at runtime.
 * @param element The `JSXElement` node to search.
 * @param name The full attribute name to look for (ex: "className", "xml:space").
 * @returns The last matching `JSXAttribute`, or `null` when not found.
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
 *
 * The search starts at `node.parent`; `node` itself is not considered. When
 * `test` is omitted, the nearest `JSXAttribute` ancestor matches.
 * @param node The starting node for the upward search; nullish values return `null`.
 * @param test Optional test to filter candidate `JSXAttribute` nodes. A string
 * matches the full attribute name (see {@link isAttributeNamed}); a function
 * receives the candidate attribute.
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
 * @param name The full attribute name to look for (ex: "className", "xml:space").
 * @returns `true` if the attribute is directly present on the element.
 */
export function hasAttribute(element: TSESTree.JSXElement, name: string): boolean {
  return findAttribute(element, name) != null;
}

/**
 * Check if the element has at least one of the given direct attributes.
 *
 * Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.
 * @param element The `JSXElement` node to check.
 * @param names The full attribute names to look for (namespaces included).
 * @returns `true` if at least one direct attribute is present; `false` for an empty list.
 */
export function hasAnyAttribute(element: TSESTree.JSXElement, names: readonly string[]): boolean {
  if (names.length === 0) return false;
  return element.openingElement.attributes.some((a) => a.type === AST.JSXAttribute && names.includes(getAttributeName(a)));
}

/**
 * Check if the element has all of the given direct attributes.
 *
 * Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.
 * @param element The `JSXElement` node to check.
 * @param names The full attribute names to look for (namespaces included).
 * @returns `true` if every direct attribute is present; an empty list is vacuously `true`.
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
 * Get the structural value of a direct `JSXAttribute`.
 *
 * The attribute's value is classified syntactically; expressions are not
 * evaluated. Only direct `JSXAttribute` nodes are accepted; spread attributes
 * are outside this API.
 * @param attribute The `JSXAttribute` node to get the value from.
 * @returns A discriminated-union descriptor of the attribute's value.
 * @remarks
 * A `JSXSpreadChild` in attribute value position is not valid JSX and is not
 * produced by current parsers, but it is part of the TSESTree union. It is
 * treated as its inner expression, or as `missing` when that expression is empty.
 */
export function getAttributeValue(attribute: TSESTree.JSXAttribute): AttributeValue {
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
    // by current parsers, but part of the TSESTree union; fall back to its
    // inner expression so callers still get a normal value descriptor.
    case AST.JSXSpreadChild:
      return value.expression.type === AST.JSXEmptyExpression
        ? { kind: "missing", attribute, node: value.expression }
        : { kind: "unknown", attribute, node: value.expression };
  }
}

/**
 * Find the last direct attribute with the given full name and get its value.
 *
 * Convenience composition of {@link findAttribute} and {@link getAttributeValue}.
 * Spread attributes are ignored; a spread after the matched attribute may still
 * override it at runtime.
 * @param element The `JSXElement` node to search.
 * @param name The full attribute name to look up (ex: "className", "xml:space").
 * @returns An {@link AttributeValue} descriptor, or `null` when no matching direct attribute is present.
 */
export function getAttributeValueByName(element: TSESTree.JSXElement, name: string): AttributeValue | null {
  const attribute = findAttribute(element, name);
  return attribute == null ? null : getAttributeValue(attribute);
}

/**
 * Get the statically known value of an attribute value descriptor when possible.
 *
 * Boolean attributes resolve to `true`; literal attributes resolve to their
 * literal value; other expressions are evaluated statically when possible.
 * Returns `undefined` when the descriptor is null, is a JSX element or fragment,
 * is a `missing` descriptor, cannot be statically evaluated, or evaluates to
 * `undefined`. A statically known `undefined` is therefore indistinguishable
 * from an indeterminate value.
 * @param context The ESLint rule context (needed for scope look-ups).
 * @param value The attribute value descriptor, or `null`.
 * @returns The static value, or `undefined` when no statically known plain value is available.
 */
export function getAttributeStaticValue(context: RuleContext, value: AttributeValue | null): unknown {
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
      return undefined;
  }
}

/**
 * Find the last direct attribute with the given full name and get its static value.
 *
 * Returns `undefined` when no matching direct attribute is present, or when its
 * value is a JSX element or fragment, is a `missing` descriptor, cannot be
 * statically evaluated, or evaluates to `undefined`. A statically known
 * `undefined` is likewise indistinguishable from an absent or indeterminate
 * value; use {@link hasAttribute} when presence itself matters. Spread
 * attributes are ignored; a spread after the matched attribute may still
 * override it at runtime.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to check.
 * @param name The full attribute name to look up (ex: "className", "xml:space").
 * @returns The static value of the attribute, or `undefined` when absent or indeterminate.
 */
export function getAttributeStaticValueByName(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  return getAttributeStaticValue(context, getAttributeValueByName(element, name));
}
