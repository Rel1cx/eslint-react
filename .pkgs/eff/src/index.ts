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

/* eslint-disable @typescript-eslint/no-empty-object-type */
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
 *   Effect.flatMap((x) => Effect.succeed(x * 2))
 * )
 *
 * Effect.runSync(program) // => 4
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
  pipe<A, B = never, C = never, D = never, E = never>(this: A, ab: (_: A) => B, bc: (_: B) => C, cd: (_: C) => D, de: (_: D) => E): E;
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
 * result // => 21
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
export const Mixin = <TBase extends new(...args: ReadonlyArray<any>) => any>(klass: TBase): TBase & PipeableConstructor => (class extends klass {
  pipe() {
    return pipeArguments(this, arguments);
  }
});

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
 * sum(2, 3) // => 5
 * pipe(2, sum(3)) // => 5
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
 * sum(2, 3) // => 5
 * pipe(2, sum(3)) // => 5
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
 * sum(2, 3) // => 5
 * pipe(2, sum(3)) // => 5
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const dual: {
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
  <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>["length"],
    body: DataFirst,
  ): DataLast & DataFirst;
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
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
   * sum(2, 3) // => 5
   * pipe(2, sum(3)) // => 5
   * ```
   *
   * @category combinators
   * @since 2.0.0
   */
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
 *
 * pipe(String.length, Function.apply("hello")) // => 5
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
 * constNull() // => null
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
 *
 * const sum: Function.FunctionN<[number, number], number> = (a, b) => a + b
 * sum(2, 3) // => 5
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
 *
 * identity(5) // => 5
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
 *
 * const test1 = Function.satisfies<number>()(5 as const) // => 5
 * // ^? const test: 5
 * // @ts-expect-error
 * const test2 = Function.satisfies<string>()(5)
 * // ^? Argument of type 'number' is not assignable to parameter of type 'string'
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
 *
 * const constNull = Function.constant(null)
 *
 * constNull() // => null
 * constNull() // => null
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
 *
 * Function.constTrue() // => true
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
 *
 * Function.constFalse() // => false
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
 *
 * Function.constNull() // => null
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
 *
 * Function.constUndefined() // => undefined
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
 *
 * Function.constVoid() // => undefined
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
 *
 * const f = (a: number) => (b: string) => a - b.length
 *
 * Function.flip(f)("aaa")(2) // => -1
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const flip = <A extends Array<unknown>, B extends Array<unknown>, C>(f: (...a: A) => (...b: B) => C): (...b: B) => (...a: A) => C => (...b) => (...a) =>
  f(...a)(...b);

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
 *
 * const increment = (n: number) => n + 1
 * const square = (n: number) => n * n
 *
 * Function.compose(increment, square)(2) // => 9
 * ```
 *
 * @see {@link flow} for composing a left-to-right sequence of functions
 * @see {@link pipe} for applying a value through a left-to-right sequence immediately
 *
 * @category combinators
 * @since 2.0.0
 */
export const compose: {
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
   *
   * const increment = (n: number) => n + 1
   * const square = (n: number) => n * n
   *
   * Function.compose(increment, square)(2) // => 9
   * ```
   *
   * @see {@link flow} for composing a left-to-right sequence of functions
   * @see {@link pipe} for applying a value through a left-to-right sequence immediately
   *
   * @category combinators
   * @since 2.0.0
   */
  <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
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
   *
   * const increment = (n: number) => n + 1
   * const square = (n: number) => n * n
   *
   * Function.compose(increment, square)(2) // => 9
   * ```
   *
   * @see {@link flow} for composing a left-to-right sequence of functions
   * @see {@link pipe} for applying a value through a left-to-right sequence immediately
   *
   * @category combinators
   * @since 2.0.0
   */
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
 *
 * const sumTupled = Function.tupled((x: number, y: number): number => x + y)
 *
 * sumTupled([1, 2]) // => 3
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
 *
 * const getFirst = Function.untupled(<A, B>(tuple: [A, B]): A => tuple[0])
 *
 * getFirst(1, 2) // => 1
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
 * pipe(
 *   1,
 *   (n) => n + 1,
 *   (n) => n * 2,
 *   (n) => `result: ${n}`
 * ) // => "result: 4"
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
 * pipe(
 *   numbers,
 *   Array.map(double),
 *   Array.filter(greaterThanFour)
 * ) // => [6, 8]
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export function pipe<A>(a: A): A;
export function pipe<A, B = never>(a: A, ab: (a: A) => B): B;
export function pipe<A, B = never, C = never>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipe<A, B = never, C = never, D = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
export function pipe<A, B = never, C = never, D = never, E = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
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
>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): G;
export function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): H;
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
>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): I;
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
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * f("aaa") // => 6
 * ```
 *
 * @see {@link pipe} for applying a value through a left-to-right sequence immediately
 * @see {@link compose} for composing exactly two functions
 *
 * @category combinators
 * @since 2.0.0
 */
export function flow<A extends ReadonlyArray<unknown>, B = never>(ab: (...a: A) => B): (...a: A) => B;
export function flow<A extends ReadonlyArray<unknown>, B = never, C = never>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
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
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (...a: A) => E;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): (...a: A) => F;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): (...a: A) => G;
export function flow<
  A extends ReadonlyArray<unknown>,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): (...a: A) => H;
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
>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): (...a: A) => I;
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
 *
 * Function.SK(0, "hello") // => "hello"
 * ```
 *
 * @category combinators
 * @since 2.0.0
 */
