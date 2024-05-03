[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / FromEntries

# Type alias: FromEntries\<T\>

> **FromEntries**\<`T`\>: `T` *extends* [infer Key, `unknown`][] ? `{ [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }` : `{ [key in string]: unknown }`

## Type parameters

• **T**
