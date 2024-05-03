[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / narrow

# Function: narrow()

> **narrow**\<`TType`\>(`a`): [`Narrow`](../type-aliases/Narrow.md)\<`TType`\>

Infers embedded primitive type of any type
Same as `as const` but without setting the object as readonly and without needing the user to use it.

## Type parameters

• **TType**

## Parameters

• **a**: [`Narrow`](../type-aliases/Narrow.md)\<`TType`\>

Value to infer

## Returns

[`Narrow`](../type-aliases/Narrow.md)\<`TType`\>

Value with embedded type inferred

## Since

0.0.1

## Example

```ts
const result = narrow(['foo', 'bar', 1])
```