export const SK = <A, B>(_: A, b: B): B => b;

/**
 * Creates a memoized function that caches the result of a synchronous,
 * stable-output computation for any type of key.
 *
 * **Details**
 *
 * Object keys are cached by identity in a private `WeakMap`, so entries can
 * be garbage collected; primitive keys are cached by value in a private
 * `Map`.
 *
 * **Gotchas**
 *
 * - `undefined` is reserved to represent a cache miss and is not supported
 *   as a return value.
 * - Structurally equal objects do not share cache entries, and mutating an
 *   object after its first call does not change the cached result for that
 *   reference.
 *
 * @category caching
 * @since 4.0.0
 */
export function memoize<A, O extends {} | null>(f: (a: A) => O): (a: A) => O {
  const objects = new WeakMap<object, O>();
  const primitives = new Map<A, O>();
  return (a) => {
    if (isObjectKeyword(a)) {
      return getOrInsertComputed(objects, a, () => f(a));
    }
    return getOrInsertComputed(primitives, a, () => f(a));
  };
}

// #endregion

// #region Predicate

/**
 * Negates a predicate.
 *
 * **When to use**
 *
 * Use when you want the inverse of an existing predicate.
 *
 * **Details**
 *
 * Returns a new predicate that flips the boolean result.
 *
 * **Example** (Negating a predicate)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const isNotString = Predicate.not(Predicate.isString)
 *
 * isNotString(1) // => true
 * ```
 *
 * @see {@link and}
 * @see {@link or}
 * @see {@link xor}
 * @category combinators
 * @since 2.0.0
 */
export function not<T, S extends T>(predicate: (data: T) => data is S): (data: T) => data is Exclude<T, S>;
export function not<T>(predicate: (data: T) => boolean): (data: T) => boolean;
export function not<T>(predicate: (data: T) => boolean) {
  return (data: T): boolean => !predicate(data);
}

/**
 * Creates a predicate that returns `true` only if both predicates are `true`.
 *
 * **When to use**
 *
 * Use when you want to combine `Predicate`s with AND, accepting values that
 * satisfy multiple conditions, including refinements that narrow to an
 * intersection.
 *
 * **Details**
 *
 * Evaluation short-circuits on the first `false`. For refinements, the output
 * type is an intersection.
 *
 * **Example** (Checking both conditions)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const hasAAndB = Predicate.and(
 *   Predicate.hasProperty("a"),
 *   Predicate.hasProperty("b")
 * )
 *
 * const input: unknown = JSON.parse(`{"a":1,"b":"ok"}`)
 * if (hasAAndB(input)) {
 *   // input has both properties at this point
 *   const a = input.a
 *   const b = input.b
 *
 *   const values = [a, b] // => [1, "ok"]
 * }
 * ```
 *
 * @see {@link or}
 * @see {@link not}
 * @category combinators
 * @since 2.0.0
 */
export const and: {
  <T, U extends T>(b: (data: T) => data is U): <S extends T>(a: (data: T) => data is S) => (data: T) => data is S & U;
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T, S extends T, U extends T>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S & U;
  <T, S extends T>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
  <T, U extends T>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => a(data) && b(data));

