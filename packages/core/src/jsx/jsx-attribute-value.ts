import type * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { identity } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

/**
 * Represents possible JSX attribute value types that can be resolved
 */
export type JsxAttributeValue =
  | { kind: "boolean"; toStatic(): true } // Boolean attributes (e.g., disabled)
  | { kind: "element"; node: TSESTree.JSXElement; toStatic(): unknown } // JSX element as value (e.g., <Component element=<JSXElement /> />)
  | { kind: "literal"; node: TSESTree.Literal; toStatic(): TSESTree.Literal["value"] } // Literal values
  | { kind: "expression"; node: TSESTree.JSXExpressionContainer["expression"]; toStatic(): unknown } // Expression attributes (e.g., {value}, {...props})
  | { kind: "spreadProps"; node: TSESTree.JSXSpreadAttribute["argument"]; toStatic(name?: string): unknown } // Spread props (e.g., {...props})
  | { kind: "spreadChild"; node: TSESTree.JSXSpreadChild["expression"]; toStatic(): unknown }; // Spread children (e.g., {...["Hello", " ", "spread", " ", "children"]})

/**
 * Resolves the static value of a JSX attribute or spread attribute
 *
 * @param context - The ESLint rule context
 * @param attribute - The JSX attribute node to resolve
 * @returns An object containing the value kind, the node (if applicable), and a `toStatic` helper
 */
export function resolveJsxAttributeValue(context: RuleContext, attribute: AST.TSESTreeJSXAttributeLike) {
  const initialScope = context.sourceCode.getScope(attribute);

  /**
   * Handles standard JSX attributes (e.g., prop="value", prop={value}, prop)
   * @param node The JSX attribute node
   */
  function handleJsxAttribute(node: TSESTree.JSXAttribute) {
    // Case 1: Boolean attribute with no value (e.g., disabled)
    if (node.value == null) {
      return {
        kind: "boolean",
        toStatic() {
          return true;
        },
      } as const satisfies JsxAttributeValue;
    }
    switch (node.value.type) {
      // Case 2: Literal value (e.g., className="container")
      case T.Literal: {
        const staticValue = node.value.value;
        return {
          kind: "literal",
          node: node.value,
          toStatic() {
            return staticValue;
          },
        } as const satisfies JsxAttributeValue;
      }
      // Case 3: Expression container (e.g., className={variable})
      case T.JSXExpressionContainer: {
        const expr = node.value.expression;
        return {
          kind: "expression",
          node: expr,
          toStatic() {
            return getStaticValue(expr, initialScope)?.value;
          },
        } as const satisfies JsxAttributeValue;
      }
      // Case 4: JSX Element as value (e.g., element=<JSXElement />)
      case T.JSXElement:
        return {
          kind: "element",
          node: node.value,
          toStatic() {
            return unit;
          },
        } as const satisfies JsxAttributeValue;
      // Case 5: JSX spread children (e.g., <div>{...["Hello", " ", "spread", " ", "children"]}</div>)
      case T.JSXSpreadChild:
        return {
          kind: "spreadChild",
          node: node.value.expression,
          toStatic() {
            return unit;
          },
        } as const satisfies JsxAttributeValue;
    }
  }

  /**
   * Handles JSX spread attributes (e.g., {...props})
   * @param node The JSX spread attribute node
   */
  function handleJsxSpreadAttribute(node: TSESTree.JSXSpreadAttribute) {
    // For spread attributes (e.g., {...props}), try to extract static value
    return {
      kind: "spreadProps",
      node: node.argument,
      toStatic(name?: string) {
        if (name == null) return unit;
        // If spread object contains the named property, extract its value
        return match(getStaticValue(node.argument, initialScope)?.value)
          .with({ [name]: P.select(P.any) }, identity)
          .otherwise(() => unit);
      },
    } as const satisfies JsxAttributeValue;
  }

  switch (attribute.type) {
    case T.JSXAttribute:
      return handleJsxAttribute(attribute);
    case T.JSXSpreadAttribute:
      return handleJsxSpreadAttribute(attribute);
  }
}
