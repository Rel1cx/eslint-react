[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / JsxAttributeValue

# Type Alias: JsxAttributeValue

> **JsxAttributeValue** = \{ `kind`: `"boolean"`; `toStatic`: `true`; \} \| \{ `kind`: `"element"`; `node`: `TSESTree.JSXElement`; `toStatic`: `unknown`; \} \| \{ `kind`: `"literal"`; `node`: `TSESTree.Literal`; `toStatic`: `null` \| `string` \| `number` \| `bigint` \| `boolean` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); \} \| \{ `kind`: `"expression"`; `node`: `TSESTree.JSXExpressionContainer`\[`"expression"`\]; `toStatic`: `unknown`; \} \| \{ `kind`: `"spreadProps"`; `node`: `TSESTree.JSXSpreadAttribute`\[`"argument"`\]; `toStatic`: `unknown`; \} \| \{ `kind`: `"spreadChild"`; `node`: `TSESTree.JSXSpreadChild`\[`"expression"`\]; `toStatic`: `unknown`; \}

Represents possible JSX attribute value types that can be resolved
