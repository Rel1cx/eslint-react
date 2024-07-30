[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / bindTo

# Function: bindTo()

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Option` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values
5. Regular `Option` functions like `map` and `filter` can still be used within the do simulation. These functions will receive the accumulated variables as arguments within the scope

## See

 - [Do](../variables/Do.md)
 - [bind](bind.md)
 - [let](let.md)

## Example

```ts
import { Option, pipe } from "effect"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y),
  Option.filter(({ x, y }) => x * y > 5)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

## Since

2.0.0

## bindTo(name)

> **bindTo**\<`N`\>(`name`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`{ [K in string]: A }`\>

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Option` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values
5. Regular `Option` functions like `map` and `filter` can still be used within the do simulation. These functions will receive the accumulated variables as arguments within the scope

### Type Parameters

• **N** *extends* `string`

### Parameters

• **name**: `N`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`{ [K in string]: A }`\>

### See

 - [Do](../variables/Do.md)
 - [bind](bind.md)
 - [let](let.md)

### Example

```ts
import { Option, pipe } from "effect"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y),
  Option.filter(({ x, y }) => x * y > 5)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

### Since

2.0.0

## bindTo(self, name)

> **bindTo**\<`A`, `N`\>(`self`, `name`): [`Option`](../type-aliases/Option.md)\<`{ [K in string]: A }`\>

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Option` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values
5. Regular `Option` functions like `map` and `filter` can still be used within the do simulation. These functions will receive the accumulated variables as arguments within the scope

### Type Parameters

• **A**

• **N** *extends* `string`

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **name**: `N`

### Returns

[`Option`](../type-aliases/Option.md)\<`{ [K in string]: A }`\>

### See

 - [Do](../variables/Do.md)
 - [bind](bind.md)
 - [let](let.md)

### Example

```ts
import { Option, pipe } from "effect"

const result = pipe(
  Option.Do,
  Option.bind("x", () => Option.some(2)),
  Option.bind("y", () => Option.some(3)),
  Option.let("sum", ({ x, y }) => x + y),
  Option.filter(({ x, y }) => x * y > 5)
)
assert.deepStrictEqual(result, Option.some({ x: 2, y: 3, sum: 5 }))
```

### Since

2.0.0
