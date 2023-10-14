[@eslint-react/tools](../README.md) / [Data](../modules/Data.md) / [Case](../modules/Data.Case.md) / Constructor

# Interface: Constructor<A, T\>

[Data](../modules/Data.md).[Case](../modules/Data.Case.md).Constructor

**`Since`**

2.0.0

## Type parameters

| Name | Type                             |
| :--- | :------------------------------- |
| `A`  | extends [`Case`](Data.Case-1.md) |
| `T`  | extends keyof `A` = `never`      |

## Callable

### Constructor

▸ **Constructor**(`args`): `A`

#### Parameters

| Name   | Type                                                                                                                                                           |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Omit`<`A`, `T` \| keyof [`Equal`](Equal.Equal.md)\> extends `Record`<`PropertyKey`, `never`\> ? `void` : `Omit`<`A`, `T` \| keyof [`Equal`](Equal.Equal.md)\> |

#### Returns

`A`
