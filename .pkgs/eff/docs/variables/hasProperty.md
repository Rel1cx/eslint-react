[@local/eff](../README.md) / hasProperty

# Variable: hasProperty

```ts
const hasProperty: {
<P>  (property: P): (data: unknown) => data is { [K in PropertyKey]: unknown };
<P>  (data: unknown, property: P): data is { [K in PropertyKey]: unknown };
};
```

Checks whether a value has a given property key.

**When to use**

Use when you need a `Predicate` guard for property access on `unknown`
values with a simple structural object check.

**Details**

Uses the `in` operator and `isObjectKeyword`. This does not check property
value types.

**Example** (Guarding object properties)

```ts
import { Predicate } from "effect"

const hasName = Predicate.hasProperty("name")
const data: unknown = { name: "Ada" }

if (hasName(data)) {
  data.name // => "Ada"
}
```

## Call Signature

```ts
<P extends PropertyKey>(property: P): (data: unknown) => data is { [K in PropertyKey]: unknown };
```

### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* `PropertyKey` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `property` | `P` |

### Returns

(`data`: `unknown`) => `data is { [K in PropertyKey]: unknown }`

## Call Signature

```ts
<P extends PropertyKey>(data: unknown, property: P): data is { [K in PropertyKey]: unknown };
```

### Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* `PropertyKey` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `unknown` |
| `property` | `P` |

### Returns

`data is { [K in PropertyKey]: unknown }`

## See

 - isTagged
 - [isObjectKeyword](../functions/isObjectKeyword.md)

## Since

2.0.0
