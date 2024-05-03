[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / UnionToIntersection

# Type alias: UnionToIntersection\<U\>

> **UnionToIntersection**\<`U`\>: `U` *extends* `unknown` ? (`k`) => `void` : `never` *extends* (`k`) => `void` ? `I` : `never`

## Since

0.0.1

## Template

The type to get the intersection from

## Example

```ts
type Result = IntersectionFromTuple<['foo', 'bar', 1]>
// Result = 'foo' & 'bar' & 1
```

## Type parameters

• **U**
