[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

> **resolveAttributeValue**(`context`, `attribute`): \{ `kind`: `"boolean"`; `node?`: `undefined`; `toStatic`: `true`; \} \| \{ `kind`: `"literal"`; `node`: `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral`; `toStatic`: `null` \| `string` \| `number` \| `bigint` \| `boolean` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); \} \| \{ `kind`: `"expression"`; `node`: `JSXEmptyExpression` \| `Expression`; `toStatic`: `unknown`; \} \| \{ `kind`: `"element"`; `node`: `JSXElement`; `toStatic`: `undefined`; \} \| \{ `kind`: `"spreadChild"`; `node`: `JSXEmptyExpression` \| `Expression`; `toStatic`: `undefined`; \} \| \{ `kind`: `"spreadProps"`; `node`: `Expression`; `toStatic`: `unknown`; \}

## Parameters

### context

`RuleContext`

### attribute

`TSESTreeJSXAttributeLike`

## Returns

\{ `kind`: `"boolean"`; `node?`: `undefined`; `toStatic`: `true`; \} \| \{ `kind`: `"literal"`; `node`: `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral`; `toStatic`: `null` \| `string` \| `number` \| `bigint` \| `boolean` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); \} \| \{ `kind`: `"expression"`; `node`: `JSXEmptyExpression` \| `Expression`; `toStatic`: `unknown`; \} \| \{ `kind`: `"element"`; `node`: `JSXElement`; `toStatic`: `undefined`; \} \| \{ `kind`: `"spreadChild"`; `node`: `JSXEmptyExpression` \| `Expression`; `toStatic`: `undefined`; \} \| \{ `kind`: `"spreadProps"`; `node`: `Expression`; `toStatic`: `unknown`; \}
