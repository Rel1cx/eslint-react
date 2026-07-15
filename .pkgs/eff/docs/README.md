# @local/eff

## caching

| Function                        | Description                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| [memoize](functions/memoize.md) | Creates a memoized function whose input is an object, caching results by object identity. |

## combinators

| Name                                        | Description                                                                                                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [compose](variables/compose.md)             | Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`. The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`. |
| [dual](variables/dual.md)                   | Creates a function that can be called in data-first style or data-last (`pipe`-friendly) style.                                                                                                                                                                       |
| [apply](functions/apply.md)                 | Applies a function to a given value.                                                                                                                                                                                                                                  |
| [flip](functions/flip.md)                   | Reverses the order of arguments for a curried function.                                                                                                                                                                                                               |
| [flow](functions/flow.md)                   | Performs left-to-right function composition.                                                                                                                                                                                                                          |
| [identity](functions/identity.md)           | Returns its input argument unchanged.                                                                                                                                                                                                                                 |
| [pipe](functions/pipe.md)                   | Pipes the value of an expression through a left-to-right sequence of functions.                                                                                                                                                                                       |
| [pipeArguments](functions/pipeArguments.md) | Applies a `pipe` method's variadic arguments to an initial value from left to right.                                                                                                                                                                                  |
| [SK](functions/SK.md)                       | Returns the second argument and discards the first. The SK combinator is a fundamental combinator in the lambda calculus and the SKI combinator calculus.                                                                                                             |
| [tupled](functions/tupled.md)               | Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.                                                                                                                                                              |
| [untupled](functions/untupled.md)           | Converts a tupled function back to an uncurried function.                                                                                                                                                                                                             |

## constants

| Variable                                      | Description                              |
| --------------------------------------------- | ---------------------------------------- |
| [constFalse](variables/constFalse.md)         | Returns `false` when called.             |
| [constNull](variables/constNull.md)           | Returns `null` when called.              |
| [constTrue](variables/constTrue.md)           | Returns `true` when called.              |
| [constUndefined](variables/constUndefined.md) | Returns `undefined` when called.         |
| [constVoid](variables/constVoid.md)           | Returns no meaningful value when called. |

## constructors

| Name                              | Description                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| [Class](variables/Class.md)       | Provides a base constructor whose instances implement the standard `Pipeable.pipe` method. |
| [constant](functions/constant.md) | Creates a zero-argument function that always returns the provided value.                   |
| [Mixin](functions/Mixin.md)       | Returns a subclass of the provided class that adds the standard `pipe` method.             |

## guards

| Function                              | Description                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [isArray](functions/isArray.md)       | A function that checks if the passed parameter is an Array and narrows its type accordingly.                       |
| [isFunction](functions/isFunction.md) | Tests if a value is a `function`.                                                                                  |
| [isObject](functions/isObject.md)     | Checks if the given parameter is of type `"object"` via `typeof`, excluding `null`.                                |
| [isTruthy](functions/isTruthy.md)     | A function that checks if the passed parameter is truthy and narrows its type accordingly.                         |
| [not](functions/not.md)               | A function that takes a guard function as predicate and returns a guard that negates it.                           |
| [or](functions/or.md)                 | A function that takes two guard functions as predicates and returns a guard that checks if either of them is true. |

## map & set

| Function                                                | Description                                                                                                      |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [getOrInsert](functions/getOrInsert.md)                 | Retrieves a value from a Map or WeakMap if the key exists, or inserts and returns a default value if it doesn't. |
| [getOrInsertComputed](functions/getOrInsertComputed.md) | Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.     |

## models

| Name                                                     | Description                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| [Pipeable](interfaces/Pipeable.md)                       | Interface for values that support method-style `pipe` composition. |
| [PipeableConstructor](interfaces/PipeableConstructor.md) | Constructor type for classes whose instances implement `Pipeable`. |
| [FunctionN](type-aliases/FunctionN.md)                   | Represents a function with multiple arguments.                     |
| [LazyArg](type-aliases/LazyArg.md)                       | A zero-argument function that produces a value when invoked.       |

## prototypes

| Variable                            | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| [Prototype](variables/Prototype.md) | Reusable prototype that implements `Pipeable.pipe`. |

## utility types

| Name                                     | Description                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [NarrowedTo](type-aliases/NarrowedTo.md) | An extension of Extract for type predicates which falls back to the base in order to narrow the `unknown` case.           |
| [Pretty](type-aliases/Pretty.md)         | Simplifies a complex type intersection into a flat object type for better readability in IDE tooltips and error messages. |
| [cast](variables/cast.md)                | Returns the input value with a different static type.                                                                     |
| [hole](variables/hole.md)                | Creates a compile-time placeholder for a value of any type.                                                               |
| [absurd](functions/absurd.md)            | Marks an impossible branch by accepting a `never` value and returning any type.                                           |
| [satisfies](functions/satisfies.md)      | Ensures that the type of an expression matches some type, without changing the resulting type of that expression.         |
