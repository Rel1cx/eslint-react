// #region Licenses

// MIT License

// Copyright(c) 2023 Effectful Technologies Inc

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// MIT License

// Copyright(c) 2023 Rel1cx

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// region Directives

/* tsl-ignore dx/no-unsafe-as */
/* tsl-ignore dx/nullish */

// #endregion

// #region Helpers

/**
 * Simplifies a complex type intersection into a flat object type for better readability
 * in IDE tooltips and error messages.
 * @category utility types
 */
export type Pretty<T> =
  & {
    [P in keyof T]: T[P];
  }
  & {};

/**
 * An extension of Extract for type predicates which falls back to the base
 * in order to narrow the `unknown` case.
 *
 * @example
 *   function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
 * @category utility types
 */
export type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base
  : 0 extends 1 & NoInfer<T> ? Base
  : Extract<T, Base>;

// #endregion

// #region Predicate

/**
 * A function that takes a guard function as predicate and returns a guard that negates it.
 *
 * @param predicate - The guard function to negate.
 * @returns A guard function that negates the given predicate.
 * @category guards
 */
export function not<T, S extends T>(predicate: (data: T) => data is S): (data: T) => data is Exclude<T, S>;
export function not<T>(predicate: (data: T) => boolean): (data: T) => boolean;
export function not<T>(predicate: (data: T) => boolean) {
  return (data: T): boolean => !predicate(data);
}

/**
 * A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.
 *
 * @param a - The first guard function.
 * @param b - The second guard function.
 * @returns A guard function that checks if either predicate is true.
 * @category guards
 */
export function or<T, S extends T, U extends T>(
  a: (data: T) => data is S,
  b: (data: T) => data is U,
): (data: T) => data is S | U;
export function or<T, S extends T>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
export function or<T, U extends T>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
export function or<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
export function or(a: (data: unknown) => boolean, b: (data: unknown) => boolean) {
  return (data: unknown): boolean => a(data) || b(data);
}

/**
 * A function that checks if the passed parameter is an Array and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is an Array, false otherwise.
 * @category guards
 */
export function isArray<T>(data: ArrayLike<unknown> | T): data is NarrowedTo<T, ReadonlyArray<unknown>> {
  return Array.isArray(data);
}

/**
 * Checks if the given parameter is of type `"object"` via `typeof`, excluding `null`.
 *
 * @param data - The variable to be checked for being an object type.
 * @returns The input type, narrowed to only objects.
 * @category guards
 */
export function isObject<T>(data: T | object): data is NarrowedTo<T, object> {
  return typeof data === "object" && data !== null;
}

/**
 * A function that checks if the passed parameter is truthy and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is truthy, false otherwise.
 * @category guards
 */
export function isTruthy<T>(data: T): data is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(data);
}

/**
 * Tests if a value is a `function`.
 *
 * @param input - The value to test.
 * @returns `true` if the input is a function, `false` otherwise.
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { isFunction } from "effect/Predicate"
 *
 * assert.deepStrictEqual(isFunction(isFunction), true)
 * assert.deepStrictEqual(isFunction("function"), false)
 * ```
 *
 * @since 1.0.0
 * @category guards
 */
export const isFunction = (input: unknown): input is Function => typeof input === "function";

// #endregion

// #region Function

/**
 * The `Pipeable` module defines the shared interface and implementation helpers
 * for values that support Effect-style method chaining with `.pipe(...)`.
 *
 * A `Pipeable` value can pass itself through a sequence of unary functions from
 * left to right, so code can be written as `value.pipe(f, g, h)` instead of
 * deeply nesting calls. This is the method form used by many Effect data types
 * to compose transformations, validations, and effectful operations while
 * keeping the original value as the starting point of the pipeline.
 *
 * @since 2.0.0
 */

