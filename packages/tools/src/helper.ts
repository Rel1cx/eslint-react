export namespace Helper {
  /**
   * @param a
   * @since 0.0.1
   */
  export const id = <T>(a: T) => a;

  /**
   * @since 0.0.1
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  export const noop = () => {};

  /**
   * @param a
   * @since 0.0.1
   */
  export const constant = <T>(a: T) => () => a;

  /**
   * @since 0.4.0
   */
  export type Cast<X, Y> = X extends Y ? X : Y;

  /* eslint-disable functional/prefer-immutable-types */
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
   */
  export const asConst = <const T>(a: T) => a;

  /**
   * @since 0.0.1
   * @template T The type to get the union from
   * @example
   * type Result = UnionFromTuple<['foo', 'bar', 1]>
   * // Result = 'foo' | 'bar' | 1
   */
  export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;

  /**
   * @since 0.0.1
   * @template T The type to get the intersection from
   * @example
   * type Result = IntersectionFromTuple<['foo', 'bar', 1]>
   * // Result = 'foo' & 'bar' & 1
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

  export type FromEntries<T> = T extends [infer Key, unknown][]
    ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }
    : { [key in string]: unknown };

  // fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>

  /* eslint-disable @susisu/safe-typescript/no-type-assertion */
  /**
   * type-safe version of Object.fromEntries
   * @param entries The entries to create the object from.
   * @returns The object created from the entries.
   * @since 0.4.0
   */
  export const fromEntries = <T extends [PropertyKey, unknown][]>(entries: T) => {
    return Object.fromEntries(entries) as FromEntries<T>;
  };

  /**
   * type-safe version of Object.entries
   * @param value The value to get the entries from.
   * @returns The entries of the value.
   * @since 0.4.0
   */
  export const entries = <T extends LooseRecord<unknown>>(value: T) => {
    return Object.entries(value) as {
      [K in keyof T]-?: [K, T[K]];
    }[keyof T][];
  };

  /**
   * type-safe version of Object.keys
   * @param value The value to get the keys from.
   * @returns The keys of the value.
   * @since 0.4.0
   */
  export const keys = <T extends LooseRecord<unknown>>(value: T) => Object.keys(value) as (keyof T)[];

  /**
   * type-safe version of Object.values
   * @param value The value to get the values from.
   * @returns The values of the value.
   * @since 0.4.0
   */
  export const values = <T extends LooseRecord<unknown>>(value: T) => Object.values(value) as T[keyof T][];
  /* eslint-enable @susisu/safe-typescript/no-type-assertion */
}
