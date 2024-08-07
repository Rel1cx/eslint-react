/* eslint-disable @susisu/safe-typescript/no-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/**
 * @since 0.4.0
 */
export type Cast<X, Y> = X extends Y ? X : Y;

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

export type FromEntries<T> = T extends [infer Key, unknown][]
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }
  : { [key in string]: unknown };

// fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>

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

export const isTruthy = (input: unknown) => !!input;

export const isSet = (input: unknown): input is Set<unknown> => input instanceof Set;

export const isMap = (input: unknown): input is Map<unknown, unknown> => input instanceof Map;

export const isString = (input: unknown): input is string => typeof input === "string";

export const isNumber = (input: unknown): input is number => typeof input === "number";

export const isBoolean = (input: unknown): input is boolean => typeof input === "boolean";

export const isBigInt = (input: unknown): input is bigint => typeof input === "bigint";

export const isSymbol = (input: unknown): input is symbol => typeof input === "symbol";

export const isFunction = (input: unknown): input is Function => typeof input === "function";

export const isUndefined = (input: unknown): input is undefined => input === undefined;

export const isNotUndefined = <A>(input: A): input is Exclude<A, undefined> => input !== undefined;

export const isNull = (input: unknown): input is null => input === null;

export const isNotNull = <A>(input: A): input is Exclude<A, null> => input !== null;

export const isNever: (input: unknown) => input is never = (_: unknown): _ is never => false;

export const isUnknown: (input: unknown) => input is unknown = (_): _ is unknown => true;

const isRecordOrArray = (input: unknown) => typeof input === "object" && input !== null;

export const isObject = (input: unknown): input is object => isRecordOrArray(input) || isFunction(input);

export const hasProperty = <P extends PropertyKey>(self: unknown, property: P): self is { [K in P]: unknown } =>
  isObject(self) && property in self;

export const isNullable = <A>(input: A): input is Extract<A, null | undefined> => input === null || input === undefined;

export const isNotNullable = <A>(input: A): input is NonNullable<A> => input !== null && input !== undefined;

export const isError = (input: unknown): input is Error => input instanceof Error;

export const isUint8Array = (input: unknown): input is Uint8Array => input instanceof Uint8Array;

export const isDate = (input: unknown): input is Date => input instanceof Date;

export const isIterable = (input: unknown): input is Iterable<unknown> => hasProperty(input, Symbol.iterator);

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

export function zip<T>(arr1: readonly T[]): Array<[T]>;
export function zip<T, U>(arr1: readonly T[], arr2: readonly U[]): Array<[T, U]>;
export function zip<T, U, V>(arr1: readonly T[], arr2: readonly U[], arr3: readonly V[]): Array<[T, U, V]>;
export function zip<T, U, V, W>(
  arr1: readonly T[],
  arr2: readonly U[],
  arr3: readonly V[],
  arr4: readonly W[],
): Array<[T, U, V, W]>;
export function zip<T>(...arrs: Array<readonly T[]>): T[][] {
  const result: T[][] = [];

  const maxIndex = Math.max(...arrs.map(x => x.length));

  for (let i = 0; i < maxIndex; i++) {
    const element: T[] = [];

    for (const arr of arrs) {
      element.push(arr[i] as T);
    }

    result.push(element);
  }

  return result;
}