/**
 * Interface for values that support method-style `pipe` composition.
 *
 * **When to use**
 *
 * Use to type values that expose an Effect-style `.pipe(...)` method.
 *
 * **Details**
 *
 * Calling `value.pipe(f, g, h)` passes the value through each function from
 * left to right, returning the final result. Many Effect data types implement
 * this so operations can be chained without nesting function calls.
 *
 * **Example** (Chaining operations with pipe)
 *
 * ```ts
 * import { Effect } from "effect"
 *
 * // The Pipeable interface allows Effect values to be chained using the pipe method
 * const program = Effect.succeed(1).pipe(
 *   Effect.map((x) => x + 1),
 *   Effect.flatMap((x) => Effect.succeed(x * 2)),
 *   Effect.tap((x) => Effect.log(`Result: ${x}`))
 * )
 * ```
 *
 * @category models
 * @since 2.0.0
 */
export interface Pipeable {
  pipe<A>(this: A): A;
  pipe<A, B = never>(this: A, ab: (_: A) => B): B;
  pipe<A, B = never, C = never>(this: A, ab: (_: A) => B, bc: (_: B) => C): C;
  pipe<A, B = never, C = never, D = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D): D;
  pipe<A, B = never, C = never, D = never, E = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
  ): E;
  pipe<A, B = never, C = never, D = never, E = never, F = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
  ): F;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
  ): G;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
  ): H;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
  ): I;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
  ): J;
  pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
  ): K;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
  ): L;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
  ): M;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
  ): N;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
  ): O;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
  ): P;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
  ): Q;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
  ): R;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S,
  ): S;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
    T = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S,
    st: (_: S) => T,
  ): T;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
    T = never,
    U = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S,
    st: (_: S) => T,
    tu: (_: T) => U,
  ): U;
  pipe<
    A,
    B = never,
    C = never,
    D = never,
    E = never,
    F = never,
    G = never,
    H = never,
    I = never,
    J = never,
    K = never,
    L = never,
    M = never,
    N = never,
    O = never,
    P = never,
    Q = never,
    R = never,
    S = never,
    T = never,
    U = never,
  >(
    this: A,
    ab: (_: A) => B,
    bc: (_: B) => C,
    cd: (_: C) => D,
    de: (_: D) => E,
    ef: (_: E) => F,
    fg: (_: F) => G,
    gh: (_: G) => H,
    hi: (_: H) => I,
    ij: (_: I) => J,
    jk: (_: J) => K,
    kl: (_: K) => L,
    lm: (_: L) => M,
    mn: (_: M) => N,
    no: (_: N) => O,
    op: (_: O) => P,
    pq: (_: P) => Q,
    qr: (_: Q) => R,
    rs: (_: R) => S,
    st: (_: S) => T,
    tu: (_: T) => U,
  ): U;
}

/**
 * Applies a `pipe` method's variadic arguments to an initial value from left
 * to right.
 *
 * **When to use**
 *
 * Use to implement a custom `.pipe(...)` method from JavaScript's `arguments`
 * object.
 *
 * **Details**
 *
 * This helper is intended for implementing `Pipeable.pipe` methods that
 * receive JavaScript's `arguments` object. With no functions it returns the
 * original value; otherwise it feeds each result into the next function.
 *
 * **Example** (Implementing a pipe method)
 *
 * ```ts
 * import { Pipeable } from "effect"
 *
 * class NumberBox {
 *   constructor(readonly value: number) {}
 *
 *   pipe(..._fns: ReadonlyArray<(value: number) => number>): number {
 *     return Pipeable.pipeArguments(this.value, arguments) as number
 *   }
 * }
 *
 * const result = new NumberBox(5).pipe(
 *   (n) => n + 2,
 *   (n) => n * 3
 * )
 * console.log(result) // 21
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const pipeArguments = <A>(self: A, args: IArguments): unknown => {
  switch (args.length) {
    case 0:
      return self;
    case 1:
      return args[0](self);
    case 2:
      return args[1](args[0](self));
    case 3:
      return args[2](args[1](args[0](self)));
    case 4:
      return args[3](args[2](args[1](args[0](self))));
    case 5:
      return args[4](args[3](args[2](args[1](args[0](self)))));
    case 6:
      return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
    case 7:
      return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
    case 8:
      return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
    case 9:
      return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args.length; i < len; i++) {
        ret = args[i](ret);
      }
      return ret;
    }
  }
};

/**
 * Reusable prototype that implements `Pipeable.pipe`.
 *
 * **When to use**
 *
 * Use when classes or object prototypes can reuse this value when they need the
 * standard pipe implementation backed by `pipeArguments`.
 *
 * @category prototypes
 * @since 3.15.0
 */
