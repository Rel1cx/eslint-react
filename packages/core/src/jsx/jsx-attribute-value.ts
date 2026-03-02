import type { TSESTree } from "@typescript-eslint/types";

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
