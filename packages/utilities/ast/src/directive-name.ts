/**
 * Check if a string is a directive name
 * @param name The string to check
 * @returns True if the string is a directive name, false otherwise
 */
export function isDirectiveName(name: string) {
  return name.startsWith("use ") && name.length > 4;
}
