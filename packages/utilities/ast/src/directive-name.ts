/**
 * Check if a string is a directive name (heuristic check)
 * Note: This is a broad check that matches any string starting with "use ".
 * For strict validation against known directives, use isDirectiveKind.
 * @param name The string to check
 * @returns True if the string looks like a directive name, false otherwise
 * @see isDirectiveKind
 */
export function isDirectiveName(name: string) {
  return name.startsWith("use ") && name.length > 4;
}
