// Copied from https://github.com/gustavoguichard/string-ts/blob/9dd444f03fdfa225f1643e6f1f8c18f9480224bb/src/utils/object-keys/transform-keys.ts#L12
import { Predicate as Prd } from "effect";

export function transformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (!Prd.isObject(obj)) return obj;
  const res = {} as T;
  for (const key in obj) {
    res[transform(key) as keyof T] = obj[key];
  }

  return res;
}
