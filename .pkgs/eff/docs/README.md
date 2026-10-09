# @local/eff

## caching

| Function                        | Description                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [memoize](functions/memoize.md) | Creates a memoized function that caches the result of a synchronous, stable-output computation for any type of key. |

## combinators

| Name                                        | Description                                                                                                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [and](variables/and.md)                     | Creates a predicate that returns `true` only if both predicates are `true`.                                                                                                                                                                                           |
| [compose](variables/compose.md)             | Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`. The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`. |
| [dual](variables/dual.md)                   | Creates a function that can be called in data-first style or data-last (`pipe`-friendly) style.                                                                                                                                                                       |
| [eqv](variables/eqv.md)                     | Creates a predicate that returns `true` when both predicates agree.                                                                                                                                                                                                   |
| [implies](variables/implies.md)             | Creates a predicate representing logical implication: if `antecedent`, then `consequent`.                                                                                                                                                                             |
| [nand](variables/nand.md)                   | Creates a predicate that returns `true` unless both predicates are `true`.                                                                                                                                                                                            |
| [nor](variables/nor.md)                     | Creates a predicate that returns `true` when neither predicate is `true`.                                                                                                                                                                                             |
| [or](variables/or.md)                       | Creates a predicate that returns `true` if either predicate is `true`.                                                                                                                                                                                                |
| [xor](variables/xor.md)                     | Creates a predicate that returns `true` if exactly one predicate is `true`.                                                                                                                                                                                           |
| [apply](functions/apply.md)                 | Applies a function to a given value.                                                                                                                                                                                                                                  |
| [flip](functions/flip.md)                   | Reverses the order of arguments for a curried function.                                                                                                                                                                                                               |
| [flow](functions/flow.md)                   | Performs left-to-right function composition.                                                                                                                                                                                                                          |
| [identity](functions/identity.md)           | Returns its input argument unchanged.                                                                                                                                                                                                                                 |
| [not](functions/not.md)                     | Negates a predicate.                                                                                                                                                                                                                                                  |
| [pipe](functions/pipe.md)                   | Pipes the value of an expression through a left-to-right sequence of functions.                                                                                                                                                                                       |
| [pipeArguments](functions/pipeArguments.md) | Applies a `pipe` method's variadic arguments to an initial value from left to right.                                                                                                                                                                                  |
| [SK](functions/SK.md)                       | Returns the second argument and discards the first. The SK combinator is a fundamental combinator in the lambda calculus and the SKI combinator calculus.                                                                                                             |
| [tupled](functions/tupled.md)               | Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.                                                                                                                                                              |
| [untupled](functions/untupled.md)           | Converts a tupled function back to an uncurried function.                                                                                                                                                                                                             |

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

## getters

| Variable                            | Description                                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| [dropWhile](variables/dropWhile.md) | Drops elements from the start while the predicate holds, returning the rest.                       |
| [takeWhile](variables/takeWhile.md) | Takes elements from the start while the predicate holds, stopping at the first element that fails. |

## guards

| Name                                            | Description                                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [hasProperty](variables/hasProperty.md)         | Checks whether a value has a given property key.                                             |
| [isArray](functions/isArray.md)                 | A function that checks if the passed parameter is an Array and narrows its type accordingly. |
| [isBigInt](functions/isBigInt.md)               | Checks whether a value is a `bigint`.                                                        |
| [isBoolean](functions/isBoolean.md)             | Checks whether a value is a `boolean`.                                                       |
| [isDate](functions/isDate.md)                   | Checks whether a value is a `Date`.                                                          |
| [isError](functions/isError.md)                 | Checks whether a value is an `Error`.                                                        |
| [isFunction](functions/isFunction.md)           | Checks whether a value is a `function`.                                                      |
| [isIterable](functions/isIterable.md)           | Checks whether a value is iterable.                                                          |
| [isMap](functions/isMap.md)                     | Checks whether a value is a `Map`.                                                           |
| [isNever](functions/isNever.md)                 | Type guard that always returns `false`.                                                      |
| [isNotNull](functions/isNotNull.md)             | Checks whether a value is not `null`.                                                        |
| [isNotNullish](functions/isNotNullish.md)       | Checks whether a value is not `null` and not `undefined`.                                    |
| [isNotUndefined](functions/isNotUndefined.md)   | Checks whether a value is not `undefined`.                                                   |
| [isNull](functions/isNull.md)                   | Checks whether a value is `null`.                                                            |
| [isNullish](functions/isNullish.md)             | Checks whether a value is `null` or `undefined`.                                             |
| [isNumber](functions/isNumber.md)               | Checks whether a value is a `number`.                                                        |
| [isObject](functions/isObject.md)               | Checks whether a value is a non-null object value that is not an array.                      |
| [isObjectKeyword](functions/isObjectKeyword.md) | Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions).  |
| [isObjectOrArray](functions/isObjectOrArray.md) | Checks whether a value is an object or an array (non-null object).                           |
| [isPromise](functions/isPromise.md)             | Checks whether a value is a `Promise`-like object with `then` and `catch`.                   |
| [isPromiseLike](functions/isPromiseLike.md)     | Checks whether a value is `PromiseLike` (has a `then` method).                               |
| [isPropertyKey](functions/isPropertyKey.md)     | Checks whether a value is a valid `PropertyKey` (string, number, or symbol).                 |
| [isRegExp](functions/isRegExp.md)               | Checks whether a value is a `RegExp`.                                                        |
| [isSet](functions/isSet.md)                     | Checks whether a value is a `Set`.                                                           |
| [isString](functions/isString.md)               | Checks whether a value is a `string`.                                                        |
| [isSymbol](functions/isSymbol.md)               | Checks whether a value is a `symbol`.                                                        |
| [isUint8Array](functions/isUint8Array.md)       | Checks whether a value is a `Uint8Array`.                                                    |
| [isUndefined](functions/isUndefined.md)         | Checks whether a value is `undefined`.                                                       |
| [isUnknown](functions/isUnknown.md)             | Type guard that always returns `true`.                                                       |

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

## predicates

| Function                          | Description                       |
| --------------------------------- | --------------------------------- |
| [isTruthy](functions/isTruthy.md) | Checks whether a value is truthy. |

## prototypes

| Variable                            | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| [Prototype](variables/Prototype.md) | Reusable prototype that implements `Pipeable.pipe`. |

## utility types

| Name                                | Description                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [cast](variables/cast.md)           | Returns the input value with a different static type.                                                             |
| [hole](variables/hole.md)           | Creates a compile-time placeholder for a value of any type.                                                       |
| [absurd](functions/absurd.md)       | Marks an impossible branch by accepting a `never` value and returning any type.                                   |
| [satisfies](functions/satisfies.md) | Ensures that the type of an expression matches some type, without changing the resulting type of that expression. |
