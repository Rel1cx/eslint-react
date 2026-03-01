[@eslint-react/core](../README.md) / resolveJsxAttributeValue

# Function: resolveJsxAttributeValue()

```ts
function resolveJsxAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike): 
  | {
  kind: "boolean";
  node?: undefined;
  getChildren?: ;
  toStatic: true;
}
  | {
  kind: "literal";
  node:   | BigIntLiteral
     | BooleanLiteral
     | NullLiteral
     | NumberLiteral
     | RegExpLiteral
     | StringLiteral;
  getChildren?: ;
  toStatic:   | string
     | number
     | bigint
     | boolean
     | RegExp
     | null;
}
  | {
  kind: "missing";
  node: JSXEmptyExpression;
  getChildren?: ;
  toStatic: "{}";
}
  | {
  kind: "expression";
  node: Expression;
  getChildren?: ;
  toStatic: unknown;
}
  | {
  kind: "element";
  node: JSXElement;
  getChildren?: ;
  toStatic: null;
}
  | {
  kind: "spreadChild";
  node: JSXEmptyExpression | Expression;
  getChildren: null;
  toStatic: unknown;
}
  | {
  kind: "spreadProps";
  node: Expression;
  getProperty: unknown;
  toStatic: unknown;
};
```

Resolve the static value of a JSX attribute or spread attribute

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `attribute` | `TSESTreeJSXAttributeLike` | The JSX attribute node to resolve |

## Returns

  \| \{
  `kind`: `"boolean"`;
  `node?`: `undefined`;
  `getChildren?`: ;
  `toStatic`: `true`;
\}
  \| \{
  `kind`: `"literal"`;
  `node`:   \| `BigIntLiteral`
     \| `BooleanLiteral`
     \| `NullLiteral`
     \| `NumberLiteral`
     \| `RegExpLiteral`
     \| `StringLiteral`;
  `getChildren?`: ;
  `toStatic`:   \| `string`
     \| `number`
     \| `bigint`
     \| `boolean`
     \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
     \| `null`;
\}
  \| \{
  `kind`: `"missing"`;
  `node`: `JSXEmptyExpression`;
  `getChildren?`: ;
  `toStatic`: `"{}"`;
\}
  \| \{
  `kind`: `"expression"`;
  `node`: `Expression`;
  `getChildren?`: ;
  `toStatic`: `unknown`;
\}
  \| \{
  `kind`: `"element"`;
  `node`: `JSXElement`;
  `getChildren?`: ;
  `toStatic`: `null`;
\}
  \| \{
  `kind`: `"spreadChild"`;
  `node`: `JSXEmptyExpression` \| `Expression`;
  `getChildren`: `null`;
  `toStatic`: `unknown`;
\}
  \| \{
  `kind`: `"spreadProps"`;
  `node`: `Expression`;
  `getProperty`: `unknown`;
  `toStatic`: `unknown`;
\}

An object containing the value kind, the node (if applicable), and a `toStatic` helper
