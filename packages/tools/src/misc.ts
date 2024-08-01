/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * @since 0.4.0
 */
export type Cast<X, Y> = X extends Y ? X : Y;

/**
 * Infers embedded primitive type of any type
 * @since 0.0.1
 * @param T Type to infer
 * @returns Embedded type of {@link TType}
 * @example
 * type Result = Narrow<['foo', 'bar', 1]>
 * @see https://twitter.com/hd_nvim/status/1578567206190780417
 */
export type Narrow<TType> =
  | { [K in keyof TType]: Narrow<TType[K]> }
  | (TType extends [] ? [] : never)
  | (TType extends Function ? TType : never)
  | (TType extends bigint | boolean | number | string ? TType : never);

/**
 * Infers embedded primitive type of any type
 * Same as `as const` but without setting the object as readonly and without needing the user to use it.
 * @since 0.0.1
 * @param a Value to infer
 * @returns Value with embedded type inferred
 * @example
 * const result = narrow(['foo', 'bar', 1])
 */
export const narrow = <TType>(a: Narrow<TType>) => a;

/**
 * @param a The value to infer.
 * @since 0.0.1
 * @returns The value with the type inferred.
 */
export const asConst = <const T>(a: T) => a;

/**
 * This is an enhanced version of the typeof operator to check the type of more complex values.
 * In this case we just mind about arrays and objects. We can add more on demand.
 * @param t the value to be checked
 * @returns the type of the value
 */
export function typeOf(t: unknown) {
  return Object.prototype.toString
    .call(t)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() as "array" | "object" | (string & {});
}

/**
 * @since 0.0.1
 * @template T The type to get the union from
 * @example
 * type Result = UnionFromTuple<['foo', 'bar', 1]>
 * Result = 'foo' | 'bar' | 1
 */
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;

/**
 * @since 0.0.1
 * @template T The type to get the intersection from
 * @example
 * type Result = IntersectionFromTuple<['foo', 'bar', 1]>
 * Result = 'foo' & 'bar' & 1
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  // dprint-ignore
  ? I
  : never;

/**
 * @since 0.0.1
 */
export type Remap<T> = {
  [P in keyof T]: T[P];
};

/**
 * @since 0.0.1
 */
export type Pretty<T> =
  & {
    [P in keyof T]: T[P];
  }
  & {};

/**
 * Returns the element type of an array.
 * @since 0.4.0
 * @template T type of the array elements.
 * @param arr The array to get the element type from.
 * @returns The element type of the array.
 */
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/**
 * A record with loose keys.
 * @template T The type of the values.
 * @since 0.4.0
 */
export type LooseRecord<T> = Record<PropertyKey, T>;
