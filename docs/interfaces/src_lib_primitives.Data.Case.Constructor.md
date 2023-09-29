[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [Data](../modules/src_lib_primitives.Data.md) / [Case](../modules/src_lib_primitives.Data.Case.md) / Constructor

# Interface: Constructor<A, T\>

[Data](../modules/src_lib_primitives.Data.md).[Case](../modules/src_lib_primitives.Data.Case.md).Constructor

**`Since`**

1.0.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Case`](src_lib_primitives.Data.Case-1.md) |
| `T` | extends keyof `A` = `never` |

## Callable

### Constructor

▸ **Constructor**(`args`): `A`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Omit`<`A`, `T` \| keyof `Equal`\> extends `Record`<`PropertyKey`, `never`\> ? `void` : `Omit`<`A`, `T` \| keyof `Equal`\> |

#### Returns

`A`
