import { type TSESTreeJSXAttributeLike, type TSESTreeJSXElementLike, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { dual } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { findObjectProperty, hasObjectProperty, isStaticPropertyKey, resolveObjectExpression } from "./property";

/**
 * A test used to select a `JSXAttribute`.
 *
 * A string is matched against the full attribute name (including a namespace);
 * a function receives the attribute node.
 */
export type AttributeTest = string | ((attribute: TSESTree.JSXAttribute) => boolean);

/**
 * The result of looking up an attribute by name.
 *
 * A `plain` match is a direct `JSXAttribute`. A `spread` match is a
 * `JSXSpreadAttribute` whose argument provides the name; `property` is the
 * object property that supplies it (possibly through nested spreads).
 */
export type AttributeMatch =
  | { readonly kind: "plain"; readonly attribute: TSESTree.JSXAttribute }
  | { readonly kind: "spread"; readonly attribute: TSESTree.JSXSpreadAttribute; readonly property: TSESTree.Property };

/**
 * The structural value of an attribute.
 *
 * Plain attribute variants carry the source `attribute` and the value node.
 * The `spreadProps` variant does not carry a `node`: the value is supplied by
 * `property` (when known), and the spread source is `attribute.argument`.
 *
 * This is plain data; use {@link resolveAttributeStaticValue} to collapse it to
 * a plain JavaScript value.
 */
export type AttributeValue =
  | { readonly kind: "boolean"; readonly attribute: TSESTree.JSXAttribute; readonly node: null }
  | { readonly kind: "literal"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Literal }
  | { readonly kind: "unknown"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.Expression }
  | { readonly kind: "element"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTreeJSXElementLike }
  | { readonly kind: "missing"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXEmptyExpression }
  | { readonly kind: "spreadChild"; readonly attribute: TSESTree.JSXAttribute; readonly node: TSESTree.JSXSpreadChild }
  | { readonly kind: "spreadProps"; readonly attribute: TSESTree.JSXSpreadAttribute; readonly property: TSESTree.Property | null };

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
 * Find a JSX attribute (or a spread attribute containing the property) by name.
 *
 * Returns the last matching attribute to mirror React's behavior where later props win.
 * Plain attributes are matched by full name; spread attributes are resolved when
 * possible: if the spread argument is an identifier that resolves to an object
 * expression, the object's properties are searched for a matching key (see
 * {@link findSpreadProperty}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look for (ex: "className", "xml:space").
 * @returns The matching attribute and, for spreads, the property that supplies the name; `null` when not found.
 */
export function findAttribute(context: RuleContext, element: TSESTree.JSXElement, name: string): AttributeMatch | null {
  const { attributes } = element.openingElement;
  for (let i = attributes.length - 1; i >= 0; i--) {
    const attribute = attributes[i];
    if (attribute == null) continue;
    if (attribute.type === AST.JSXAttribute) {
      if (isAttributeNamed(attribute, name)) return { kind: "plain", attribute };
    } else {
      const property = findSpreadProperty(context, attribute.argument, name);
      if (property != null) return { kind: "spread", attribute, property };
    }
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
 * Find the `Property` node that provides a given key inside a spread argument.
 *
 * This is the single resolution routine shared by {@link findAttribute} and
 * `findCreateElementProp`:
 *
 * - An `Identifier` argument is resolved to its initializer via variable
 *   resolution, following alias chains (`const b = a`) like `getStaticValue`
 *   does; an `ObjectExpression` argument is searched directly.
 * - Properties are walked **in reverse** so that later entries win, matching
 *   JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
 * - Nested `SpreadElement`s (identifiers or inline object expressions) are
 *   searched recursively; a `seen` set guards against circular references.
 * - Non-computed identifier keys and string literal keys are matched directly;
 *   computed keys are matched when they are statically evaluable
 *   (ex: `{ ["class" + "Name"]: 1 }`).
 * @param context The ESLint rule context (needed for variable resolution).
 * @param argument The spread argument expression to search.
 * @param name The property name to look for.
 * @returns The matching `Property` node, or `null` when the key is not found.
 */
export function findSpreadProperty(context: RuleContext, argument: TSESTree.Expression, name: string): TSESTree.Property | null {
  const seen = new Set<TSESTree.Node>();
  const object = resolveObjectExpression(context, argument, seen);
  return object == null ? null : findObjectProperty(context, object, name, seen);
}

/**
 * Check whether a spread argument, or any nested spread inside its resolved
 * object expression, cannot be statically resolved to an object expression.
 *
 * A spread is considered unresolvable when its argument (or a nested spread)
 * does not resolve to an object expression, or when the resolved object
 * contains a computed key that cannot be statically evaluated. Such a spread
 * may provide arbitrary properties (ex: `key` or `ref`), so callers that must
 * not misjudge the effective props can use this as a conservative check.
 * @param context The ESLint rule context (needed for variable resolution).
 * @param argument The spread argument expression to check.
 * @returns `true` if the spread argument cannot be fully resolved.
 */
export function hasUnresolvableSpread(context: RuleContext, argument: TSESTree.Expression): boolean {
  return hasUnresolvableSpreadInArgument(context, argument, new Set());
}

function hasUnresolvableSpreadInArgument(context: RuleContext, argument: TSESTree.Expression, visited: Set<TSESTree.Node>): boolean {
  const object = resolveObjectExpression(context, argument, new Set<TSESTree.Node>());
  if (object == null) return true;
  if (visited.has(object)) return false;
  visited.add(object);
  for (const property of object.properties) {
    if (property.type === AST.SpreadElement) {
      if (hasUnresolvableSpreadInArgument(context, property.argument, visited)) return true;
      continue;
    }
    if (!isStaticPropertyKey(context, property)) return true;
  }
  return false;
}

/**
 * Check if the element has an attribute with the given full name.
 *
 * Spread attributes are taken into account: `<Comp {...{ disabled: true }} />`
 * reports `true` for `"disabled"` (see {@link findAttribute}).
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param name The attribute name to look for (ex: "className").
 * @returns `true` if the attribute is present on the element.
 */
export function hasAttribute(context: RuleContext, element: TSESTree.JSXElement, name: string): boolean {
  return findAttribute(context, element, name) != null;
}

/**
 * Check if the element has at least one of the given attributes.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if at least one of the attributes is present.
 */
export function hasAnyAttribute(context: RuleContext, element: TSESTree.JSXElement, names: readonly string[]): boolean {
  if (names.length === 0) return false;
  const nameSet = new Set(names);
  const { attributes } = element.openingElement;
  for (let i = attributes.length - 1; i >= 0; i--) {
    const attribute = attributes[i];
    if (attribute == null) continue;
    if (attribute.type === AST.JSXAttribute) {
      if (nameSet.has(getAttributeName(attribute))) return true;
      continue;
    }
    const seen = new Set<TSESTree.Node>();
    const object = resolveObjectExpression(context, attribute.argument, seen);
    if (object != null && hasObjectProperty(context, object, nameSet, seen)) return true;
  }
  return false;
}

/**
 * Check if the element has all of the given attributes.
 * @param context The ESLint rule context (needed for variable resolution in spread attributes).
 * @param element The `JSXElement` node to check.
 * @param names The attribute names to look for.
 * @returns `true` if every attribute is present on the element.
 */
export function hasEveryAttribute(context: RuleContext, element: TSESTree.JSXElement, names: readonly string[]): boolean {
  return names.every((name) => findAttribute(context, element, name) != null);
}

/**
 * Resolve an attribute (or an attribute lookup match) into an {@link AttributeValue} descriptor.
 *
 * When passing an {@link AttributeMatch} for a spread attribute, the matched
 * property is carried into the descriptor; passing a raw `JSXSpreadAttribute`
 * yields a `spreadProps` descriptor with `property: null`.
 * @param matchOrAttribute A lookup match or a `JSXAttribute` / `JSXSpreadAttribute` node.
 * @returns A discriminated-union descriptor of the attribute's value.
 */
export function resolveAttributeValue(matchOrAttribute: AttributeMatch | TSESTreeJSXAttributeLike): AttributeValue {
  if (isAttributeMatch(matchOrAttribute)) {
    return matchOrAttribute.kind === "plain"
      ? resolveJSXAttribute(matchOrAttribute.attribute)
      : { kind: "spreadProps", attribute: matchOrAttribute.attribute, property: matchOrAttribute.property };
  }
  if (matchOrAttribute.type === AST.JSXAttribute) return resolveJSXAttribute(matchOrAttribute);
  return { kind: "spreadProps", attribute: matchOrAttribute, property: null };
}

/**
 * Find an attribute by name on a JSX element and resolve its value in a single call.
 *
 * Convenience composition of {@link findAttribute} and {@link resolveAttributeValue}.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look up (ex: "className").
 * @returns An {@link AttributeValue} descriptor, or `null` when the attribute is not present.
 */
export function getAttributeValue(context: RuleContext, element: TSESTree.JSXElement, name: string): AttributeValue | null {
  const match = findAttribute(context, element, name);
  return match == null ? null : resolveAttributeValue(match);
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
      return undefined;
    case "spreadProps":
      if (value.property == null) return undefined;
      return getStaticValue(value.property.value, context.sourceCode.getScope(value.property.value))?.value;
  }
}

/**
 * Find an attribute by name on a JSX element and collapse its value to a plain JavaScript value.
 *
 * Returns `undefined` both when the attribute is absent and when its value cannot
 * be statically determined; use {@link hasAttribute} when presence itself matters.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to check.
 * @param name The attribute name to look up (ex: "className").
 * @returns The static value of the attribute, or `undefined` when absent or indeterminate.
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  return resolveAttributeStaticValue(context, getAttributeValue(context, element, name));
}

// #region Internal Resolvers

function isAttributeMatch(value: AttributeMatch | TSESTreeJSXAttributeLike): value is AttributeMatch {
  return "kind" in value;
}

function resolveJSXAttribute(attribute: TSESTree.JSXAttribute): AttributeValue {
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

// #endregion
