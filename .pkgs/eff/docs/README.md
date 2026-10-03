# @local/eff

## array

| Variable                            | Description                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| [dropWhile](variables/dropWhile.md) | Drops the longest prefix of elements from an array that satisfy the given predicate. |
| [takeWhile](variables/takeWhile.md) | Takes the longest prefix of elements from an array that satisfy the given predicate. |

## caching

| Function                        | Description                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| [memoize](functions/memoize.md) | Creates a memoized function whose input is an object, caching results by object identity. |

## combinators

| Name                                        | Description                                                                                                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [compose](variables/compose.md)             | Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`. The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`. |
| [dual](variables/dual.md)                   | Creates a function that can be called in data-first style or data-last (`pipe`-friendly) style.                                                                                                                                                                       |
| [and](functions/and.md)                     | A function that takes two guard functions as predicates and returns a guard that checks if both of them are true.                                                                                                                                                     |
| [apply](functions/apply.md)                 | Applies a function to a given value.                                                                                                                                                                                                                                  |
| [eqv](functions/eqv.md)                     | Creates a predicate that returns `true` when both predicates agree on the result.                                                                                                                                                                                     |
| [flip](functions/flip.md)                   | Reverses the order of arguments for a curried function.                                                                                                                                                                                                               |
| [flow](functions/flow.md)                   | Performs left-to-right function composition.                                                                                                                                                                                                                          |
| [identity](functions/identity.md)           | Returns its input argument unchanged.                                                                                                                                                                                                                                 |
| [implies](functions/implies.md)             | Creates a predicate representing logical implication: if `antecedent`, then `consequent`.                                                                                                                                                                             |
| [nand](functions/nand.md)                   | Creates a predicate that returns `true` unless both predicates are `true`.                                                                                                                                                                                            |
| [nor](functions/nor.md)                     | Creates a predicate that returns `true` when neither predicate is `true`.                                                                                                                                                                                             |
| [not](functions/not.md)                     | A function that takes a guard function as predicate and returns a guard that negates it.                                                                                                                                                                              |
| [or](functions/or.md)                       | A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.                                                                                                                                                    |
| [pipe](functions/pipe.md)                   | Pipes the value of an expression through a left-to-right sequence of functions.                                                                                                                                                                                       |
| [pipeArguments](functions/pipeArguments.md) | Applies a `pipe` method's variadic arguments to an initial value from left to right.                                                                                                                                                                                  |
| [SK](functions/SK.md)                       | Returns the second argument and discards the first. The SK combinator is a fundamental combinator in the lambda calculus and the SKI combinator calculus.                                                                                                             |
| [tupled](functions/tupled.md)               | Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.                                                                                                                                                              |
| [untupled](functions/untupled.md)           | Converts a tupled function back to an uncurried function.                                                                                                                                                                                                             |
| [xor](functions/xor.md)                     | Creates a predicate that returns `true` if exactly one of the two predicates is `true`.                                                                                                                                                                               |

## combining

| Function                    | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| [every](functions/every.md) | Creates a predicate that returns `true` if all predicates in the collection return `true`. |
| [some](functions/some.md)   | Creates a predicate that returns `true` if any predicate in the collection returns `true`. |

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

| Function                                        | Description                                                                                                     |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [hasProperty](functions/hasProperty.md)         | Checks whether a value has a given property key.                                                                |
| [isArray](functions/isArray.md)                 | A function that checks if the passed parameter is an Array and narrows its type accordingly.                    |
| [isBigInt](functions/isBigInt.md)               | A function that checks if the passed parameter is a bigint and narrows its type accordingly.                    |
| [isBoolean](functions/isBoolean.md)             | A function that checks if the passed parameter is a boolean and narrows its type accordingly.                   |
| [isDate](functions/isDate.md)                   | A function that checks if the passed parameter is a `Date` and narrows its type accordingly.                    |
| [isError](functions/isError.md)                 | A function that checks if the passed parameter is an `Error` and narrows its type accordingly.                  |
| [isFunction](functions/isFunction.md)           | Tests if a value is a `function`.                                                                               |
| [isIterable](functions/isIterable.md)           | A function that checks if the passed parameter is iterable and narrows its type accordingly.                    |
| [isMap](functions/isMap.md)                     | A function that checks if the passed parameter is a `Map` and narrows its type accordingly.                     |
| [isNever](functions/isNever.md)                 | A guard that always returns `false`.                                                                            |
| [isNotNull](functions/isNotNull.md)             | A refinement that checks if the passed parameter is not `null`, preserving other falsy values.                  |
| [isNotNullish](functions/isNotNullish.md)       | A refinement that checks if the passed parameter is not `null` and not `undefined`, keeping other falsy values. |
| [isNotUndefined](functions/isNotUndefined.md)   | A refinement that checks if the passed parameter is not `undefined`, preserving other falsy values.             |
| [isNull](functions/isNull.md)                   | A function that checks if the passed parameter is `null` and narrows its type accordingly.                      |
| [isNullish](functions/isNullish.md)             | A function that checks if the passed parameter is `null` or `undefined` and narrows its type accordingly.       |
| [isNumber](functions/isNumber.md)               | A function that checks if the passed parameter is a number and narrows its type accordingly.                    |
| [isObject](functions/isObject.md)               | Checks if the given parameter is of type `"object"` via `typeof`, excluding `null`.                             |
| [isObjectKeyword](functions/isObjectKeyword.md) | Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions), excluding `null`.   |
| [isObjectOrArray](functions/isObjectOrArray.md) | Checks whether a value is an object or an array (any non-null object).                                          |
| [isPromise](functions/isPromise.md)             | A function that checks if the passed parameter is a `Promise`-like object with `then` and `catch` methods.      |
| [isPromiseLike](functions/isPromiseLike.md)     | A function that checks if the passed parameter is `PromiseLike` (has a callable `then` method).                 |
| [isPropertyKey](functions/isPropertyKey.md)     | A function that checks if the passed parameter is a valid property key (string, number, or symbol).             |
| [isRegExp](functions/isRegExp.md)               | A function that checks if the passed parameter is a `RegExp` and narrows its type accordingly.                  |
| [isSet](functions/isSet.md)                     | A function that checks if the passed parameter is a `Set` and narrows its type accordingly.                     |
| [isString](functions/isString.md)               | A function that checks if the passed parameter is a string and narrows its type accordingly.                    |
| [isSymbol](functions/isSymbol.md)               | A function that checks if the passed parameter is a symbol and narrows its type accordingly.                    |
| [isTruthy](functions/isTruthy.md)               | A function that checks if the passed parameter is truthy and narrows its type accordingly.                      |
| [isUint8Array](functions/isUint8Array.md)       | A function that checks if the passed parameter is a `Uint8Array` and narrows its type accordingly.              |
| [isUndefined](functions/isUndefined.md)         | A function that checks if the passed parameter is `undefined` and narrows its type accordingly.                 |
| [isUnknown](functions/isUnknown.md)             | A guard that always returns `true`.                                                                             |

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
