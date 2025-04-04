/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable local/prefer-eqeq-nullish-comparison */
/* eslint-disable prefer-rest-params */

// #region Helper

/**
 * 1-byte version `undefined`, produces fewer bytes than `undefined` or `void 0` in output files.
 */
export type _ = undefined; // eslint-disable-line local/no-shadow-underscore

/**
 * 1-byte version `undefined`, produces fewer bytes than `undefined` or `void 0` in output files.
 */
export const _ = undefined; // eslint-disable-line local/no-shadow-underscore

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
 */
export type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base
  : 0 extends 1 & NoInfer<T> ? Base
  : Extract<T, Base>;

// #endregion

// #region Function

/**
 * Returns its argument.
 * @param x - The value to return.
 */
export function identity<T>(x: T): T {
  return x;
}

/**
 * Returns a function that always returns the same value.
 * @param x - The value to return.
 */
export function constant<T>(x: T) {
  return () => x;
}

/**
 * Do nothing and return void
 */
export function constVoid() {}

/**
 * Do nothing and return true
 */
export function constTrue() {
  return true as const;
}

/**
 * Do nothing and return false
 */
export function constFalse() {
  return false as const;
}

// Ported from https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Function.ts
/**
 * Creates a function that can be used in a data-last (aka `pipe`able) or
 * data-first style.
 *
 * The first parameter to `dual` is either the arity of the uncurried function
 * or a predicate that determines if the function is being used in a data-first
 * or data-last style.
 *
 * Using the arity is the most common use case, but there are some cases where
 * you may want to use a predicate. For example, if you have a function that
 * takes an optional argument, you can use a predicate to determine if the
 * function is being used in a data-first or data-last style.
 *
 * @param arity - Either the arity of the uncurried function or a predicate
 *                which determines if the function is being used in a data-first
 *                or data-last style.
 * @param body - The definition of the uncurried function.
 *
 * @example
 * ```ts
 * import { dual, pipe } from "effect/Function"
 *
 * // Example using arity to determine data-first or data-last style
 * const sum: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = dual(2, (self: number, that: number): number => self + that)
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 * assert.deepStrictEqual(pipe(2, sum(3)), 5)
 *
 * // Example using a predicate to determine data-first or data-last style
 * const sum2: {
 *   (that: number): (self: number) => number
 *   (self: number, that: number): number
 * } = dual((args) => args.length === 1, (self: number, that: number): number => self + that)
 *
 * assert.deepStrictEqual(sum(2, 3), 5)
 * assert.deepStrictEqual(pipe(2, sum(3)), 5)
 * ```
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
    return function() {
      if (arity(arguments)) {
        // @ts-expect-error
        return body.apply(this, arguments);
      }
      return ((self: any) => body(self, ...arguments)) as any;
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

    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self: any) {
          return body(self, a, b, c);
        };
      };

    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self: any) {
          return body(self, a, b, c, d);
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
 * Reverses the order of arguments for a curried function.
 *
 * @param f - A curried function that takes multiple arguments.
 *
 * @example
 * ```ts
 * import { flip } from "effect/Function"
 *
 * const f = (a: number) => (b: string) => a - b.length
 *
 * assert.deepStrictEqual(flip(f)('aaa')(2), -1)
 * ```
 */
export const flip = <A extends Array<unknown>, B extends Array<unknown>, C>(
  f: (...a: A) => (...b: B) => C,
): (...b: B) => (...a: A) => C =>
(...b) =>
(...a) => f(...a)(...b);

