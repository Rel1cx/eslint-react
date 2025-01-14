/* eslint-disable jsdoc/require-param */
/* eslint-disable local/prefer-eqeq-nullish-comparison */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

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

/**
 * Creates a new array with `element` interspersed in between each element of `input`
 * if there is more than 1 value in `input`. Otherwise, returns the existing array.
 */
export function intersperse<T>(input: T[], element: T): T[] {
  if (input.length <= 1) {
    return input;
  }
  const result: T[] = [];
  for (let i = 0, n = input.length; i < n; i++) {
    if (i !== 0) result.push(element);
    result.push(input[i]!);
  }
  return result;
}

export function getOrUpdate<K, V>(map: Map<K, V>, key: K, callback: () => V): V {
  if (map.has(key)) {
    return map.get(key)!;
  }
  const value = callback();
  map.set(key, value);
  return value;
}

export function tryAddToSet<T>(set: Set<T>, value: T): boolean {
  if (!set.has(value)) {
    set.add(value);
    return true;
  }
  return false;
}

export function concatenate<T>(array1: T[], array2: T[]): T[];
export function concatenate<T>(array1: readonly T[], array2: readonly T[]): readonly T[];
export function concatenate<T>(array1: T[], array2: T[] | undefined): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function concatenate<T>(array1: T[] | undefined, array2: T[]): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function concatenate<T>(array1: readonly T[], array2: readonly T[] | undefined): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[]): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function concatenate<T>(array1: T[] | undefined, array2: T[] | undefined): T[] | undefined;
export function concatenate<T>(
  array1: readonly T[] | undefined,
  array2: readonly T[] | undefined,
): readonly T[] | undefined;
export function concatenate<T>(
  array1: readonly T[] | undefined,
  array2: readonly T[] | undefined,
): readonly T[] | undefined {
  if (array2 === undefined || array2.length === 0) return array1;
  if (array1 === undefined || array1.length === 0) return array2;
  return [...array1, ...array2];
}
