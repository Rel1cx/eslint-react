import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents possible JSX attribute value types that can be resolved
 */
export type JsxAttributeValue =
  | { kind: "missing"; node: TSESTree.JSXEmptyExpression; toStatic(): null } // Missing value (ex: <Component prop={} />)
  | { kind: "boolean"; toStatic(): true } // Boolean attributes (ex: disabled)
  | { kind: "element"; node: TSESTree.JSXElement; toStatic(): null } // JSX element as value (ex: <Component element=<JSXElement /> />)
  | { kind: "literal"; node: TSESTree.Literal; toStatic(): TSESTree.Literal["value"] } // Literal values
  | { kind: "expression"; node: TSESTree.JSXExpressionContainer["expression"]; toStatic(): unknown } // Expression attributes (ex: {value}, {...props})
  | {
    // Spread props (ex: {...props})
    kind: "spreadProps";
    getProperty(name: string): unknown;
    node: TSESTree.JSXSpreadAttribute["argument"];
    toStatic(): null;
  }
  | {
    // Spread children (ex: {...["Hello", " ", "spread", " ", "children"]})
    kind: "spreadChild";
    getChildren(at: number): unknown;
    node: TSESTree.JSXSpreadChild["expression"];
    toStatic(): null;
  };
