[@eslint-react/core](../README.md) / JsxAttributeValue

# Type Alias: JsxAttributeValue

```ts
type JsxAttributeValue = 
  | {
  kind: "missing";
  node: TSESTree.JSXEmptyExpression;
  toStatic: null;
}
  | {
  kind: "boolean";
  toStatic: true;
}
  | {
  kind: "element";
  node: TSESTree.JSXElement;
  toStatic: null;
}
  | {
  kind: "literal";
  node: TSESTree.Literal;
  toStatic:   | string
     | number
     | bigint
     | boolean
     | RegExp
     | null;
}
  | {
  kind: "expression";
  node: TSESTree.JSXExpressionContainer["expression"];
  toStatic: unknown;
}
  | {
  kind: "spreadProps";
  node: TSESTree.JSXSpreadAttribute["argument"];
  getProperty: unknown;
  toStatic: null;
}
  | {
  kind: "spreadChild";
  node: TSESTree.JSXSpreadChild["expression"];
  getChildren: unknown;
  toStatic: null;
};
```

Represents possible JSX attribute value types that can be resolved
