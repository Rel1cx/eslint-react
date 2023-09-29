/**
 * @param arr Array to filter
 * @param fn Function to filter by
 */
export function uniqueBy<T>(arr: T[], fn: (x: T) => unknown): T[] {
    return arr.filter((x, i, a) => a.findIndex((y) => fn(x) === fn(y)) === i);
}
