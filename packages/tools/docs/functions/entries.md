[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / entries

# Function: entries()

> **entries**\<`T`\>(`value`): \{ \[K in string \| number \| symbol\]-?: \[K, T\[K\]\] \}\[keyof `T`\][]

type-safe version of Object.entries

## Type Parameters

• **T** *extends* [`LooseRecord`](../type-aliases/LooseRecord.md)\<`unknown`\>

## Parameters

• **value**: `T`

The value to get the entries from.

## Returns

\{ \[K in string \| number \| symbol\]-?: \[K, T\[K\]\] \}\[keyof `T`\][]

The entries of the value.

## Since

0.4.0
