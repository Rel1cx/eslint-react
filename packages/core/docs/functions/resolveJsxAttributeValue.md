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

Resolves the static value of a JSX attribute or spread attribute

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `attribute` | `TSESTreeJSXAttributeLike` | The JSX attribute node to resolve |

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

An object containing the value kind, the node (if applicable), and a `toStatic` helper
