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

import type { Pretty } from "./type";

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

// #region Object Helpers

// Ported from: https://github.com/remeda/remeda/blob/9d742036f6c9cdc216e2c771805051855e7e7ac4/src/entries.ts
type EntriesEntryForKey<T, Key extends keyof T> = Key extends number | string ? [key: `${Key}`, value: Required<T>[Key]]
  : never;
type EntriesEntry<T> = Pretty<{ [P in keyof T]-?: EntriesEntryForKey<T, P> }[keyof T]>;
export function entries<T extends {}>(data: T): Array<EntriesEntry<T>>;
export function entries(): <T extends {}>(data: T) => Array<EntriesEntry<T>>;
export function entries(...args: ReadonlyArray<unknown>): unknown {
  return Object.entries(args);
}

// Ported from: https://github.com/remeda/remeda/blob/9d742036f6c9cdc216e2c771805051855e7e7ac4/src/fromEntries.ts
type IterableContainer<T = unknown> = readonly [] | ReadonlyArray<T>;
type FromEntriesEntry<Key extends PropertyKey = PropertyKey, Value = unknown> = readonly [
  key: Key,
  value: Value,
];
type FromEntries<Entries> = Entries extends readonly [
  infer First,
  ...infer Tail,
] ? FromEntriesTuple<First, Tail>
  : Entries extends readonly [...infer Head, infer Last] ? FromEntriesTuple<Last, Head>
  : Entries extends IterableContainer<FromEntriesEntry> ? FromEntriesArray<Entries>
  : "ERROR: Entries array-like could not be inferred";
type FromEntriesTuple<E, Rest> = E extends FromEntriesEntry ? FromEntries<Rest> & Record<E[0], E[1]>
  : "ERROR: Array-like contains a non-entry element";
type FromEntriesArray<Entries extends IterableContainer<FromEntriesEntry>> = string extends AllKeys<Entries>
  ? Record<string, Entries[number][1]>
  : number extends AllKeys<Entries> ? Record<number, Entries[number][1]>
  : symbol extends AllKeys<Entries> ? Record<symbol, Entries[number][1]>
  : FromEntriesArrayWithLiteralKeys<Entries>;
type FromEntriesArrayWithLiteralKeys<Entries extends IterableContainer<FromEntriesEntry>> = {
  [P in AllKeys<Entries>]?: ValueForKey<Entries, P>;
};
type AllKeys<Entries extends IterableContainer<FromEntriesEntry>> = Extract<
  Entries[number],
  FromEntriesEntry
>[0];
type ValueForKey<
  Entries extends IterableContainer<FromEntriesEntry>,
  K extends PropertyKey,
> = (Extract<Entries[number], FromEntriesEntry<K>> extends never ? Entries[number]
  : Extract<Entries[number], FromEntriesEntry<K>>)[1];
export function fromEntries<Entries extends IterableContainer<FromEntriesEntry>>(
  entries: Entries,
): Pretty<FromEntries<Entries>>;
export function fromEntries(): <Entries extends IterableContainer<FromEntriesEntry>>(
  entries: Entries,
) => Pretty<FromEntries<Entries>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromEntries(...args: ReadonlyArray<any>): unknown {
  return Object.fromEntries(args);
}
