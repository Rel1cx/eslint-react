[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / size

# Function: size()

> **size**\<`K`, `A`\>(`self`): `number`

Returns the number of key/value pairs in a record.

## Type Parameters

• **K** *extends* `string`

• **A**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

A record to calculate the number of key/value pairs in.

## Returns

`number`

## Example

```ts
import { size } from "effect/Record";

assert.deepStrictEqual(size({ a: "a", b: 1, c: true }), 3);
```

## Since

2.0.0
