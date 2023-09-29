[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [E](../modules/src_lib_primitives.E.md) / EitherUnify

# Interface: EitherUnify<A\>

[src/lib/primitives](../modules/src_lib_primitives.md).[E](../modules/src_lib_primitives.E.md).EitherUnify

**`Since`**

1.0.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Object` |

## Table of contents

### Properties

- [Either](src_lib_primitives.E.EitherUnify.md#either)

## Properties

### Either

• `Optional` **Either**: () => `A`[typeof `typeSymbol`] extends [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> \| `_` ? [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> \| `_` ? [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> \| `_` ? [`Either`](../modules/src_lib_primitives.E.md#either)<`E0`, `A0`\> : `never`

#### Defined in

node_modules/@effect/data/Either.d.ts:65