export const Prototype: Pipeable = {
  pipe() {
    return pipeArguments(this, arguments);
  },
};

/**
 * Provides a base constructor whose instances implement the standard `Pipeable.pipe`
 * method.
 *
 * **When to use**
 *
 * Use when you need to define a class that supports Effect-style method
 * chaining through `.pipe(...)`.
 *
 * @category constructors
 * @since 3.15.0
 */
export const Class: new() => Pipeable = (function() {
  function PipeableBase() {}
  PipeableBase.prototype = Prototype;
  return PipeableBase as any;
})();

/**
 * Constructor type for classes whose instances implement `Pipeable`.
 *
 * **When to use**
 *
 * Use as the constructor-side type when a class value should be known to create
 * instances that support Effect-style method chaining with `.pipe(...)`.
 *
 * @see {@link Pipeable} for the instance-side contract
 * @see {@link Class} for the base constructor
 * @see {@link Mixin} for wrapping an existing class constructor
 *
 * @category models
 * @since 3.15.0
 */
export interface PipeableConstructor {
  new(...args: ReadonlyArray<any>): Pipeable;
}

/**
 * Returns a subclass of the provided class that adds the standard `pipe`
 * method.
 *
 * **When to use**
 *
 * Use to add pipe support to an existing class without extending a base class
 * or modifying its prototype.
 *
 * **Details**
 *
 * The original constructor and instance members are preserved, and the added
 * method delegates to `pipeArguments`.
 *
 * @see {@link Prototype} for a reusable prototype object
 * @see {@link Class} for a base constructor to extend
 * @category constructors
 * @since 4.0.0
 */
export const Mixin = <TBase extends new(...args: ReadonlyArray<any>) => any>(
  klass: TBase,
): TBase & PipeableConstructor => (class extends klass {
  pipe() {
    return pipeArguments(this, arguments);
  }
});

/**
 * Provides small helpers for defining and reusing TypeScript functions.
 *
 * The main helpers are `pipe` and `flow` for left-to-right composition and
 * `dual` for APIs that support both direct and pipe-friendly call styles. The
 * module also contains small identity, constant, tuple, type-level, and
 * memoization helpers used across the library.
 *
 * @since 2.0.0
 */

/**
 * Creates a function that can be called in data-first style or data-last
 * (`pipe`-friendly) style.
 *
 * **When to use**
 *
 * Use to expose one implementation through both direct and `pipe`-friendly
 * call styles.
 *
 * **Details**
 *
 * Pass either the arity of the uncurried function or a predicate that decides
 * whether the current call is data-first. Arity is the common case. Use a
 * predicate when optional arguments make arity ambiguous.
 *
 * **Example** (Selecting data-first or data-last style by arity)
 *
 * ```ts
 * import { Function, pipe } from "effect"
 *
 * const sum = Function.dual<
 *   (that: number) => (self: number) => number,
 *   (self: number, that: number) => number
 * >(2, (self, that) => self + that)
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * **Example** (Defining overloads with call signatures)
 *
 * ```ts
 * import { Function, pipe } from "effect"
 *
 * const sum: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = Function.dual(2, (self: number, that: number): number => self + that)
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * **Example** (Selecting data-first or data-last style with a predicate)
 *
 * ```ts
 * import { Function, pipe } from "effect"
 *
 * const sum = Function.dual<
 *   (that: number) => (self: number) => number,
 *   (self: number, that: number) => number
 * >(
 *   (args) => args.length === 2,
 *   (self, that) => self + that
 * )
 *
 * console.log(sum(2, 3)) // 5
 * console.log(pipe(2, sum(3))) // 5
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const dual: {
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>["length"],
    body: DataFirst,
  ): DataLast & DataFirst;
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    isDataFirst: (args: IArguments) => boolean,
    body: DataFirst,
  ): DataLast & DataFirst;
} = function(arity, body) {
  if (typeof arity === "function") {
    return function(this: any) {
      return arity(arguments)
        ? body.apply(this, arguments as any)
        : ((self: any) => body(self, ...arguments)) as any;
    };
  }

  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);

    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self: any) {
          return body(self, a);
        };
      };

    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self: any) {
          return body(self, a, b);
        };
      };

    default:
      return function() {
        if (arguments.length >= arity) {
          // @ts-expect-error
          return body.apply(this, arguments);
        }
        const args = arguments;
        return function(self: any) {
          return body(self, ...args);
        };
      };
  }
};
/**
 * Applies a function to a given value.
 *
 * **When to use**
 *
 * Use to pass a fixed value into a unary function, especially when the function
 * is the value flowing through `pipe`.
 *
 * **Details**
 *
 * `apply(a)(f)` is equivalent to `f(a)`.
 *
 * **Example** (Applying an argument to a function)
 *
 * ```ts
 * import { Function, pipe, String } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(pipe(String.length, Function.apply("hello")), 5)
 * ```
 *
 * @see {@link pipe} for building left-to-right pipelines
 *
 * @category combinators
 * @since 2.0.0
 */