/**
 * Creates a predicate that returns `true` if either predicate is `true`.
 *
 * **When to use**
 *
 * Use when you want to combine `Predicate`s with OR, accepting values that
 * satisfy at least one condition, including refinements that narrow to a union.
 *
 * **Details**
 *
 * Evaluation short-circuits on the first `true`. For refinements, the output
 * type is a union.
 *
 * **Example** (Checking either condition)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const isStringOrNumber = Predicate.or(Predicate.isString, Predicate.isNumber)
 *
 * isStringOrNumber("a") // => true
 * ```
 *
 * @see {@link and}
 * @see {@link xor}
 * @category combinators
 * @since 2.0.0
 */
export const or: {
  <T, U extends T>(b: (data: T) => data is U): <S extends T>(a: (data: T) => data is S) => (data: T) => data is S | U;
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T, S extends T, U extends T>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S | U;
  <T, S extends T>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
  <T, U extends T>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => a(data) || b(data));

/**
 * Creates a predicate that returns `true` if exactly one predicate is `true`.
 *
 * **When to use**
 *
 * Use when you want to combine two `Predicate`s with exclusive-or semantics.
 *
 * **Details**
 *
 * Returns `true` when results differ.
 *
 * **Example** (Checking exclusive-or conditions)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const isEven = (n: number) => n % 2 === 0
 * const isPositive = (n: number) => n > 0
 * const either = Predicate.xor(isEven, isPositive)
 *
 * either(-2) // => true
 * ```
 *
 * @see {@link or}
 * @see {@link and}
 * @category combinators
 * @since 2.0.0
 */
export const xor: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => a(data) !== b(data));

/**
 * Creates a predicate that returns `true` when both predicates agree.
 *
 * **When to use**
 *
 * Use when you want to check equivalence of two `Predicate`s.
 *
 * **Details**
 *
 * Returns `true` when both results are equal.
 *
 * **Example** (Defining equivalence)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const isEven = (n: number) => n % 2 === 0
 * const same = Predicate.eqv(isEven, isEven)
 *
 * same(3) // => true
 * ```
 *
 * @see {@link xor}
 * @category combinators
 * @since 2.0.0
 */
export const eqv: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => a(data) === b(data));

/**
 * Creates a predicate representing logical implication: if `antecedent`, then `consequent`.
 *
 * **When to use**
 *
 * Use when you need to encode logical implication between `Predicate` rules,
 * where one rule only applies when a precondition holds.
 *
 * **Details**
 *
 * Models constraints like "if A then B" and returns `true` when the antecedent
 * is `false`.
 *
 * **Example** (Checking implication)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const isAdult = (age: number) => age >= 18
 * const canVote = (age: number) => age >= 18
 * const implies = Predicate.implies(isAdult, canVote)
 *
 * implies(16) // => true
 * ```
 *
 * @see {@link and}
 * @see {@link or}
 * @category combinators
 * @since 2.0.0
 */
export const implies: {
  <T>(consequent: (data: T) => boolean): (antecedent: (data: T) => boolean) => (data: T) => boolean;
  <T>(antecedent: (data: T) => boolean, consequent: (data: T) => boolean): (data: T) => boolean;
} = dual(
  2,
  (antecedent: (data: unknown) => boolean, consequent: (data: unknown) => boolean) => (data: unknown): boolean => !antecedent(data) || consequent(data),
);

/**
 * Creates a predicate that returns `true` when neither predicate is `true`.
 *
 * **When to use**
 *
 * Use when you want to combine two `Predicate`s with logical NOR semantics.
 *
 * **Details**
 *
 * Returns the negation of `or`.
 *
 * **Example** (Checking NOR conditions)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const neither = Predicate.nor(Predicate.isString, Predicate.isNumber)
 *
 * neither(true) // => true
 * ```
 *
 * @see {@link or}
 * @see {@link not}
 * @category combinators
 * @since 2.0.0
 */
export const nor: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => !a(data) && !b(data));

/**
 * Creates a predicate that returns `true` unless both predicates are `true`.
 *
 * **When to use**
 *
 * Use when you want to combine two `Predicate`s with logical NAND semantics.
 *
 * **Details**
 *
 * Returns the negation of `and`.
 *
 * **Example** (Checking NAND conditions)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const notBoth = Predicate.nand(Predicate.isString, Predicate.isNumber)
 *
 * notBoth("a") // => true
 * ```
 *
 * @see {@link and}
 * @see {@link not}
 * @category combinators
 * @since 2.0.0
 */
