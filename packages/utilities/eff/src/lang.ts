/* eslint-disable jsdoc/require-param */
/* eslint-disable local/prefer-eqeq-nullish-comparison */

import type { NarrowedTo } from "./type";

/**
 * 1-byte version undefined, produces fewer bytes than `undefined` or `void 0` in the minified output dts.
 */
export type _ = undefined; // eslint-disable-line local/no-shadow-underscore

/**
 * 1-byte version undefined, produces fewer bytes than `undefined` or `void 0` in the minified output js.
 */
export const _ = undefined; // eslint-disable-line local/no-shadow-underscore

/**
 * Do nothing and return false
 */
export function returnFalse(): false {
  return false;
}

/**
 * Do nothing and return true
 */
export function returnTrue(): true {
  return true;
}

/**
 * Do nothing and return undefined
 */
export function returnVoid(): undefined {
  return undefined;
}

/**
 * Returns its argument.
 */
export function identity<T>(x: T): T {
  return x;
}

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
