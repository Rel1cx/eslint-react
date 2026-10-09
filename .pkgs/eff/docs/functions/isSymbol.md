[@local/eff](../README.md) / isSymbol

# Function: isSymbol()

```ts
function isSymbol(input: unknown): input is symbol;
```

Checks whether a value is a `symbol`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
symbol.

**Details**

Uses `typeof input === "symbol"`.

**Example** (Guarding symbols)

```ts
import { Predicate } from "effect"

const data: unknown = Symbol.for("id")

if (Predicate.isSymbol(data)) {
  data.description // => "id"
}
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is symbol`

## See

[isPropertyKey](isPropertyKey.md)

## Since

2.0.0