// eslint-disable-next-line jsdoc/require-param
/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * **When to Use**
 *
 * This is useful in combination with data-last functions as a simulation of
 * methods:
 *
 * ```ts
 * as.map(f).filter(g)
 * ```
 *
 * becomes:
 *
 * ```ts
 * import { pipe, Array } from "eff"
 *
 * pipe(as, Array.map(f), Array.filter(g))
 * ```
 *
 * **Details**
 *
 * The `pipe` function is a utility that allows us to compose functions in a
 * readable and sequential manner. It takes the output of one function and
 * passes it as the input to the next function in the pipeline. This enables us
 * to build complex transformations by chaining multiple functions together.
 *
 * ```ts
 * import { pipe } from "eff"
 *
 * const result = pipe(input, func1, func2, ..., funcN)
 * ```
 *
 * In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
 * `funcN` are the functions to be applied in sequence. The result of each
 * function becomes the input for the next function, and the final result is
 * returned.
 *
 * Here's an illustration of how `pipe` works:
 *
 * ```text
 * ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
 * │ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
 * └───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
 * ```
 *
 * It's important to note that functions passed to `pipe` must have a **single
 * argument** because they are only called with a single argument.
 *
 * @example
 * ```ts
 * // Example: Chaining Arithmetic Operations
 * import { pipe } from "eff"
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
export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
): unknown {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab!(a);
    case 3:
      return bc!(ab!(a));
    case 4:
      return cd!(bc!(ab!(a)));
    case 5:
      return de!(cd!(bc!(ab!(a))));
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))));
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))));
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))));
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}

// eslint-disable-next-line jsdoc/require-param
/**
 * Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.
 *
 * See also [`pipe`](#pipe).
 *
 * @example
 * ```ts
 * import { flow } from "effect/Function"
 *
 * const len = (s: string): number => s.length
 * const double = (n: number): number => n * 2
 *
 * const f = flow(len, double)
 *
 * assert.strictEqual(f('aaa'), 6)
 * ```
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

// #endregion

// #region Predicate

/**
 * A function that takes a guard function as predicate and returns a guard that negates it.
 *
 * @param predicate - The guard function to negate.
 * @returns Function A guard function.
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
 * @returns Function A guard function.
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
 * @returns True if the passed input is an Array, false otherwise. s
 */
export function isArray<T>(data: ArrayLike<unknown> | T): data is NarrowedTo<T, ReadonlyArray<unknown>> {
  return Array.isArray(data);
}

/**
 * Checks if the given parameter is of type `"object"` via `typeof`, excluding `null`.
 *
 * @param data - The variable to be checked for being an object type.
 * @returns The input type, narrowed to only objects.
 */
export function isObject<T>(data: T | object): data is NarrowedTo<T, object> {
  return typeof data === "object" && data !== null;
}

/**
 * A function that checks if the passed parameter is truthy and narrows its type accordingly.
 *
 * @param data - The variable to check.
 * @returns True if the passed input is truthy, false otherwise.
 */
export function isTruthy<T>(data: T): data is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(data);
}

// #endregion

// #region Object & Array

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];

  if (size <= 0) {
    return chunks;
  }

  for (let i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

/**
 * Creates a new array from two supplied arrays by calling the supplied function
 * with the same-positioned element from each array.
 * @param arrayA - The first input array.
 * @param arrayB - The second input array.
 * @param callback - The function applied to each position of the arrays.
 * @returns A new array with the results of the function.
 */
export function zipWith<T, U, V>(
  arrayA: readonly T[],
  arrayB: readonly U[],
  callback: (a: T, b: U, index: number) => V,
): V[] {
  const result: V[] = [];
  for (let i = 0; i < arrayA.length; i++) {
    result.push(callback(arrayA[i]!, arrayB[i]!, i));
  }
  return result;
}

// #region Map & Set

/**
 * Retrieves a value from a Map if the key exists, or computes and stores a new value if it doesn't.
 * @param map - The Map to get from or update
 * @param key - The key to look up in the Map
 * @param callback - The function to call to generate a new value if the key doesn't exist
 * @returns The existing value for the key, or the newly computed value
 */
export function getOrUpdate<K, V>(map: Map<K, V>, key: K, callback: () => V): V {
  if (map.has(key)) {
    return map.get(key)!;
  }
  const value = callback();
  map.set(key, value);
  return value;
}

/**
 * Attempts to add a value to a Set, but only if it doesn't already exist.
 *
 * @param set - The Set to potentially add to
 * @param value - The value to add if it doesn't already exist in the Set
 * @returns true if the value was added, false if it already existed
 */
export function tryAddToSet<T>(set: Set<T>, value: T): boolean {
  if (!set.has(value)) {
    set.add(value);
    return true;
  }
  return false;
}

// #endregion
