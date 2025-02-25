[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ReadonlyOutput

# Type Alias: ReadonlyOutput\<TInput\>

> **ReadonlyOutput**\<`TInput`\>: `TInput` *extends* [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<infer TKey, infer TValue\> ? `ReadonlyMap`\<`TKey`, `TValue`\> : `TInput` *extends* [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<infer TValue\> ? `ReadonlySet`\<`TValue`\> : [`Readonly`](Readonly.md)\<`TInput`\>

Readonly output type.

## Type Parameters

• **TInput**
