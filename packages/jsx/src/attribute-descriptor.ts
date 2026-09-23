import { Check, Extract, type TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { findAttribute, findSpreadProperty } from "./attribute-find";
import { getAttributeName } from "./attribute-name";
import { type AttributeStaticValue, type AttributeValue, describeAttributeValue, evaluateAttributeValue, resolveAttributeValue } from "./attribute-value";

/**
 * Where an authored attribute comes from, independent of its value's syntax.
 *
 * For JSX spreads, `node` is the spread at the use site and `property` is the
 * resolved object property, which may be declared elsewhere. A `property` source
 * describes a props object entry, such as a `createElement` config property.
 */
export type AttributeSource =
  | { readonly kind: "jsx"; readonly node: TSESTree.JSXAttribute }
  | { readonly kind: "jsxSpread"; readonly node: TSESTree.JSXSpreadAttribute; readonly property: TSESTree.Property }
  | { readonly kind: "property"; readonly node: TSESTree.Property };

/** A named attribute, its source, and its value, with context-bound static evaluation. */
export interface AttributeDescriptor {
  readonly name: string;
  /** Return a wrapped known value (including `undefined`), or `undefined` if evaluation fails. */
  getStaticValue(): AttributeStaticValue | undefined;
  readonly source: AttributeSource;
  readonly value: AttributeValue;
}

/**
 * Describe a plain JSX attribute, retaining its name, source, and value syntax.
 * @param context The ESLint rule context.
 * @param attribute The JSX attribute to describe.
 * @returns An attribute descriptor.
 */
export function resolveAttribute(context: RuleContext, attribute: TSESTree.JSXAttribute): AttributeDescriptor;
/**
 * Describe an object property with a statically known string name.
 * @param context The ESLint rule context.
 * @param attribute The object property to describe.
 * @returns A descriptor, or `undefined` for an unknown name or unsupported value node.
 */
export function resolveAttribute(context: RuleContext, attribute: TSESTree.Property): AttributeDescriptor | undefined;
/**
 * Describe an attribute found by name, resolving that property for a JSX spread.
 *
 * A spread describes a props object, not a single attribute, so its property name
 * is required. Plain JSX attributes and object properties use their own names.
 * Lookup follows {@link findSpreadProperty}'s best-effort semantics.
 * @param context The ESLint rule context.
 * @param attribute A JSX attribute, JSX spread, or object property.
 * @param name The property to find in a JSX spread; ignored for other sources.
 * @returns A descriptor, or `undefined` when the named property cannot be resolved.
 */
export function resolveAttribute(context: RuleContext, attribute: TSESTreeJSXAttributeLike | TSESTree.Property, name: string): AttributeDescriptor | undefined;
export function resolveAttribute(
  context: RuleContext,
  attribute: TSESTreeJSXAttributeLike | TSESTree.Property,
  name?: string,
): AttributeDescriptor | undefined {
  switch (attribute.type) {
    case AST.JSXAttribute:
      return createAttributeDescriptor(
        context,
        getAttributeName(attribute),
        { kind: "jsx", node: attribute },
        resolveAttributeValue(context, attribute),
      );
    case AST.JSXSpreadAttribute: {
      if (name == null) throw new TypeError("A property name is required to resolve a JSX spread attribute.");
      const property = findSpreadProperty(context, attribute.argument, name);
      if (property == null || !Check.isExpression(property.value)) return undefined;
      return createAttributeDescriptor(
        context,
        name,
        { kind: "jsxSpread", node: attribute, property },
        describeAttributeValue(property.value),
      );
    }
    case AST.Property: {
      if (attribute.parent.type === AST.ObjectPattern) return undefined;
      const propertyName = Extract.getPropertyName(attribute, "max", context.sourceCode.getScope(attribute.key));
      if (propertyName == null || !Check.isExpression(attribute.value)) return undefined;
      return createAttributeDescriptor(
        context,
        propertyName,
        { kind: "property", node: attribute },
        describeAttributeValue(attribute.value),
      );
    }
  }
}

/**
 * Find an authored JSX attribute by name and describe its source and value.
 *
 * This preserves {@link findAttribute}'s last-known-match ordering. Unresolvable
 * spreads are skipped; neither absence nor an earlier value is a runtime guarantee.
 * @param context The ESLint rule context.
 * @param element The JSX element to search.
 * @param name The attribute name to find.
 * @returns The descriptor, or `undefined` when no known matching attribute is found.
 */
export function getAttributeDescriptor(context: RuleContext, element: TSESTree.JSXElement, name: string): AttributeDescriptor | undefined {
  const attribute = findAttribute(context, element, name);
  return attribute == null ? undefined : resolveAttribute(context, attribute, name);
}

function createAttributeDescriptor(
  context: RuleContext,
  name: string,
  source: AttributeSource,
  value: AttributeValue,
): AttributeDescriptor {
  return {
    name,
    getStaticValue: () => evaluateAttributeValue(context, value),
    source,
    value,
  };
}
