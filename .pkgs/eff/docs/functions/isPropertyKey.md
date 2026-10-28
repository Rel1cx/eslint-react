[@local/eff](../README.md) / isPropertyKey

# Function: isPropertyKey()

```ts
function isPropertyKey(u: unknown): u is PropertyKey;
```

Checks whether a value is a valid `PropertyKey` (string, number, or symbol).

**When to use**

Use when you need a type guard for unknown property keys before
indexing.

**Details**

Uses `isString`, `isNumber`, and `isSymbol`.

**Example** (Guarding property keys)

```ts
import { isPropertyKey } from "@local/eff";

const key: unknown = "name";
const obj: Record<PropertyKey, unknown> = { name: "Ada" };

if (isPropertyKey(key) && key in obj) {
  obj[key]; // => "Ada"
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `u`       | `unknown` |

## Returns

`u is PropertyKey`

## See

- [isString](isString.md)
- [isNumber](isNumber.md)
- [isSymbol](isSymbol.md)

## Since

4.0.0
