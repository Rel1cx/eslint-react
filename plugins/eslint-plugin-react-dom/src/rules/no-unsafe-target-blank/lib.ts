/**
 * Check if a value appears to be an external link.
 * External links typically start with http(s):// or have protocol-relative format.
 * @param value The value to check
 * @returns Whether the value represents an external link
 */
export function isExternalLinkLike(value: unknown): boolean {
  if (typeof value !== "string") return false;

  return value.startsWith("https://") || /^(?:\w+:|\/\/)/u.test(value);
}

/**
 * Check if a rel prop value contains the necessary security attributes.
 * At minimum, it should contain "noreferrer".
 * @param value The rel prop value to check
 * @returns Whether the rel value is considered secure
 */
export function isSafeRel(value: unknown): boolean {
  if (typeof value !== "string") return false;

  return value === "noreferrer" || /\bnoreferrer\b/u.test(value);
}
