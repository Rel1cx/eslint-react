/**
 * Check if a string is a valid JavaScript identifier name
 * Note: This only checks for ASCII identifiers. Unicode identifiers (e.g., `const 变量 = 1`)
 * are not supported by this simple regex check.
 * @param name The string to check
 * @returns True if the string is a valid ASCII identifier name
 */
export function isIdentifierName(name: string) {
  return /^[A-Z$_][\w$]*$/i.test(name);
}
