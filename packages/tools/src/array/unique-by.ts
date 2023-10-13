/**
 * Returns a new array with unique values based on the given function.
 * @template T type of the array elements.
 * @param arr The array to filter.
 * @param fn The function to get the value to compare.
 * @returns new array with unique values.
 */
export function uniqueBy<T>(arr: T[], fn: (x: T) => unknown): T[] {
    return arr.filter((x, i, a) => a.findIndex((y) => fn(x) === fn(y)) === i);
}
