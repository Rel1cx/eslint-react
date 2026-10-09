[@local/eff](../README.md) / not

# Function: not()

## Call Signature

```ts
function not<T, S>(predicate: (data: T) => data is S): (data: T) => data is Exclude<T, S>;
```

Negates a predicate.

**When to use**

Use when you want the inverse of an existing predicate.

**Details**

Returns a new predicate that flips the boolean result.

**Example** (Negating a predicate)

```ts
import { Predicate } from "effect"

const isNotString = Predicate.not(Predicate.isString)

isNotString(1) // => true
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `predicate` | (`data`: `T`) => `data is S` |

### Returns

(`data`: `T`) => `data is Exclude<T, S>`

### See

 - [and](../variables/and.md)
 - [or](../variables/or.md)
 - [xor](../variables/xor.md)

### Since

2.0.0

## Call Signature

```ts
function not<T>(predicate: (data: T) => boolean): (data: T) => boolean;
```

Negates a predicate.

**When to use**

Use when you want the inverse of an existing predicate.

**Details**

Returns a new predicate that flips the boolean result.

**Example** (Negating a predicate)

```ts
import { Predicate } from "effect"

const isNotString = Predicate.not(Predicate.isString)

isNotString(1) // => true
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `predicate` | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `boolean`

### See

 - [and](../variables/and.md)
 - [or](../variables/or.md)
 - [xor](../variables/xor.md)

### Since

2.0.0
