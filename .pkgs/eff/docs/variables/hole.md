[@local/eff](../README.md) / hole

# Variable: hole

```ts
const hole: <T>() => T;
```

Creates a compile-time placeholder for a value of any type.

**When to use**

Use as a temporary typed placeholder while developing incomplete code.

**Gotchas**

`hole` is intended for temporary development use. If the placeholder is
evaluated at runtime, it throws.

**Example** (Creating a development placeholder)

```ts
import { hole } from "effect";

// Intentionally not called: `hole` throws if the placeholder is evaluated.
const buildUser = (id: number): { readonly id: number; readonly name: string } => ({
  id,
  name: hole<string>(),
});

console.log(typeof buildUser); // "function"
```

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Returns

`T`

## Since

2.0.0
