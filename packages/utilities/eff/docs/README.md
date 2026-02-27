# @eslint-react/eff

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [NarrowedTo](type-aliases/NarrowedTo.md) | An extension of Extract for type predicates which falls back to the base in order to narrow the `unknown` case. |
| [Pretty](type-aliases/Pretty.md) | Simplifies a complex type intersection into a flat object type for better readability in IDE tooltips and error messages. |
| [unit](type-aliases/unit.md) | alias for `undefined`. |

## Variables

| Variable | Description |
| ------ | ------ |
| [compose](variables/compose.md) | Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`. The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`. |
| [dual](variables/dual.md) | Creates a function that can be used in a data-last (aka `pipe`able) or data-first style. |
| [unit](variables/unit.md) | alias for `undefined`. |

## Functions

| Function | Description |
| ------ | ------ |
| [absurd](functions/absurd.md) | The `absurd` function is a stub for cases where a value of type `never` is encountered in your code, meaning that it should be impossible for this code to be executed. |
| [apply](functions/apply.md) | Apply a function to a given value. |
| [constant](functions/constant.md) | Returns a function that always returns the same value. |
| [constFalse](functions/constFalse.md) | Do nothing and return `false`. |
| [constNull](functions/constNull.md) | Do nothing and return `null`. |
| [constTrue](functions/constTrue.md) | Do nothing and return `true`. |
| [constVoid](functions/constVoid.md) | Do nothing and return `void`. |
| [flip](functions/flip.md) | Reverses the order of arguments for a curried function. |
| [flow](functions/flow.md) | Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary. |
| [getOrElse](functions/getOrElse.md) | Retrieves a value from a Map or WeakMap if the key exists, or computes a new value if it doesn't. |
| [getOrElseUpdate](functions/getOrElseUpdate.md) | Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't. |
| [identity](functions/identity.md) | Returns its argument. |
| [isArray](functions/isArray.md) | A function that checks if the passed parameter is an Array and narrows its type accordingly. |
| [isFunction](functions/isFunction.md) | Tests if a value is a `function`. |
| [isObject](functions/isObject.md) | Checks if the given parameter is of type `"object"` via `typeof`, excluding `null`. |
| [isTruthy](functions/isTruthy.md) | A function that checks if the passed parameter is truthy and narrows its type accordingly. |
| [not](functions/not.md) | A function that takes a guard function as predicate and returns a guard that negates it. |
| [or](functions/or.md) | A function that takes two guard functions as predicates and returns a guard that checks if either of them is true. |
| [pipe](functions/pipe.md) | Pipes the value of an expression into a pipeline of functions. |
| [pipeArguments](functions/pipeArguments.md) | Applies a pipeline of functions to a value, passing the result of each function to the next one in sequence. |
| [tryAddToSet](functions/tryAddToSet.md) | Attempts to add a value to a Set, but only if it doesn't already exist. |
| [tupled](functions/tupled.md) | Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument. |
| [untupled](functions/untupled.md) | Inverse function of `tupled`. |
