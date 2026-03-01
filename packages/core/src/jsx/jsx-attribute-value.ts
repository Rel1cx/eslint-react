import * as ast from "@eslint-react/ast";
import { identity } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";

/**
 * Represents possible JSX attribute value types that can be resolved
 */
export type JsxAttributeValue =
  | { kind: "missing"; node: TSESTree.JSXEmptyExpression; toStatic(): "{}" } // Missing value (e.g., <Component prop={} />)
  | { kind: "boolean"; toStatic(): true } // Boolean attributes (e.g., disabled)
  | { kind: "element"; node: TSESTree.JSXElement; toStatic(): unknown } // JSX element as value (e.g., <Component element=<JSXElement /> />)
  | { kind: "literal"; node: TSESTree.Literal; toStatic(): TSESTree.Literal["value"] } // Literal values
  | { kind: "expression"; node: TSESTree.JSXExpressionContainer["expression"]; toStatic(): unknown } // Expression attributes (e.g., {value}, {...props})
  | {
    // Spread props (e.g., {...props})
    kind: "spreadProps";
    node: TSESTree.JSXSpreadAttribute["argument"];
    toStatic(): unknown;
    getProperty(name: string): unknown;
  }
  | {
    // Spread children (e.g., {...["Hello", " ", "spread", " ", "children"]})
    kind: "spreadChild";
    node: TSESTree.JSXSpreadChild["expression"];
    toStatic(): unknown;
    getChildren(at: number): unknown;
  };

/**
 * Resolve the static value of a JSX attribute or spread attribute
 *
 * @param context - The ESLint rule context
 * @param attribute - The JSX attribute node to resolve
 * @returns An object containing the value kind, the node (if applicable), and a `toStatic` helper
 */
export function resolveJsxAttributeValue(context: RuleContext, attribute: ast.TSESTreeJSXAttributeLike) {
  const initialScope = context.sourceCode.getScope(attribute);

  /**
   * Handles standard JSX attributes (e.g., prop="value", prop={value}, prop)
   * @param node The JSX attribute node
   */
  function handleJsxAttribute(node: TSESTree.JSXAttribute) {
    // Boolean attribute with no value (e.g., disabled)
    if (node.value == null) {
      return {
        kind: "boolean",
        toStatic() {
          return true;
        },
      } as const satisfies JsxAttributeValue;
    }
    switch (node.value.type) {
      // Literal value (e.g., className="container")
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
          // Missing value (e.g., <Component prop={} />)
          return {
            kind: "missing",
            node: expr,
            toStatic() {
              return "{}";
            },
          } as const satisfies JsxAttributeValue;
        }
        // Expression container (e.g., className={variable})
        return {
          kind: "expression",
          node: expr,
          toStatic() {
            return getStaticValue(expr, initialScope)?.value;
          },
        } as const satisfies JsxAttributeValue;
      }
      // JSX Element as value (e.g., element=<JSXElement />)
      case AST.JSXElement:
        return {
          kind: "element",
          node: node.value,
          toStatic() {
            return null;
          },
        } as const satisfies JsxAttributeValue;
      // JSX spread children (e.g., <div>{...["Hello", " ", "spread", " ", "children"]}</div>)
      case AST.JSXSpreadChild: {
        const expr = node.value.expression;
        return {
          kind: "spreadChild",
          node: node.value.expression,
          toStatic() {
            return getStaticValue(expr, initialScope)?.value;
          },
          getChildren(at: number) {
            // TODO: Implement logic to extract specific child from spread children if it's an array
            return null;
          },
        } as const satisfies JsxAttributeValue;
      }
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
      toStatic() {
        return getStaticValue(node.argument, initialScope)?.value;
      },
      // Helper to extract a specific property value from the spread object
      getProperty(name: string) {
        // If spread object contains the named property, extract its value
        return match(getStaticValue(node.argument, initialScope)?.value)
          .with({ [name]: P.select(P.any) }, identity)
          .otherwise(() => null);
      },
    } as const satisfies JsxAttributeValue;
  }

  switch (attribute.type) {
    case AST.JSXAttribute:
      return handleJsxAttribute(attribute);
    case AST.JSXSpreadAttribute:
      return handleJsxSpreadAttribute(attribute);
  }
}
