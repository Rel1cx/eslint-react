[@eslint-react/tools](../README.md) / [F](../modules/F.md) / FunctionN

# Interface: FunctionN\<A, B\>

[F](../modules/F.md).FunctionN

**`Example`**

```ts
import { FunctionN } from "effect/Function";

export const sum: FunctionN<[number, number], number> = (a, b) => a + b;
```

**`Since`**

2.0.0

## Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `A`  | extends `ReadonlyArray`\<`unknown`\> |
| `B`  | `B`                                  |

## Callable

### FunctionN

▸ **FunctionN**(`...args`): `B`

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `...args` | `A`  |

#### Returns

`B`
