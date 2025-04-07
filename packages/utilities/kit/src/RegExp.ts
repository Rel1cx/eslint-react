/**
 * Regular expression for matching a TypeScript file extension.
 */
export const RE_TS_EXT = /^[cm]?tsx?$/;

/**
 * Regular expression for matching a JavaScript file extension.
 */
export const RE_JS_EXT = /^[cm]?jsx?$/;

/**
 * Regular expression for matching a PascalCase string.
 */
export const RE_PASCAL_CASE = /^[A-Z][\dA-Za-z]*$/u;

/**
 * Regular expression for matching a camelCase string.
 */
export const RE_CAMEL_CASE = /^[a-z][\dA-Za-z]*$/u;

/**
 * Regular expression for matching a kebab-case string.
 */
export const RE_KEBAB_CASE = /^[a-z][\d\-a-z]*$/u;

/**
 * Regular expression for matching a snake_case string.
 */
export const RE_SNAKE_CASE = /^[a-z][\d_a-z]*$/u;

/**
 * Regular expression for matching a CONSTANT_CASE string.
 */
export const RE_CONSTANT_CASE = /^[A-Z][\d_A-Z]*$/u;

// @see https://github.com/facebook/react/blob/6db7f4209e6f32ebde298a0b7451710dd6aa3e19/packages/react-dom-bindings/src/shared/sanitizeURL.js#L22
// dprint-ignore
// eslint-disable-next-line no-control-regex
export const RE_JAVASCRIPT_PROTOCOL = /^[\u0000-\u001F ]*j[\t\n\r]*a[\t\n\r]*v[\t\n\r]*a[\t\n\r]*s[\t\n\r]*c[\t\n\r]*r[\t\n\r]*i[\t\n\r]*p[\t\n\r]*t[\t\n\r]*:/iu;

/**
 * Regular expression for matching a valid JavaScript identifier.
 */
export const RE_JS_IDENTIFIER = /^[_$a-z][\w$]*$/i;

/**
 * Regular expression for matching a RegExp string.
 */
export const RE_REGEXP_STR = /^\/(.+)\/([A-Za-z]*)$/u;

/**
 * Regular expression for matching a `@jsx` annotation comment.
 */
export const RE_ANNOTATION_JSX = /@jsx\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxFrag` annotation comment.
 */
export const RE_ANNOTATION_JSX_FRAG = /@jsxFrag\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxRuntime` annotation comment.
 */
export const RE_ANNOTATION_JSX_RUNTIME = /@jsxRuntime\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxImportSource` annotation comment.
 */
export const RE_ANNOTATION_JSX_IMPORT_SOURCE = /@jsxImportSource\s+(\S+)/u;

/**
 * Convert a string to the `RegExp`.
 * Normal strings (e.g. `"foo"`) is converted to `/^foo$/` of `RegExp`.
 * Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`.
 * @see https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts
 * @param string The string to convert.
 * @returns Returns the `RegExp`.
 */
export function toRegExp(string: string): { test(s: string): boolean } {
  const [, pattern, flags = "u"] = RE_REGEXP_STR.exec(string) ?? [];
  if (pattern != null) return new RegExp(pattern, flags);
  return { test: (s) => s === string };
}

/**
 * Checks whether given string is regexp string
 * @param string The string to check
 * @returns boolean
 */
export function isRegExp(string: string): boolean {
  return Boolean(RE_REGEXP_STR.test(string));
}