export const apply = <A>(a: A) => <B>(self: (a: A) => B): B => self(a);

/**
 * A zero-argument function that produces a value when invoked.
 *
 * **When to use**
 *
 * Use to type a lazy value provider that should not run until called.
 *
 * **Example** (Creating a lazy argument)
 *
 * ```ts
 * import { Function } from "effect"
 *
 * const constNull: Function.LazyArg<null> = Function.constant(null)
 * ```
 *
 * @category models
 * @since 2.0.0
 */
export type LazyArg<A> = () => A;

/**
 * Represents a function with multiple arguments.
 *
 * **When to use**
 *
 * Use to describe a function whose argument list is represented as a tuple
 * type.
 *
 * **Example** (Typing a variadic function)
 *
 * ```ts
 * import type { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const sum: Function.FunctionN<[number, number], number> = (a, b) => a + b
 * assert.deepStrictEqual(sum(2, 3), 5)
 * ```
 *
 * @category models
 * @since 2.0.0
 */
export type FunctionN<A extends ReadonlyArray<unknown>, B> = (...args: A) => B;

/**
 * Returns its input argument unchanged.
 *
 * **When to use**
 *
 * Use to return a value unchanged where a function is required.
 *
 * **Example** (Returning the same value)
 *
 * ```ts
 * import { identity } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(identity(5), 5)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const identity = <A>(a: A): A => a;

/**
 * Ensures that the type of an expression matches some type,
 * without changing the resulting type of that expression.
 *
 * **When to use**
 *
 * Use to check assignability while preserving the expression's precise inferred
 * type.
 *
 * **Example** (Checking an expression against a type)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const test1 = Function.satisfies<number>()(5 as const)
 * // ^? const test: 5
 * // @ts-expect-error
 * const test2 = Function.satisfies<string>()(5)
 * // ^? Argument of type 'number' is not assignable to parameter of type 'string'
 *
 * assert.deepStrictEqual(Function.satisfies<number>()(5), 5)
 * ```
 *
 * @see {@link cast} for changing only the static TypeScript type
 *
 * @category utility types
 * @since 2.0.0
 */
export const satisfies = <A>() => <B extends A>(b: B) => b;

/**
 * Returns the input value with a different static type.
 *
 * **When to use**
 *
 * Use when you need an explicit type-level cast and accept that the value is
 * returned unchanged at runtime.
 *
 * **Gotchas**
 *
 * This is a type-level cast only; it performs no runtime validation or
 * conversion.
 *
 * @see {@link satisfies} for checking assignability without changing the resulting type
 *
 * @category utility types
 * @since 4.0.0
 */
export const cast: <A, B>(a: A) => B = identity as any;

/**
 * Creates a zero-argument function that always returns the provided value.
 *
 * **When to use**
 *
 * Use when you need a thunk or callback that returns the same value on every
 * invocation.
 *
 * **Example** (Creating a constant thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const constNull = Function.constant(null)
 *
 * assert.deepStrictEqual(constNull(), null)
 * assert.deepStrictEqual(constNull(), null)
 * ```
 *
 * @category constructors
 * @since 2.0.0
 */
export const constant = <A>(value: A): LazyArg<A> => () => value;

