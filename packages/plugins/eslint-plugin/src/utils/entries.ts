import type { Pretty } from "@eslint-react/eff";

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
