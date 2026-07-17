import type { TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

/**
 * Discriminated union representing the resolved value of a JSX attribute.
 *
 * Each variant carries the original AST `node` (where applicable) and a
 * `toStatic()` helper that attempts to collapse the value into a plain
 * JavaScript value at analysis time.
 */
type AttributeValue =
  | { readonly kind: "boolean"; readonly node: null; toStatic(): true }
  | { readonly kind: "element"; readonly node: TSESTree.JSXElement; toStatic(): null }
  | { readonly kind: "literal"; readonly node: TSESTree.Literal; toStatic(): TSESTree.Literal["value"] }
  | { readonly kind: "unknown"; readonly node: TSESTree.JSXExpressionContainer["expression"]; toStatic(): unknown }
  | { readonly kind: "missing"; readonly node: TSESTree.JSXEmptyExpression; toStatic(): null }
  | { readonly kind: "spreadChild"; getChildren(): unknown; readonly node: TSESTree.JSXSpreadChild["expression"]; toStatic(): null }
  | { readonly kind: "spreadProps"; getProperty(name: string): unknown; readonly node: TSESTree.JSXSpreadAttribute["argument"]; toStatic(): null };

/**
 * Resolve the value of a JSX attribute (or spread attribute) into a
 * {@link AttributeValue} descriptor that can be inspected further.
 *
 * This is the low-level building block; it operates on a single attribute
 * node that the caller has already located. For the higher-level "find by
 * name and resolve" combo, see {@link getAttributeValue}.
 * @param context The ESLint rule context (needed for scope look-ups).
 * @param attribute A `JSXAttribute` or `JSXSpreadAttribute` node.
 * @returns A discriminated-union descriptor of the attribute's value.
 */
export function resolveAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike): AttributeValue {
  if (attribute.type === AST.JSXAttribute) {
    return resolveJsxAttribute(context, attribute);
  }
  return resolveJsxSpreadAttribute(context, attribute);
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
            return null;
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
          return null;
        },
      } as const satisfies AttributeValue;
    }

    case AST.JSXSpreadChild: {
      return {
        kind: "spreadChild",
        getChildren() {
          return null;
        },
        node: node.value.expression,
        toStatic() {
          return null;
        },
      } as const satisfies AttributeValue;
    }
  }
}

function resolveJsxSpreadAttribute(context: RuleContext, node: TSESTree.JSXSpreadAttribute): AttributeValue {
  const scope = context.sourceCode.getScope(node);

  return {
    kind: "spreadProps",
    getProperty(name: string) {
      return match(getStaticValue(node.argument, scope)?.value)
        .with({ [name]: P.select(P.unknown) }, (v) => v)
        .otherwise(() => null);
    },
    node: node.argument,
    toStatic() {
      return null;
    },
  } as const satisfies AttributeValue;
}

// #endregion