/**
 * Returns `true` when called.
 *
 * **When to use**
 *
 * Use when you need a thunk that returns `true` on every invocation.
 *
 * **Example** (Returning true from a thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.constTrue(), true)
 * ```
 *
 * @category constants
 * @since 2.0.0
 */
export const constTrue: LazyArg<boolean> = constant(true);

/**
 * Returns `false` when called.
 *
 * **When to use**
 *
 * Use when you need a thunk that returns `false` on every invocation.
 *
 * **Example** (Returning false from a thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.constFalse(), false)
 * ```
 *
 * @category constants
 * @since 2.0.0
 */
export const constFalse: LazyArg<boolean> = constant(false);

/**
 * Returns `null` when called.
 *
 * **When to use**
 *
 * Use when you need a thunk that returns `null` on every invocation.
 *
 * **Example** (Returning null from a thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.constNull(), null)
 * ```
 *
 * @category constants
 * @since 2.0.0
 */
export const constNull: LazyArg<null> = constant(null);

/**
 * Returns `undefined` when called.
 *
 * **When to use**
 *
 * Use when you need a thunk that returns `undefined` on every invocation.
 *
 * **Example** (Returning undefined from a thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.constUndefined(), undefined)
 * ```
 *
 * @category constants
 * @since 2.0.0
 */
export const constUndefined: LazyArg<undefined> = constant(undefined);

/**
 * Returns no meaningful value when called.
 *
 * **When to use**
 *
 * Use when you need a thunk that is called only for its effect and has no
 * meaningful return value.
 *
 * **Example** (Returning void from a thunk)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.constVoid(), undefined)
 * ```
 *
 * @category constants
 * @since 2.0.0
 */
export const constVoid: LazyArg<void> = constUndefined;

/**
 * Reverses the order of arguments for a curried function.
 *
 * **When to use**
 *
 * Use to adapt a curried function when its argument groups need to be supplied
 * in the opposite order.
 *
 * **Example** (Flipping curried arguments)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const f = (a: number) => (b: string) => a - b.length
 *
 * assert.deepStrictEqual(Function.flip(f)("aaa")(2), -1)
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const flip = <A extends Array<unknown>, B extends Array<unknown>, C>(
  f: (...a: A) => (...b: B) => C,
): (...b: B) => (...a: A) => C =>
(...b) =>
(...a) => f(...a)(...b);

/**
 * Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
 * The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.
 *
 * **When to use**
 *
 * Use to compose exactly two unary functions into a reusable unary function.
 *
 * **Example** (Composing two functions)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const increment = (n: number) => n + 1
 * const square = (n: number) => n * n
 *
 * assert.strictEqual(Function.compose(increment, square)(2), 9)
 * ```
 *
 * @see {@link flow} for composing a left-to-right sequence of functions
 * @see {@link pipe} for applying a value through a left-to-right sequence immediately
 *
 * @category combinators
 * @since 2.0.0
 */
export const compose: {
  <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
  <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
} = dual(2, <A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C => (a) => bc(ab(a)));

/**
 * Marks an impossible branch by accepting a `never` value and returning any
 * type.
 *
 * **When to use**
 *
 * Use when you need a return value in a branch that exhaustive checks prove
 * cannot be reached.
 *
 * **Gotchas**
 *
 * Calling `absurd` throws, because a value of type `never` should be
 * impossible at runtime.
 *
 * **Example** (Handling impossible values)
 *
 * ```ts
 * import { absurd } from "effect"
 *
 * const handleNever = (value: never) => {
 *   return absurd(value) // This will throw an error if called
 * }
 * ```
 *
 * @category utility types
 * @since 2.0.0
 */
export const absurd = <A>(_: never): A => {
  throw new Error("Called `absurd` function which should be uncallable");
};

