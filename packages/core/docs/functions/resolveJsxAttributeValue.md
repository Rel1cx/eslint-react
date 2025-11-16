[@eslint-react/core](../README.md) / resolveJsxAttributeValue

# Function: resolveJsxAttributeValue()

```ts
function resolveJsxAttributeValue(context: RuleContext, attribute: TSESTreeJSXAttributeLike): 
  | {
  kind: "boolean";
  node?: undefined;
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
  toStatic:   | string
     | number
     | bigint
     | boolean
     | RegExp
     | null;
}
  | {
  kind: "expression";
  node: JSXEmptyExpression | Expression;
  toStatic: unknown;
}
  | {
  kind: "element";
  node: JSXElement;
  toStatic: undefined;
}
  | {
  kind: "spreadChild";
  node: JSXEmptyExpression | Expression;
  toStatic: undefined;
}
  | {
  kind: "spreadProps";
  node: Expression;
  toStatic: unknown;
};
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |
| `attribute` | `TSESTreeJSXAttributeLike` |

## Returns

  \| \{
  `kind`: `"boolean"`;
  `node?`: `undefined`;
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
  `toStatic`:   \| `string`
     \| `number`
     \| `bigint`
     \| `boolean`
     \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
     \| `null`;
\}
  \| \{
  `kind`: `"expression"`;
  `node`: `JSXEmptyExpression` \| `Expression`;
  `toStatic`: `unknown`;
\}
  \| \{
  `kind`: `"element"`;
  `node`: `JSXElement`;
  `toStatic`: `undefined`;
\}
  \| \{
  `kind`: `"spreadChild"`;
  `node`: `JSXEmptyExpression` \| `Expression`;
  `toStatic`: `undefined`;
\}
  \| \{
  `kind`: `"spreadProps"`;
  `node`: `Expression`;
  `toStatic`: `unknown`;
\}
