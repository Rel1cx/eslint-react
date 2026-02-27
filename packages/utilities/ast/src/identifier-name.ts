/**
 * Check if a string is a valid JavaScript identifier name
 * @param name The string to check
 * @returns True if the string is a valid identifier name
 */
export function isIdentifierName(name: string) {
  return /^[A-Z$_][\w$]*$/i.test(name);
}
