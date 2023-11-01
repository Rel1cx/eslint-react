[@eslint-react/tools](../README.md) / [F](../modules/F.md) / LazyArg

# Interface: LazyArg\<A\>

[F](../modules/F.md).LazyArg

A lazy argument.

**`Example`**

```ts
import { LazyArg, constant } from "effect/Function";

export const constNull: LazyArg<null> = constant(null);
```

**`Since`**

2.0.0

## Type parameters

| Name |
| :--- |
| `A`  |

## Callable

### LazyArg

▸ **LazyArg**(): `A`

#### Returns

`A`
