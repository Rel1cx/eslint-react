import { transformKeys } from "./transform-keys";

export type PadKeysLeft<T, U extends string = ""> = T extends [] ? T
  : { [K in keyof T as `${U}${Extract<K, string>}`]: T[K] };

export function padKeysLeft<const T, const U extends string = "">(
  obj: T,
  left: U,
): PadKeysLeft<T, U> {
  return transformKeys(obj, (key) => `${left}${key}`) as never;
}

export type PadKeysRight<T, U extends string = ""> = T extends [] ? T
  : { [K in keyof T as `${Extract<K, string>}${U}`]: T[K] };

export function padKeysRight<const T, const U extends string = "">(
  obj: T,
  right: U,
): PadKeysRight<T, U> {
  return transformKeys(obj, (key) => `${key}${right}`) as never;
}
