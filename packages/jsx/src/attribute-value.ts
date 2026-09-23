import { Check, type TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { findAttribute, findSpreadProperty } from "./attribute-find";

/**
 * The syntax of a single attribute value, independent of its source and static evaluation.
 *
 * `node` is the actual value node, with expression containers and spread properties
 * unwrapped. Equivalent values have the same `kind` whether written directly,
 * inside braces, or in a props object. Source information belongs to
 * {@link AttributeDescriptor}, not to the value.
 *
 * Boolean shorthand has no value node. An `empty` value is a present attribute
 * with an empty expression container, not an absent attribute. Use
 * {@link evaluateAttributeValue} to attempt static evaluation.
 */
export type AttributeValue =
  | { readonly kind: "boolean"; readonly node: null }
  | { readonly kind: "literal"; readonly node: TSESTree.Literal }
  | { readonly kind: "expression"; readonly node: TSESTree.Expression }
  | { readonly kind: "element"; readonly node: TSESTree.JSXElement }
  | { readonly kind: "fragment"; readonly node: TSESTree.JSXFragment }
  | { readonly kind: "empty"; readonly node: TSESTree.JSXEmptyExpression }
  | { readonly kind: "spreadChild"; readonly node: TSESTree.JSXSpreadChild };

/**
 * A successfully evaluated attribute value, including a known `undefined`.
 * Absence of this result represents an indeterminate value instead.
 */
export interface AttributeStaticValue {
  readonly value: unknown;
}

/**
 * Resolve a plain JSX attribute into a syntax descriptor without evaluating it.
 * @param context The ESLint rule context.
 * @param attribute The JSX attribute to resolve.
 * @returns The attribute's value descriptor.
 */
export function resolveAttributeValue(context: RuleContext, attribute: TSESTree.JSXAttribute): AttributeValue;
/**
 * Resolve an attribute found by name, extracting that property for a spread.
 *
 * A spread requires a property name: a props object is not itself an attribute
 * value. This uses {@link findSpreadProperty}'s best-effort lookup; an unresolved
 * property does not prove that the spread lacks it at runtime.
 * @param context The ESLint rule context (needed for spread property lookup).
 * @param attribute A plain or spread JSX attribute.
 * @param name The property to extract for a spread; ignored for plain attributes.
 * @returns The value descriptor, or `undefined` when the spread property cannot be found.
 */
export function resolveAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike, name: string): AttributeValue | undefined;
export function resolveAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike, name?: string): AttributeValue | undefined {
  if (attribute.type === AST.JSXSpreadAttribute) {
    if (name == null) throw new TypeError("A property name is required to resolve a JSX spread attribute value.");
    const property = findSpreadProperty(context, attribute.argument, name);
    if (property == null || !Check.isExpression(property.value)) return undefined;
    return describeAttributeValue(property.value);
  }
  const { value } = attribute;
  return describeAttributeValue(value?.type === AST.JSXExpressionContainer ? value.expression : value);
}

/**
 * Find an attribute by name on a JSX element and describe its value.
 *
 * Uses {@link findAttribute}'s best-effort lookup and last-known-match ordering.
 * Unresolvable spreads are skipped, so `undefined` means no known matching
 * attribute, not proof of runtime absence.
 * @param context The ESLint rule context.
 * @param element The JSX element to search.
 * @param name The attribute name to look up (ex: "className").
 * @returns The value descriptor, or `undefined` when no matching attribute can be resolved.
 */
export function getAttributeValue(context: RuleContext, element: TSESTree.JSXElement, name: string): AttributeValue | undefined {
  const attribute = findAttribute(context, element, name);
  if (attribute == null) return undefined;
  return resolveAttributeValue(context, attribute, name);
}

/**
 * Attempt to statically evaluate a resolved attribute value.
 *
 * Returns `{ value: undefined }` for a known `undefined`, and `undefined` when
 * evaluation is not possible. Scope is obtained from the actual value node,
 * which may belong to a spread object's declaration rather than the JSX use.
 * @param context The ESLint rule context.
 * @param value The syntax descriptor to evaluate.
 * @returns A wrapped static value on success, or `undefined` on failure.
 */
export function evaluateAttributeValue(context: RuleContext, value: AttributeValue): AttributeStaticValue | undefined {
  switch (value.kind) {
    case "boolean":
      return { value: true };
    case "literal":
      return { value: value.node.value };
    case "expression":
      return getStaticValue(value.node, context.sourceCode.getScope(value.node)) ?? undefined;
    case "element":
    case "fragment":
    case "empty":
    case "spreadChild":
      return undefined;
  }
}

/**
 * Find an attribute by name and return its plain static value.
 *
 * This convenience API intentionally returns `undefined` for an absent or
 * unresolved attribute, an indeterminate value, and a known `undefined` alike.
 * Use {@link getAttributeValue} and {@link evaluateAttributeValue} separately
 * when those distinctions matter.
 * @param context The ESLint rule context.
 * @param element The JSX element to search.
 * @param name The attribute name to look up (ex: "className").
 * @returns The static value, or `undefined` when absent or indeterminate.
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  const value = getAttributeValue(context, element, name);
  return value == null ? undefined : evaluateAttributeValue(context, value)?.value;
}

/**
 * Normalize a value node without binding it to a particular attribute source.
 * @internal
 */
export function describeAttributeValue(
  node: TSESTree.Expression | TSESTree.JSXEmptyExpression | TSESTree.JSXSpreadChild | null,
): AttributeValue {
  if (node == null) return { kind: "boolean", node: null };
  switch (node.type) {
    case AST.Literal:
      return { kind: "literal", node };
    case AST.JSXElement:
      return { kind: "element", node };
    case AST.JSXFragment:
      return { kind: "fragment", node };
    case AST.JSXEmptyExpression:
      return { kind: "empty", node };
    case AST.JSXSpreadChild:
      return { kind: "spreadChild", node };
    default:
      return { kind: "expression", node };
  }
}
