[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [F](../modules/src_lib_primitives.F.md) / LazyArg

# Interface: LazyArg<A\>

[src/lib/primitives](../modules/src_lib_primitives.md).[F](../modules/src_lib_primitives.F.md).LazyArg

A lazy argument.

**`Example`**

```ts
import { LazyArg, constant } from "@effect/data/Function"

export const constNull: LazyArg<null> = constant(null)
```

**`Since`**

1.0.0

## Type parameters

| Name |
| :------ |
| `A` |

## Callable

### LazyArg

▸ **LazyArg**(): `A`

#### Returns

`A`
