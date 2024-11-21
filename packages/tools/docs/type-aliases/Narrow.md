[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / Narrow

# Type Alias: Narrow\<TType\>

> **Narrow**\<`TType`\>: `TType` *extends* [] ? [] : `never` \| `TType` *extends* `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never` \| `TType` *extends* `Function` ? `TType` : `never` \| `{ [K in keyof TType]: Narrow<TType[K]> }`

Infers embedded primitive type of any type

## Type Parameters

• **TType**

## Since

0.0.1

## Param

Type to infer

## Returns

Embedded type of [TType](Narrow.md)

## Example

```ts
type Result = Narrow<['foo', 'bar', 1]>
```

## See

https://twitter.com/hd_nvim/status/1578567206190780417
