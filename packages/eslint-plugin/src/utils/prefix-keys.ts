import { type Join, join } from "string-ts";

import { transformKeys } from "./transform-keys";

export type PrefixKeys<T, U extends string = "_", I extends string = "/"> = T extends [] ? T
  : { [K in keyof T as Join<readonly [U, I, Extract<K, string>]>]: T[K] };

export function prefixKeys<T, U extends string = "_", I extends string = "/">(
  obj: T,
  prefix: U,
  delimiter: I,
): PrefixKeys<T, U, I> {
  return transformKeys(obj, (key) => join([prefix, key], delimiter)) as never;
}