/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * **When to use**
 *
 * Use to adapt a multi-argument function so it accepts one tuple argument.
 *
 * **Example** (Converting arguments to a tuple)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const sumTupled = Function.tupled((x: number, y: number): number => x + y)
 *
 * assert.deepStrictEqual(sumTupled([1, 2]), 3)
 * ```
 *
 * @see {@link untupled} for adapting a tuple-argument function back to multiple arguments
 *
 * @category combinators
 * @since 2.0.0
 */
export const tupled = <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: A) => B => (a) => f(...a);

/**
 * Converts a tupled function back to an uncurried function.
 *
 * **When to use**
 *
 * Use to adapt a tuple-argument function so it accepts multiple arguments.
 *
 * **Example** (Converting a tuple to arguments)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * const getFirst = Function.untupled(<A, B>(tuple: [A, B]): A => tuple[0])
 *
 * assert.deepStrictEqual(getFirst(1, 2), 1)
 * ```
 *
 * @see {@link tupled} for adapting a multi-argument function to one tuple argument
 *
 * @category combinators
 * @since 2.0.0
 */
export const untupled = <A extends ReadonlyArray<unknown>, B>(f: (a: A) => B): (...a: A) => B => (...a) => f(a);

/**
 * Pipes the value of an expression through a left-to-right sequence of
 * functions.
 *
 * **When to use**
 *
 * Use when you need to compose data-last functions into readable
 * transformation pipelines instead of method-style chains.
 *
 * **Details**
 *
 * Takes an initial value, passes it to the first function, then passes each
 * result to the next function in order. The final function result is returned.
 *
 * **Gotchas**
 *
 * Each function passed after the initial value must accept a single argument,
 * because `pipe` calls each step with only the previous result.
 *
 * **Example** (Piping values through functions)
 *
 * In this example, `1` is passed to the first function, and each result becomes
 * the input for the next function.
 *
 * ```ts
 * import { pipe } from "effect"
 *
 * const result = pipe(
 *   1,
 *   (n) => n + 1,
 *   (n) => n * 2,
 *   (n) => `result: ${n}`
 * )
 *
 * console.log(result) // "result: 4"
 * ```
 *
 * **Example** (Chaining methods before conversion)
 *
 * ```ts
 * const numbers = [1, 2, 3, 4]
 * const double = (n: number) => n * 2
 * const greaterThanFour = (n: number) => n > 4
 *
 * const result = numbers.map(double).filter(greaterThanFour)
 *
 * console.log(result) // [6, 8]
 * ```
 *
 * **Example** (Rewriting method chains with pipe)
 *
 * The same transformation can be written with data-last functions.
 *
 * ```ts
 * import { Array, pipe } from "effect"
 *
 * const numbers = [1, 2, 3, 4]
 * const double = (n: number) => n * 2
 * const greaterThanFour = (n: number) => n > 4
 *
 * const result = pipe(
 *   numbers,
 *   Array.map(double),
 *   Array.filter(greaterThanFour)
 * )
 *
 * console.log(result) // [6, 8]
 * ```
 *
 * **Example** (Chaining arithmetic operations)
 *
 * ```ts
 * import { pipe } from "effect"
 *
 * // Define simple arithmetic operations
 * const increment = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const subtractTen = (x: number) => x - 10
 *
 * // Sequentially apply these operations using `pipe`
 * const result = pipe(5, increment, double, subtractTen)
 *
 * console.log(result)
 * // Output: 2
 * ```
 *
 * **Example** (Building a simple transformation pipeline)
 *
 * ```ts
 * import { pipe } from "effect"
 *
 * // Simple transformation pipeline
 * const result = pipe(
 *   5,
 *   (x) => x * 2, // 10
 *   (x) => x + 1, // 11
 *   (x) => x.toString() // "11"
 * )
 *
 * console.log(result) // "11"
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export function pipe<A>(a: A): A;
export function pipe<A, B = never>(a: A, ab: (a: A) => B): B;
export function pipe<A, B = never, C = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
): C;
export function pipe<A, B = never, C = never, D = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): D;
export function pipe<A, B = never, C = never, D = never, E = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): E;
export function pipe<A, B = never, C = never, D = never, E = never, F = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): F;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): G;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): H;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): I;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): J;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
): K;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
): L;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
): M;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
): N;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
): O;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
): P;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
): Q;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
): R;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
  S = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
): S;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
  S = never,
  T = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T,
): T;
export function pipe(a: unknown, ...args: Array<any>): unknown {
  return pipeArguments(a, args as any);
}

/**
 * Performs left-to-right function composition.
 *
 * **When to use**
 *
 * Use to build a reusable function from a left-to-right sequence of
 * transformations.
 *
 * **Details**
 *
 * The first function may have any arity. Every following function must be
 * unary.
 *
 * **Example** (Composing functions left to right)
 *
 * ```ts
 * import { flow } from "effect"
 * import * as assert from "node:assert"
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.strictEqual(f("aaa"), 6)
 * ```
 *
 * @see {@link pipe} for applying a value through a left-to-right sequence immediately
 * @see {@link compose} for composing exactly two functions
 *
 * @category combinators
 * @since 2.0.0
 */
