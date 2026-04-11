import type { TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

import type { JsxAttributeValue } from "./jsx-attribute-value";

/**
 * Resolve the value of a JSX attribute (or spread attribute) into a
 * {@link JsxAttributeValue} descriptor that can be inspected further.
 *
 * This is the low‑level building block – it operates on a single attribute
 * node that the caller has already located.  For the higher‑level "find by
 * name **and** resolve" combo, see {@link getAttributeValue}.
 *
 * @param context   - The ESLint rule context (needed for scope look‑ups).
 * @param attribute - A `JSXAttribute` or `JSXSpreadAttribute` node.
 * @returns A discriminated‑union descriptor of the attribute's value.
 *
 * @example
 * ```ts
 * import { findAttribute, resolveAttributeValue } from "@eslint-react/jsx";
 *
 * const attr = findAttribute(context, element, "sandbox");
 * if (attr != null) {
 *   const value = resolveAttributeValue(context, attr);
 *   if (value.kind === "literal") {
 *     console.log(value.toStatic());
 *   }
 * }
 * ```
 */
export function resolveAttributeValue(
  context: RuleContext,
  attribute: TSESTreeJSXAttributeLike,
): JsxAttributeValue {
  if (attribute.type === AST.JSXAttribute) {
    return resolveJsxAttribute(context, attribute);
  }
  return resolveJsxSpreadAttribute(context, attribute);
}

// ---------------------------------------------------------------------------
// Internal resolvers
// ---------------------------------------------------------------------------

function resolveJsxAttribute(
  context: RuleContext,
  node: TSESTree.JSXAttribute,
): JsxAttributeValue {
  const scope = context.sourceCode.getScope(node);

  // Boolean attribute – no value means `true` (e.g. `<input disabled />`).
  if (node.value == null) {
    return {
      kind: "boolean",
      node: null,
      toStatic() {
        return true;
      },
    } as const satisfies JsxAttributeValue;
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
      } as const satisfies JsxAttributeValue;
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
        } as const satisfies JsxAttributeValue;
      }

      return {
        kind: "unknown",
        node: expr,
        toStatic() {
          return getStaticValue(expr, scope)?.value;
        },
      } as const satisfies JsxAttributeValue;
    }

    case AST.JSXElement: {
      return {
        kind: "element",
        node: node.value,
        toStatic() {
          return null;
        },
      } as const satisfies JsxAttributeValue;
    }

    case AST.JSXSpreadChild: {
      return {
        kind: "spreadChild",
        getChildren(_at: number) {
          return null;
        },
        node: node.value.expression,
        toStatic() {
          return null;
        },
      } as const satisfies JsxAttributeValue;
    }
  }
}

function resolveJsxSpreadAttribute(
  context: RuleContext,
  node: TSESTree.JSXSpreadAttribute,
): JsxAttributeValue {
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
  } as const satisfies JsxAttributeValue;
}
