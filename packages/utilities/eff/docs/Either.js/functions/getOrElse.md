[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / getOrElse

# Function: getOrElse()

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

## Since

2.0.0

## Call Signature

> **getOrElse**\<`L`, `R2`\>(`onLeft`): \<`R`\>(`self`) => `R2` \| `R`

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

### Type Parameters

• **L**

• **R2**

### Parameters

#### onLeft

(`left`) => `R2`

### Returns

`Function`

#### Type Parameters

• **R**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

`R2` \| `R`

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **getOrElse**\<`R`, `L`, `R2`\>(`self`, `onLeft`): `R` \| `R2`

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

### Type Parameters

• **R**

• **L**

• **R2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### onLeft

(`left`) => `R2`

### Returns

`R` \| `R2`

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

### Since

2.0.0

### Since

2.0.0
