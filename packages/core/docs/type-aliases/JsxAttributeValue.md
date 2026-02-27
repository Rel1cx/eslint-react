[@eslint-react/core](../README.md) / JsxAttributeValue

# Type Alias: JsxAttributeValue

```ts
type JsxAttributeValue = 
  | {
  kind: "boolean";
  toStatic: true;
}
  | {
  kind: "element";
  node: TSESTree.JSXElement;
  toStatic: unknown;
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
  toStatic: unknown;
}
  | {
  kind: "spreadChild";
  node: TSESTree.JSXSpreadChild["expression"];
  toStatic: unknown;
};
```

Represents possible JSX attribute value types that can be resolved
