[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / bind

# Function: bind()

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Either` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values

## See

 - [Do](../variables/Do.md)
 - [bindTo](bindTo.md)
 - [let](let.md)

## Example

```ts
import { Either, pipe } from "effect"

const result = pipe(
  Either.Do,
  Either.bind("x", () => Either.right(2)),
  Either.bind("y", () => Either.right(3)),
  Either.let("sum", ({ x, y }) => x + y)
)
assert.deepStrictEqual(result, Either.right({ x: 2, y: 3, sum: 5 }))
```

## Since

2.0.0

## bind(name, f)

> **bind**\<`N`, `A`, `B`, `L2`\>(`name`, `f`): \<`L1`\>(`self`) => [`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}, `L2` \| `L1`\>

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Either` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values

### Type Parameters

• **N** *extends* `string`

• **A** *extends* `object`

• **B**

• **L2**

### Parameters

• **name**: `Exclude`\<`N`, keyof `A`\>

• **f**

### Returns

`Function`

#### Type Parameters

• **L1**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`A`, `L1`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}, `L2` \| `L1`\>

### See

 - [Do](../variables/Do.md)
 - [bindTo](bindTo.md)
 - [let](let.md)

### Example

```ts
import { Either, pipe } from "effect"

const result = pipe(
  Either.Do,
  Either.bind("x", () => Either.right(2)),
  Either.bind("y", () => Either.right(3)),
  Either.let("sum", ({ x, y }) => x + y)
)
assert.deepStrictEqual(result, Either.right({ x: 2, y: 3, sum: 5 }))
```

### Since

2.0.0

## bind(self, name, f)

> **bind**\<`A`, `L1`, `N`, `B`, `L2`\>(`self`, `name`, `f`): [`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}, `L1` \| `L2`\>

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Either` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values

### Type Parameters

• **A** *extends* `object`

• **L1**

• **N** *extends* `string`

• **B**

• **L2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`A`, `L1`\>

• **name**: `Exclude`\<`N`, keyof `A`\>

• **f**

### Returns

[`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}, `L1` \| `L2`\>

### See

 - [Do](../variables/Do.md)
 - [bindTo](bindTo.md)
 - [let](let.md)

### Example

```ts
import { Either, pipe } from "effect"

const result = pipe(
  Either.Do,
  Either.bind("x", () => Either.right(2)),
  Either.bind("y", () => Either.right(3)),
  Either.let("sum", ({ x, y }) => x + y)
)
assert.deepStrictEqual(result, Either.right({ x: 2, y: 3, sum: 5 }))
```

### Since

2.0.0