export const nand: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
} = dual(2, (a: (data: unknown) => boolean, b: (data: unknown) => boolean) => (data: unknown): boolean => !a(data) || !b(data));

/**
 * Creates a predicate that returns `true` if all predicates in the collection return `true`.
 *
 * **When to use**
 *
 * Use when you have a dynamic list of predicates to apply.
 *
 * **Details**
 *
 * Evaluation short-circuits on the first `false`. The collection is iterated
 * each time the predicate is called.
 *
 * **Example** (Checking all predicates)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const allChecks = Predicate.every([Predicate.isNumber, (n: number) => n > 0])
 *
 * allChecks(2) // => true
 * ```
 *
 * @see {@link some}
 * @see {@link and}
 * @category combining
 * @since 2.0.0
 */
export function every<A>(collection: Iterable<(a: A) => boolean>): (a: A) => boolean {
  return (a: A): boolean => {
    for (const p of collection) {
      if (!p(a)) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Creates a predicate that returns `true` if any predicate in the collection returns `true`.
 *
 * **When to use**
 *
 * Use when you have a dynamic list of predicates and only need one to pass.
 *
 * **Details**
 *
 * Evaluation short-circuits on the first `true`. The collection is iterated
 * each time the predicate is called.
 *
 * **Example** (Checking any predicate)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const anyCheck = Predicate.some([Predicate.isString, Predicate.isNumber])
 *
 * anyCheck("ok") // => true
 * ```
 *
 * @see {@link every}
 * @see {@link or}
 * @category combining
 * @since 2.0.0
 */
export function some<A>(collection: Iterable<(a: A) => boolean>): (a: A) => boolean {
  return (a: A): boolean => {
    for (const p of collection) {
      if (p(a)) {
        return true;
      }
    }
    return false;
  };
}

/**
 * Checks whether a value is a `string`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * string.
 *
 * **Details**
 *
 * Uses `typeof input === "string"`.
 *
 * **Example** (Guarding strings)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = "hi"
 *
 * if (Predicate.isString(data)) {
 *   data.toUpperCase() // => "HI"
 * }
 * ```
 *
 * @see {@link isNumber}
 * @see {@link isBoolean}
 * @see {@link Refinement}
 * @category guards
 * @since 2.0.0
 */
export function isString(input: unknown): input is string {
  return typeof input === "string";
}

/**
 * Checks whether a value is a `number`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * number.
 *
 * **Details**
 *
 * Uses `typeof input === "number"` and does not exclude `NaN` or `Infinity`.
 *
 * **Example** (Guarding numbers)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = 42
 *
 * if (Predicate.isNumber(data)) {
 *   data + 1 // => 43
 * }
 * ```
 *
 * @see {@link isBigInt}
 * @see {@link isString}
 * @category guards
 * @since 2.0.0
 */
export function isNumber(input: unknown): input is number {
  return typeof input === "number";
}

/**
 * Checks whether a value is a `boolean`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * boolean.
 *
 * **Details**
 *
 * Uses `typeof input === "boolean"`.
 *
 * **Example** (Guarding booleans)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = true
 *
 * if (Predicate.isBoolean(data)) {
 *   data ? "yes" : "no" // => "yes"
 * }
 * ```
 *
 * @see {@link isString}
 * @see {@link isNumber}
 * @category guards
 * @since 2.0.0
 */
export function isBoolean(input: unknown): input is boolean {
  return typeof input === "boolean";
}

/**
 * Checks whether a value is a `bigint`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * bigint.
 *
 * **Details**
 *
 * Uses `typeof input === "bigint"`.
 *
 * **Example** (Guarding bigints)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = 1n
 *
 * if (Predicate.isBigInt(data)) {
 *   data + 2n // => 3n
 * }
 * ```
 *
 * @see {@link isNumber}
 * @category guards
 * @since 2.0.0
 */
export function isBigInt(input: unknown): input is bigint {
  return typeof input === "bigint";
}

/**
 * Checks whether a value is a `symbol`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * symbol.
 *
 * **Details**
 *
 * Uses `typeof input === "symbol"`.
 *
 * **Example** (Guarding symbols)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = Symbol.for("id")
 *
 * if (Predicate.isSymbol(data)) {
 *   data.description // => "id"
 * }
 * ```
 *
 * @see {@link isPropertyKey}
 * @category guards
 * @since 2.0.0
 */
export function isSymbol(input: unknown): input is symbol {
  return typeof input === "symbol";
}

/**
 * Checks whether a value is a valid `PropertyKey` (string, number, or symbol).
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for unknown property keys before
 * indexing.
 *
 * **Details**
 *
 * Uses `isString`, `isNumber`, and `isSymbol`.
 *
 * **Example** (Guarding property keys)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const key: unknown = "name"
 * const obj: Record<PropertyKey, unknown> = { name: "Ada" }
 *
 * if (Predicate.isPropertyKey(key) && key in obj) {
 *   obj[key] // => "Ada"
 * }
 * ```
 *
 * @see {@link isString}
 * @see {@link isNumber}
 * @see {@link isSymbol}
 * @category guards
 * @since 4.0.0
 */
export function isPropertyKey(u: unknown): u is PropertyKey {
  return isString(u) || isNumber(u) || isSymbol(u);
}

/**
 * Checks whether a value is a `function`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard to narrow an `unknown` value to a
 * callable function.
 *
 * **Details**
 *
 * Uses `typeof input === "function"`.
 *
 * **Example** (Guarding functions)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = () => 1
 *
 * if (Predicate.isFunction(data)) {
 *   data() // => 1
 * }
 * ```
 *
 * @see {@link isObjectKeyword}
 * @category guards
 * @since 2.0.0
 */
export function isFunction(input: unknown): input is Function {
  return typeof input === "function";
}

/**
 * Checks whether a value is truthy.
 *
 * **When to use**
 *
 * Use when you want a predicate that mirrors JavaScript truthiness and filters
 * out falsy values like `0`, `""`, and `false`.
 *
 * **Details**
 *
 * This uses `Boolean(input)` and treats `0`, `""`, `false`, `null`, and
 * `undefined` as false.
 *
 * **Example** (Filtering truthy values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const values = [0, 1, "", "ok", false]
 * const truthy = values.filter(Predicate.isTruthy) // => [1, "ok"]
 * ```
 *
 * @see {@link isNullish}
 * @see {@link isNotNullish}
 * @category predicates
 * @since 2.0.0
 */
export function isTruthy(input: unknown): boolean {
  return Boolean(input);
}

/**
 * Checks whether a value is `undefined`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for values that are exactly
 * `undefined`.
 *
 * **Details**
 *
 * Uses `input === undefined`.
 *
 * **Example** (Guarding undefined values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = undefined
 *
 * Predicate.isUndefined(data) // => true
 * ```
 *
 * @see {@link isNotUndefined}
 * @see {@link isNullish}
 * @category guards
 * @since 2.0.0
 */
export function isUndefined(input: unknown): input is undefined {
  return input === undefined;
}

/**
 * Checks whether a value is not `undefined`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` refinement that filters out `undefined`
 * while preserving other falsy values.
 *
 * **Details**
 *
 * Returns a refinement that excludes `undefined`.
 *
 * **Example** (Filtering undefined values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const values = [1, undefined, 2]
 * const defined = values.filter(Predicate.isNotUndefined) // => [1, 2]
 * ```
 *
 * @see {@link isUndefined}
 * @see {@link isNotNullish}
 * @category guards
 * @since 2.0.0
 */
export function isNotUndefined<A>(input: A): input is Exclude<A, undefined> {
  return input !== undefined;
}

/**
 * Checks whether a value is `null`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for nullable values.
 *
 * **Details**
 *
 * Uses `input === null`.
 *
 * **Example** (Guarding null values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = null
 *
 * Predicate.isNull(data) // => true
 * ```
 *
 * @see {@link isNotNull}
 * @see {@link isNullish}
 * @category guards
 * @since 2.0.0
 */
export function isNull(input: unknown): input is null {
  return input === null;
}

/**
 * Checks whether a value is not `null`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` refinement that filters out `null` while
 * preserving other falsy values.
 *
 * **Details**
 *
 * Returns a refinement that excludes `null`.
 *
 * **Example** (Filtering null values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const values = [1, null, 2]
 * const nonNull = values.filter(Predicate.isNotNull) // => [1, 2]
 * ```
 *
 * @see {@link isNull}
 * @see {@link isNotNullish}
 * @category guards
 * @since 2.0.0
 */
export function isNotNull<A>(input: A): input is Exclude<A, null> {
  return input !== null;
}

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for nullish values.
 *
 * **Details**
 *
 * Uses `input === null || input === undefined`.
 *
 * **Example** (Guarding nullish values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const values = [0, null, "", undefined]
 * const nullish = values.filter(Predicate.isNullish) // => [null, undefined]
 * ```
 *
 * @see {@link isNotNullish}
 * @see {@link isUndefined}
 * @see {@link isNull}
 * @category guards
 * @since 4.0.0
 */
export function isNullish<A>(input: A): input is A & (null | undefined) {
  return input === null || input === undefined;
}

/**
 * Checks whether a value is not `null` and not `undefined`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` refinement that filters out nullish values
 * but keeps other falsy ones.
 *
 * **Details**
 *
 * Uses `input != null`.
 *
 * **Example** (Filtering non-nullish values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const values = [0, null, "", undefined]
 * const present = values.filter(Predicate.isNotNullish) // => [0, ""]
 * ```
 *
 * @see {@link isNullish}
 * @see {@link isNotNull}
 * @see {@link isNotUndefined}
 * @category guards
 * @since 4.0.0
 */
export function isNotNullish<A>(input: A): input is NonNullable<A> {
  return input != null;
}

/**
 * Type guard that always returns `false`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` that never accepts, e.g. in default branches.
 *
 * **Example** (Matching no values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * Predicate.isNever("anything") // => false
 * ```
 *
 * @see {@link isUnknown}
 * @category guards
 * @since 2.0.0
 */
export function isNever(_: unknown): _ is never {
  return false;
}

/**
 * Type guard that always returns `true`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` that always accepts, e.g. as a placeholder.
 *
 * **Example** (Matching every value)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * Predicate.isUnknown(123) // => true
 * ```
 *
 * @see {@link isNever}
 * @category guards
 * @since 2.0.0
 */
export function isUnknown(_: unknown): _ is unknown {
  return true;
}

/**
 * A function that checks if the passed parameter is an Array and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is an Array, false otherwise.
 * @category guards
 */
export function isArray(data: unknown): data is Array<unknown>;
export function isArray<T>(data: T): data is Extract<T, ReadonlyArray<any>>;
export function isArray(data: unknown): data is Array<unknown> {
  return Array.isArray(data);
}

/**
 * Checks whether a value is a non-null object value that is not an array.
 *
 * **When to use**
 *
 * Use to narrow unknown input to a non-null, non-array object with a
 * `Predicate` guard.
 *
 * **Details**
 *
 * This is a structural runtime check using `typeof input === "object"`, so it
 * also accepts object instances such as `Date`, `Map`, class instances, and
 * typed arrays. It excludes `null` and arrays.
 *
 * **Example** (Guarding objects)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * Predicate.isObject({ a: 1 }) // => true
 * Predicate.isObject([1, 2]) // => false
 * ```
 *
 * @see {@link isObjectOrArray}
 * @see {@link isReadonlyObject}
 * @category guards
 * @since 2.0.0
 */
export function isObject(input: unknown): input is { [x: PropertyKey]: unknown } {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

/**
 * Checks whether a value is an object or an array (non-null object).
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard that accepts plain objects and arrays,
 * but not `null`.
 *
 * **Details**
 *
 * Uses `typeof input === "object" && input !== null` and includes arrays.
 *
 * **Example** (Checking objects or arrays)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * Predicate.isObjectOrArray([]) // => true
 * ```
 *
 * @see {@link isObject}
 * @see {@link isObjectKeyword}
 * @category guards
 * @since 4.0.0
 */
export function isObjectOrArray(input: unknown): input is { [x: PropertyKey]: unknown } | Array<unknown> {
  return typeof input === "object" && input !== null;
}

/**
 * Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions).
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard that accepts arrays and functions as
 * well as objects.
 *
 * **Details**
 *
 * Returns `true` for arrays and functions, and `false` for `null`.
 *
 * **Example** (Checking object keywords)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * Predicate.isObjectKeyword(() => 1) // => true
 * Predicate.isObjectKeyword(null) // => false
 * ```
 *
 * @see {@link isObject}
 * @see {@link isObjectOrArray}
 * @category guards
 * @since 4.0.0
 */
export function isObjectKeyword(input: unknown): input is object {
  return (typeof input === "object" && input !== null) || isFunction(input);
}

/**
 * Checks whether a value has a given property key.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for property access on `unknown`
 * values with a simple structural object check.
 *
 * **Details**
 *
 * Uses the `in` operator and `isObjectKeyword`. This does not check property
 * value types.
 *
 * **Example** (Guarding object properties)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const hasName = Predicate.hasProperty("name")
 * const data: unknown = { name: "Ada" }
 *
 * if (hasName(data)) {
 *   data.name // => "Ada"
 * }
 * ```
 *
 * @see {@link isTagged}
 * @see {@link isObjectKeyword}
 * @category guards
 * @since 2.0.0
 */
export const hasProperty: {
  <P extends PropertyKey>(property: P): (data: unknown) => data is { [K in P]: unknown };
  <P extends PropertyKey>(data: unknown, property: P): data is { [K in P]: unknown };
} = dual(
  2,
  <P extends PropertyKey>(data: unknown, property: P): data is { [K in P]: unknown } => isObjectKeyword(data) && property in data,
);

/**
 * Checks whether a value is a `Set`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` runtime guard for `Set` values.
 *
 * **Details**
 *
 * Uses `instanceof Set`.
 *
 * **Example** (Guarding a Set)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = new Set([1, 2])
 *
 * if (Predicate.isSet(data)) {
 *   data.size // => 2
 * }
 * ```
 *
 * @see {@link isMap}
 * @see {@link isIterable}
 * @category guards
 * @since 2.0.0
 */
export function isSet(input: unknown): input is Set<unknown> {
  return input instanceof Set;
}

/**
 * Checks whether a value is a `Map`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` runtime guard for `Map` values.
 *
 * **Details**
 *
 * Uses `instanceof Map`.
 *
 * **Example** (Guarding a Map)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = new Map([["a", 1]])
 *
 * if (Predicate.isMap(data)) {
 *   data.size // => 1
 * }
 * ```
 *
 * @see {@link isSet}
 * @see {@link isIterable}
 * @category guards
 * @since 2.0.0
 */
export function isMap(input: unknown): input is Map<unknown, unknown> {
  return input instanceof Map;
}

/**
 * Checks whether a value is a `Date`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` runtime guard for dates.
 *
 * **Details**
 *
 * Uses `instanceof Date`.
 *
 * **Example** (Guarding Date values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = new Date()
 *
 * Predicate.isDate(data) // => true
 * ```
 *
 * @see {@link isRegExp}
 * @category guards
 * @since 2.0.0
 */
export function isDate(input: unknown): input is Date {
  return input instanceof Date;
}

/**
 * Checks whether a value is an `Error`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for errors caught from unknown sources.
 *
 * **Details**
 *
 * Uses `instanceof Error`.
 *
 * **Example** (Guarding errors)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = new Error("boom")
 *
 * Predicate.isError(data) // => true
 * ```
 *
 * @see {@link isUnknown}
 * @category guards
 * @since 2.0.0
 */
export function isError(input: unknown): input is Error {
  return input instanceof Error;
}

/**
 * Checks whether a value is a `RegExp`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` runtime guard for regular expressions.
 *
 * **Details**
 *
 * Uses `instanceof RegExp`.
 *
 * **Example** (Guarding RegExp values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = /abc/
 *
 * Predicate.isRegExp(data) // => true
 * ```
 *
 * @see {@link isDate}
 * @category guards
 * @since 3.9.0
 */
export function isRegExp(input: unknown): input is RegExp {
  return input instanceof RegExp;
}

/**
 * Checks whether a value is a `Uint8Array`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` runtime guard for binary data.
 *
 * **Details**
 *
 * Uses `instanceof Uint8Array`.
 *
 * **Example** (Guarding Uint8Array values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = new Uint8Array([1, 2])
 *
 * Predicate.isUint8Array(data) // => true
 * ```
 *
 * @see {@link isIterable}
 * @see {@link isSet}
 * @category guards
 * @since 2.0.0
 */
export function isUint8Array(input: unknown): input is Uint8Array {
  return input instanceof Uint8Array;
}

/**
 * Checks whether a value is iterable.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard before iterating an unknown value.
 *
 * **Details**
 *
 * Accepts strings as iterable and uses `hasProperty` for `Symbol.iterator`.
 *
 * **Example** (Guarding iterables)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = [1, 2, 3]
 *
 * Predicate.isIterable(data) // => true
 * ```
 *
 * @see {@link isSet}
 * @see {@link isMap}
 * @category guards
 * @since 2.0.0
 */
export function isIterable(input: unknown): input is Iterable<unknown> {
  return hasProperty(input, Symbol.iterator) || isString(input);
}

/**
 * Checks whether a value is a `Promise`-like object with `then` and `catch`.
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for promise instances across realms.
 *
 * **Details**
 *
 * Performs a structural check for `then` and `catch` functions.
 *
 * **Example** (Guarding promises)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = Promise.resolve(1)
 *
 * Predicate.isPromise(data) // => true
 * ```
 *
 * @see {@link isPromiseLike}
 * @category guards
 * @since 2.0.0
 */
export function isPromise(input: unknown): input is Promise<unknown> {
  return hasProperty(input, "then") && "catch" in input && isFunction(input.then) && isFunction(input.catch);
}

/**
 * Checks whether a value is `PromiseLike` (has a `then` method).
 *
 * **When to use**
 *
 * Use when you need a `Predicate` guard for promise-like values with a
 * callable `then` method.
 *
 * **Details**
 *
 * Performs a structural check for a callable `then`.
 *
 * **Example** (Guarding promise-like values)
 *
 * ```ts
 * import { Predicate } from "effect"
 *
 * const data: unknown = { then: () => {} }
 *
 * Predicate.isPromiseLike(data) // => true
 * ```
 *
 * @see {@link isPromise}
 * @category guards
 * @since 2.0.0
 */
export function isPromiseLike(input: unknown): input is PromiseLike<unknown> {
  return hasProperty(input, "then") && isFunction(input.then);
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
 * Drops elements from the start while the predicate holds, returning the rest.
 *
 * **When to use**
 *
 * Use to remove a leading prefix of elements that satisfy a predicate.
 *
 * **Details**
 *
 * The predicate receives `(element, index)`.
 *
 * **Example** (Dropping while condition holds)
 *
 * ```ts
 * import { Array } from "effect"
 *
 * Array.dropWhile([1, 2, 3, 4, 5], (x) => x < 4) // => [4, 5]
 * ```
 *
 * @see {@link takeWhile} — keep the matching prefix instead
 * @see {@link drop} — drop a fixed count
 *
 * @category getters
 * @since 2.0.0
 */
export const dropWhile: {
  <A>(predicate: (a: NoInfer<A>, i: number) => boolean): (self: Iterable<A>) => Array<A>;
  <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): Array<A>;
} = dual(2, <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): Array<A> => {
  const input: Array<A> = Array.isArray(self) ? self : Array.from(self);
  const len = input.length;
  let idx = 0;
  while (idx < len && predicate(input[idx]!, idx)) idx++;
  return input.slice(idx);
});

/**
 * Takes elements from the start while the predicate holds, stopping at the
 * first element that fails.
 *
 * **When to use**
 *
 * Use to keep the leading elements of an iterable while each element satisfies
 * a predicate, returning the retained prefix as an array.
 *
 * **Details**
 *
 * Supports refinements for type narrowing. The predicate receives
 * `(element, index)`.
 *
 * **Example** (Taking while condition holds)
 *
 * ```ts
 * import { Array } from "effect"
 *
 * Array.takeWhile([1, 3, 2, 4, 1, 2], (x) => x < 4) // => [1, 3, 2]
 * ```
 *
 * @see {@link take} for keeping a fixed number of leading elements
 * @see {@link dropWhile} for removing the matching prefix and keeping the rest
 * @see {@link span} for splitting the matching prefix from the remaining elements
 *
 * @category getters
 * @since 2.0.0
 */
export const takeWhile: {
  <A, B extends A>(refinement: (a: NoInfer<A>, i: number) => a is B): (self: Iterable<A>) => Array<B>;
  <A>(predicate: (a: NoInfer<A>, i: number) => boolean): (self: Iterable<A>) => Array<A>;
  <A, B extends A>(self: Iterable<A>, refinement: (a: A, i: number) => a is B): Array<B>;
  <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): Array<A>;
} = dual(2, <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): Array<A> => {
  const input: Array<A> = Array.isArray(self) ? self : Array.from(self);
  const len = input.length;
  let idx = 0;
  while (idx < len && predicate(input[idx]!, idx)) idx++;
  return input.slice(0, idx);
});

// #endregion
