/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject = Record<string, any>;

export type Remap<T> = {
    [P in keyof T]: T[P];
    // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;

export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;

/**
 * Infers embedded primitive type of any type
 *
 * @param T - Type to infer
 * @returns Embedded type of {@link TType}
 *
 * @example
 * type Result = Narrow<['foo', 'bar', 1]>
 */
// s/o https://twitter.com/hd_nvim/status/1578567206190780417
export type Narrow<TType> =
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (TType extends Function ? TType : never)
    | (TType extends string | number | boolean | bigint ? TType : never)
    | (TType extends [] ? [] : never)
    | {
          [K in keyof TType]: Narrow<TType[K]>;
      };

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const identity = <T>(a: T) => a;

export const asConst = <const T>(a: T) => a;

/**
 * Infers embedded primitive type of any type
 * Same as `as const` but without setting the object as readonly and without needing the user to use it.
 *
 * @param value - Value to infer
 * @returns Value with embedded type inferred
 *
 * @example
 * const result = narrow(['foo', 'bar', 1])
 */
export const narrow = <TType>(a: Narrow<TType>) => a;
