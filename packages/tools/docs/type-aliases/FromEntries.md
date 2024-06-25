[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / FromEntries

# Type Alias: FromEntries\<T\>

> **FromEntries**\<`T`\>: `T` *extends* [infer Key, `unknown`][] ? `{ [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }` : `{ [key in string]: unknown }`

## Type Parameters

• **T**
