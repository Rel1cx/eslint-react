[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / Do

# Variable: Do

> `const` **Do**: [`Either`](../type-aliases/Either.md)\<\{\}\>

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `bind` and `let`.

Here's how the do simulation works:

1. Start the do simulation using the `Do` value
2. Within the do simulation scope, you can use the `bind` function to define variables and bind them to `Either` values
3. You can accumulate multiple `bind` statements to define multiple variables within the scope
4. Inside the do simulation scope, you can also use the `let` function to define variables and bind them to simple values

## See

 - [bind](../functions/bind.md)
 - [bindTo](../functions/bindTo.md)
 - [let](../functions/let.md)

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