export function flow<A extends ReadonlyArray<unknown>, B = never>(
  ab: (...a: A) => B,
): (...a: A) => B;
export function flow<A extends ReadonlyArray<unknown>, B = never, C = never>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
): (...a: A) => C;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...a: A) => D;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): (...a: A) => E;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): (...a: A) => F;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): (...a: A) => G;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): (...a: A) => H;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): (...a: A) => I;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): (...a: A) => J;
export function flow(
  ab: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function,
): unknown {
  switch (arguments.length) {
    case 1:
      return ab;
    case 2:
      return function(this: unknown) {
        return bc!(ab.apply(this, arguments));
      };
    case 3:
      return function(this: unknown) {
        return cd!(bc!(ab.apply(this, arguments)));
      };
    case 4:
      return function(this: unknown) {
        return de!(cd!(bc!(ab.apply(this, arguments))));
      };
    case 5:
      return function(this: unknown) {
        return ef!(de!(cd!(bc!(ab.apply(this, arguments)))));
      };
    case 6:
      return function(this: unknown) {
        return fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))));
      };
    case 7:
      return function(this: unknown) {
        return gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))));
      };
    case 8:
      return function(this: unknown) {
        return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments))))))));
      };
    case 9:
      return function(this: unknown) {
        return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab.apply(this, arguments)))))))));
      };
  }
  return;
}

/**
 * Creates a compile-time placeholder for a value of any type.
 *
 * **When to use**
 *
 * Use as a temporary typed placeholder while developing incomplete code.
 *
 * **Gotchas**
 *
 * `hole` is intended for temporary development use. If the placeholder is
 * evaluated at runtime, it throws.
 *
 * **Example** (Creating a development placeholder)
 *
 * ```ts
 * import { hole } from "effect"
 *
 * // Intentionally not called: `hole` throws if the placeholder is evaluated.
 * const buildUser = (id: number): { readonly id: number; readonly name: string } => ({
 *   id,
 *   name: hole<string>()
 * })
 *
 * console.log(typeof buildUser) // "function"
 * ```
 *
 * @category utility types
 * @since 2.0.0
 */
export const hole: <T>() => T = cast(absurd);

/**
 * Returns the second argument and discards the first. The SK combinator is
 * a fundamental combinator in the lambda calculus and the SKI combinator
 * calculus.
 *
 * **When to use**
 *
 * Use to discard the first argument and return the second argument.
 *
 * **Example** (Discarding the first argument)
 *
 * ```ts
 * import { Function } from "effect"
 * import * as assert from "node:assert"
 *
 * assert.deepStrictEqual(Function.SK(0, "hello"), "hello")
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const SK = <A, B>(_: A, b: B): B => b;

/**
 * Creates a memoized function whose input is an object, caching results by
 * object identity.
 *
 * **When to use**
 *
 * Use to reuse the result of a synchronous computation whose output is stable
 * for a given object reference.
 *
 * **Details**
 *
 * Each memoized wrapper owns a private `WeakMap` keyed by object identity.
 * Cached `undefined` results are still returned because the cache is checked
 * with `WeakMap.has`.
 *
 * **Gotchas**
 *
 * Structurally equal objects do not share cache entries. If the same object is
 * mutated after its first call, later calls still return the cached result for
 * that reference.
 *
 * @category caching
 * @since 4.0.0
 */
export function memoize<A extends object, O>(f: (a: A) => O): (ast: A) => O {
  const cache = new WeakMap<object, O>();
  return (a) => {
    if (cache.has(a)) {
      return cache.get(a)!;
    }
    const result = f(a);
    cache.set(a, result);
    return result;
  };
}

