/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @susisu/safe-typescript/no-type-assertion */
// export function zipWith<T, U, V>(
//   arrayA: readonly T[],
//   arrayB: readonly U[],
//   callback: (a: T, b: U, index: number) => V,
// ): V[] {
//   const result: V[] = [];
//   for (let i = 0; i < arrayA.length; i++) {
//     result.push(callback(arrayA[i]!, arrayB[i]!, i));
//   }
//   return result;
// }

// /**
//  * Creates a new array with `element` interspersed in between each element of `input`
//  * if there is more than 1 value in `input`. Otherwise, returns the existing array.
//  */
// export function intersperse<T>(input: T[], element: T): T[] {
//   if (input.length <= 1) {
//     return input;
//   }
//   const result: T[] = [];
//   for (let i = 0, n = input.length; i < n; i++) {
//     if (i !== 0) result.push(element);
//     result.push(input[i]!);
//   }
//   return result;
// }

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

// /** @internal */
// export function concatenate<T>(array1: T[], array2: T[]): T[];
// /** @internal */
// export function concatenate<T>(array1: readonly T[], array2: readonly T[]): readonly T[];
// /** @internal */
// export function concatenate<T>(array1: T[], array2: T[] | undefined): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
// /** @internal */
// export function concatenate<T>(array1: T[] | undefined, array2: T[]): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
// /** @internal */
// export function concatenate<T>(array1: readonly T[], array2: readonly T[] | undefined): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
// /** @internal */
// export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[]): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
// /** @internal */
// export function concatenate<T>(array1: T[] | undefined, array2: T[] | undefined): T[] | undefined;
// /** @internal */
// export function concatenate<T>(
//   array1: readonly T[] | undefined,
//   array2: readonly T[] | undefined,
// ): readonly T[] | undefined;
// /** @internal */
// export function concatenate<T>(
//   array1: readonly T[] | undefined,
//   array2: readonly T[] | undefined,
// ): readonly T[] | undefined {
//   if (array2 === undefined || array2.length === 0) return array1;
//   if (array1 === undefined || array1.length === 0) return array2;
//   return [...array1, ...array2];
// }

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
type Reverse<T extends Record<any, any>> = { [U in keyof T as T[U]]: U };

function reverse<T extends Record<any, any>>(record: T): Reverse<T> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [value, key]),
  );
}

export function birecord<const T extends Record<any, any>>(
  original: T,
): BiRecord<T> {
  return new BiRecord(original);
}

export class BiRecord<const T extends Record<any, any>> {
  constructor(public original: T, public reversed = reverse(original)) {
  }
  get<U extends keyof T | T[keyof T]>(
    key: U,
  ): U extends keyof T ? T[U] : U extends T[keyof T] ? Reverse<T>[U] : unknown {
    return this.original[key] ?? this.reversed[key as T[keyof T]];
  }
  has(key: any): key is keyof T | T[keyof T] {
    return key in this.original || key in this.reversed;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
