import { type TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { findAttribute, findSpreadProperty } from "./attribute-find";

/**
 * Discriminated union representing the resolved value of a JSX attribute.
 *
 * Each variant carries the original AST `node` (where applicable — the
 * `boolean` variant has no value node and reports `null`) and a `toStatic()`
 * helper that attempts to collapse the value into a plain JavaScript value
 * at analysis time.
 *
 * `toStatic()` returns `undefined` whenever no static value is available;
 * structural information is carried by `kind`, value information by `toStatic()`.
 */
export type AttributeValue =
  | { readonly kind: "boolean"; readonly node: null; toStatic(): true }
  | { readonly kind: "literal"; readonly node: TSESTree.Literal; toStatic(): TSESTree.Literal["value"] }
  | { readonly kind: "unknown"; readonly node: TSESTree.Expression; toStatic(): unknown }
  | { readonly kind: "element"; readonly node: TSESTree.JSXElement; toStatic(): undefined }
  | { readonly kind: "missing"; readonly node: TSESTree.JSXEmptyExpression; toStatic(): undefined }
  | { readonly kind: "spreadChild"; readonly node: TSESTree.JSXSpreadChild; toStatic(): undefined }
  | { readonly kind: "spreadProps"; getProperty(name: string): unknown; readonly node: TSESTree.JSXSpreadAttribute["argument"]; toStatic(): unknown };

/**
 * Resolve the value of a JSX attribute (or spread attribute) into an
 * {@link AttributeValue} descriptor that can be inspected further.
 *
 * This is the low-level building block; it operates on a single attribute
 * node that the caller has already located. For the higher-level "find by
 * name and resolve" combo, see {@link getAttributeValue}.
 *
 * When the attribute is a `JSXSpreadAttribute`, passing `name` (typically the
 * same name the attribute was found by) makes `toStatic()` return the static
 * value of that named property, eliminating the need to branch on
 * `kind === "spreadProps"` at the call site.
 * @param context The ESLint rule context (needed for scope look-ups).
 * @param attribute A `JSXAttribute` or `JSXSpreadAttribute` node.
 * @param name Optional property name used to resolve `toStatic()` for spread attributes.
 * @returns A discriminated-union descriptor of the attribute's value.
 */
export function resolveAttributeValue(
  context: RuleContext,
  attribute: TSESTreeJSXAttributeLike,
  name?: string,
): AttributeValue {
  if (attribute.type === AST.JSXAttribute) {
    return resolveJsxAttribute(context, attribute);
  }
  return resolveJsxSpreadAttribute(context, attribute, name);
}

/**
 * Find an attribute by name on a JSX element and resolve its value in a single call.
 *
 * This is a convenience composition of {@link findAttribute} and
 * {@link resolveAttributeValue} that eliminates the most common two-step
 * pattern in lint rules.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to search.
 * @param name The attribute name to look up (ex: "className").
 * @returns An {@link AttributeValue} descriptor, or `undefined` when the attribute is not present on the element.
 */
export function getAttributeValue(context: RuleContext, element: TSESTree.JSXElement, name: string): AttributeValue | undefined {
  const attr = findAttribute(context, element, name);
  if (attr == null) return undefined;
  return resolveAttributeValue(context, attr, name);
}

/**
 * Find an attribute by name on a JSX element and collapse its value to a plain
 * JavaScript value in a single step.
 *
 * This is a convenience composition of {@link findAttribute} ->
 * {@link resolveAttributeValue} -> `toStatic()`, with automatic handling of the
 * `spreadProps` case (extracts the named property from the spread object).
 *
 * Returns `undefined` both when the attribute is absent and when its value
 * cannot be statically determined; use {@link findAttribute} or
 * {@link hasAttribute} when presence itself matters.
 * @param context The ESLint rule context.
 * @param element The `JSXElement` node to inspect.
 * @param name The attribute name to look up (ex: "className").
 * @returns The static value of the attribute, or `undefined` when absent or indeterminate.
 */
export function getAttributeStaticValue(context: RuleContext, element: TSESTree.JSXElement, name: string): unknown {
  return getAttributeValue(context, element, name)?.toStatic();
}

// #region Internal Resolvers

function resolveJsxAttribute(context: RuleContext, node: TSESTree.JSXAttribute): AttributeValue {
  const scope = context.sourceCode.getScope(node);

  // Boolean attribute, no value means `true` (ex: `<input disabled />`).
  if (node.value == null) {
    return {
      kind: "boolean",
      node: null,
      toStatic() {
        return true;
      },
    } as const satisfies AttributeValue;
  }

  switch (node.value.type) {
    case AST.Literal: {
      const staticValue = node.value.value;
      return {
        kind: "literal",
        node: node.value,
        toStatic() {
          return staticValue;
        },
      } as const satisfies AttributeValue;
    }

    case AST.JSXExpressionContainer: {
      const expr = node.value.expression;
      if (expr.type === AST.JSXEmptyExpression) {
        return {
          kind: "missing",
          node: expr,
          toStatic() {
            return undefined;
          },
        } as const satisfies AttributeValue;
      }
      return {
        kind: "unknown",
        node: expr,
        toStatic() {
          return getStaticValue(expr, scope)?.value;
        },
      } as const satisfies AttributeValue;
    }

    case AST.JSXElement: {
      return {
        kind: "element",
        node: node.value,
        toStatic() {
          return undefined;
        },
      } as const satisfies AttributeValue;
    }

    // Not valid in attribute value position per the JSX spec and not produced
    // by current parsers, but part of the TSESTree union; reported as its own
    // kind so consumers can distinguish it from a plain expression container.
    case AST.JSXSpreadChild: {
      return {
        kind: "spreadChild",
        node: node.value,
        toStatic() {
          return undefined;
        },
      } as const satisfies AttributeValue;
    }
  }
}

function resolveJsxSpreadAttribute(
  context: RuleContext,
  node: TSESTree.JSXSpreadAttribute,
  name?: string,
): AttributeValue {
  const getProperty = (propertyName: string): unknown => {
    const property = findSpreadProperty(context, node.argument, propertyName);
    if (property == null) return undefined;
    const propertyScope = context.sourceCode.getScope(property.value);
    return getStaticValue(property.value, propertyScope)?.value;
  };
  return {
    kind: "spreadProps",
    getProperty,
    node: node.argument,
    toStatic() {
      return name == null ? undefined : getProperty(name);
    },
  } as const satisfies AttributeValue;
}

// #endregion
