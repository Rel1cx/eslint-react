import { constFalse } from "@eslint-react/eff";

import { RE_REGEXP_STR } from "./constants";

/**
 * A type represents RegExp-like object with `test` method.
 */
export type RegExpLike = { test: (s: string) => boolean };

/**
 * Convert a string to the `RegExp`.
 * Normal strings (e.g., `"foo"`) is converted to `/^foo$/` of `RegExp`.
 * Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`.
 * @see https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts
 * @param string The string to convert.
 * @returns Returns the `RegExp`.
 */
export function toRegExp(string: string | null | undefined): RegExpLike {
  if (string == null) return { test: constFalse } as const;
  const [, pattern, flags = "u"] = RE_REGEXP_STR.exec(string) ?? [];
  if (pattern != null) return new RegExp(pattern, flags);
  return { test: (s) => s === string } as const;
}

/**
 * Check whether given string is regexp string
 * @param string The string to check
 * @returns boolean
 */
export function isRegExp(string: string): boolean {
  return RE_REGEXP_STR.test(string);
}
