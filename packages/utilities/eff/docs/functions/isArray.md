[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isArray

# Function: isArray()

> **isArray**\<`T`\>(`data`): `data is NarrowedTo<T, readonly unknown[]>`

A function that checks if the passed parameter is an Array and narrows its type accordingly.

## Type Parameters

• **T**

## Parameters

### data

The variable to check.

`T` | `ArrayLike`\<`unknown`\>

## Returns

`data is NarrowedTo<T, readonly unknown[]>`

True if the passed input is an Array, false otherwise. s
