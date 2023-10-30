import type { ArrayElement } from "./array";
import type { Cast, Pretty } from "./helper";

/**
 * @since 0.3.4
 */
export type FieldDiff<T1, T2> = Omit<T1, keyof T2> | Omit<T2, keyof T1>;

/**
 * @since 0.3.4
 */
export type Combine<T1, T2> = Pretty<
  {
    [K in keyof (T1 | T2)]: T1[K] | T2[K];
  } & Partial<T1 & T2>
>;

/**
 * A record with loose keys.
 * @template T The type of the values.
 * @since 0.4.0
 */
export type LooseRecord<T> = Record<PropertyKey, T>;

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export type FromEntries<T> = T extends [infer Key, unknown][]
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }
  : { [key in string]: unknown };

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;

// fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>

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
 * type-safe version of Object.fromEntries
 * @param entries The entries to create the object from.
 * @returns The object created from the entries.
 * @since 0.4.0
 */
export const fromEntriesWithReadOnly = <T extends [PropertyKey, unknown][]>(entries: T) => {
  return Object.fromEntries(entries) as FromEntriesWithReadOnly<T>;
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
