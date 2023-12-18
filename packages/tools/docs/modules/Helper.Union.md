[@eslint-react/tools](../README.md) / [Helper](Helper.md) / Union

# Namespace: Union

[Helper](Helper.md).Union

## Table of contents

### Type Aliases

- [UnionFromTuple](Helper.Union.md#unionfromtuple)
- [UnionToIntersection](Helper.Union.md#uniontointersection)

## Type Aliases

### UnionFromTuple

Ƭ **UnionFromTuple**\<`T`\>: `T` extends infer U[] ? `U` : `never`

**`Since`**

0.0.1

**`Example`**

```ts
type Result = UnionFromTuple<['foo', 'bar', 1]>
// Result = 'foo' | 'bar' | 1
```

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type to get the union from |

___

### UnionToIntersection

Ƭ **UnionToIntersection**\<`U`\>: `U` extends `unknown` ? (`k`: `U`) => `void` : `never` extends (`k`: infer I) => `void` ? `I` : `never`

**`Since`**

0.0.1

**`Template`**

The type to get the intersection from

**`Example`**

```ts
type Result = IntersectionFromTuple<['foo', 'bar', 1]>
// Result = 'foo' & 'bar' & 1
```

#### Type parameters

| Name |
| :------ |
| `U` |