// #endregion

// #region Map & Set

/**
 * Retrieves a value from a Map or WeakMap if the key exists, or inserts and returns a default value if it doesn't.
 *
 * @param map - The Map or WeakMap to get from or update.
 * @param key - The key to look up in the Map or WeakMap.
 * @param defaultValue - The value to insert and return if the key is not present.
 * @returns The existing value for the key, or the inserted default value.
 * @category map & set
 */
export function getOrInsert<K extends WeakKey, V>(map: WeakMap<K, V>, key: K, defaultValue: V): V;
export function getOrInsert<K, V>(map: Map<K, V>, key: K, defaultValue: V): V;
export function getOrInsert<K extends WeakKey, V>(map: WeakMap<K, V>, key: K, defaultValue: V): V {
  if (map.has(key)) {
    return map.get(key)!;
  }
  map.set(key, defaultValue);
  return defaultValue;
}

/**
 * Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.
 *
 * @param map - The Map or WeakMap to get from or update.
 * @param key - The key to look up in the Map or WeakMap.
 * @param callback - A function that returns the value to insert if the key is not present. Called with the key as argument.
 * @returns The existing value for the key, or the newly computed value.
 * @category map & set
 */
export function getOrInsertComputed<K extends WeakKey, V>(map: WeakMap<K, V>, key: K, callback: (key: K) => V): V;
export function getOrInsertComputed<K, V>(map: Map<K, V>, key: K, callback: (key: K) => V): V;
export function getOrInsertComputed<K extends WeakKey, V>(map: WeakMap<K, V>, key: K, callback: (key: K) => V): V {
  if (map.has(key)) {
    return map.get(key)!;
  }
  const value = callback(key);
  map.set(key, value);
  return value;
}

// #endregion

// #region Array

/**
 * Drops the longest prefix of elements from an array that satisfy the given predicate.
 *
 * Supports both data-first and data-last (`pipe`-friendly) call styles.
 *
 * @param pred - The predicate to test each element with.
 * @returns A new array without the matching prefix.
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { dropWhile, pipe } from "@local/eff"
 *
 * // data-first
 * assert.deepStrictEqual(dropWhile([1, 2, 3, 2, 1], (n: number) => n < 3), [3, 2, 1])
 *
 * // data-last
 * assert.deepStrictEqual(pipe([1, 2, 3, 2, 1], dropWhile((n: number) => n < 3)), [3, 2, 1])
 * ```
 * @category array
 */
export const dropWhile: {
  <S>(pred: (x: S) => boolean): <T extends S>(xs: T[]) => T[];
  <S, T extends S>(xs: T[], pred: (x: S) => boolean): T[];
} = dual(2, <S, T extends S>(xs: T[], pred: (x: S) => boolean): T[] => {
  const len = xs.length;
  let idx = 0;
  while (idx < len && pred(xs[idx]!)) idx++;
  return xs.slice(idx);
});

/**
 * Takes the longest prefix of elements from an array that satisfy the given predicate.
 *
 * Supports both data-first and data-last (`pipe`-friendly) call styles.
 *
 * @param pred - The predicate to test each element with.
 * @returns A new array containing only the matching prefix.
 * @example
 * ```ts
 * import * as assert from "node:assert"
 * import { pipe, takeWhile } from "@local/eff"
 *
 * // data-first
 * assert.deepStrictEqual(takeWhile([1, 2, 3, 2, 1], (n: number) => n < 3), [1, 2])
 *
 * // data-last
 * assert.deepStrictEqual(pipe([1, 2, 3, 2, 1], takeWhile((n: number) => n < 3)), [1, 2])
 * ```
 * @category array
 */
export const takeWhile: {
  <S>(pred: (x: S) => boolean): <T extends S>(xs: T[]) => T[];
  <S, T extends S>(xs: T[], pred: (x: S) => boolean): T[];
} = dual(2, <S, T extends S>(xs: T[], pred: (x: S) => boolean): T[] => {
  const len = xs.length;
  let idx = 0;
  while (idx < len && pred(xs[idx]!)) idx++;
  return xs.slice(0, idx);
});

// #endregion
