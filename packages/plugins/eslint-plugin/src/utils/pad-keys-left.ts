import { transformKeys } from "./transform-keys";

export type PadKeysLeft<T, U extends string = ""> = T extends [] ? T
  : { [K in keyof T as `${U}${Extract<K, string>}`]: T[K] };

export function padKeysLeft<const T, const U extends string = "">(
  obj: T,
  left: U,
): PadKeysLeft<T, U> {
  // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion, @typescript-eslint/no-unsafe-type-assertion
  return transformKeys(obj, (key) => `${left}${key}`) as never;
}
