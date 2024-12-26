/* eslint-disable @typescript-eslint/no-unsafe-type-assertion, @susisu/safe-typescript/no-type-assertion, better-mutation/no-mutation */
// Copied from https://github.com/gustavoguichard/string-ts/blob/9dd444f03fdfa225f1643e6f1f8c18f9480224bb/src/utils/object-keys/transform-keys.ts#L12

import { typeOf } from "@eslint-react/types";

/**
 * This function is used to shallowly transform the keys of an object.
 * It will only be transformed at runtime, so it's not type safe.
 * @param obj the object to transform.
 * @param transform the function to transform the keys from string to string.
 * @returns the transformed object.
 * @example transformKeys({ 'foo-bar': { 'fizz-buzz': true } }, camelCase)
 * // { fooBar: { 'fizz-buzz': true } }
 */
export function transformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (typeOf(obj) !== "object") return obj;

  const res = {} as T;
  for (const key in obj) {
    res[transform(key) as keyof T] = obj[key];
  }
  return res;
}
