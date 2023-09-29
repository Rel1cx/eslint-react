[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [F](../modules/src_lib_primitives.F.md) / FunctionN

# Interface: FunctionN<A, B\>

[src/lib/primitives](../modules/src_lib_primitives.md).[F](../modules/src_lib_primitives.F.md).FunctionN

**`Example`**

```ts
import { FunctionN } from "@effect/data/Function"

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

**`Since`**

1.0.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `ReadonlyArray`<`unknown`\> |
| `B` | `B` |

## Callable

### FunctionN

▸ **FunctionN**(`...args`): `B`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

#### Returns

`B`

#### Defined in

node_modules/@effect/data/Function.d.ts:109
