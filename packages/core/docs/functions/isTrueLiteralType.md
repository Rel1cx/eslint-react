[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isTrueLiteralType

# Function: isTrueLiteralType()

> **isTrueLiteralType**(`type`): `type is TrueLiteralType`

Determines whether the given type is a boolean literal type for "true".

## Parameters

### type

`Type`

## Returns

`type is TrueLiteralType`

## Example

```ts
declare const type: ts.Type;

if (isTrueLiteralType(type)) {
  // ...
}
```
