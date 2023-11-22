/**
 * Returns the element type of an array.
 * @since 0.4.0
 * @template T type of the array elements.
 * @param arr The array to get the element type from.
 * @returns The element type of the array.
 */
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

/**
 * Returns a new array with unique values based on the given function.
 * @since 0.0.1
 * @template T type of the array elements.
 * @param arr The array to filter.
 * @param fn The function to get the value to compare.
 * @returns new array with unique values.
 */
export function uniqueBy<T>(arr: readonly T[], fn: (x: T) => unknown): T[] {
  return arr.filter((x, i, a) => a.findIndex((y) => fn(x) === fn(y)) === i);
}
