import { isObject } from "effect/Predicate";

export function transformKeys<T>(obj: T, transform: (s: string) => string): T {
  if (!isObject(obj)) {
    return obj;
  }

  const res = {} as T;
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    // eslint-disable-next-line security/detect-object-injection
    res[transform(key) as keyof T] = obj[key];
  }

  return res;
}
