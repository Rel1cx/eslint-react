import { isString } from "@local/eff";

/**
 * Check if a value appears to be an external link.
 * External links typically start with http(s):// or have protocol-relative format.
 * @param value The value to check
 * @returns Whether the value represents an external link
 */
export function isExternalLinkLike(value: unknown): boolean {
  if (!isString(value)) return false;

  return value.startsWith("https://") || /^(?:\w+:|\/\/)/u.test(value);
}

/**
 * Check if a rel prop value contains the necessary security attributes.
 * At minimum, it should contain "noreferrer", or "noopener" when `allowReferrer` is enabled.
 * @param value The rel prop value to check
 * @param allowReferrer Whether "noopener" alone is considered secure
 * @returns Whether the rel value is considered secure
 */
export function isSafeRel(value: unknown, allowReferrer: boolean): boolean {
  if (!isString(value)) return false;

  if (/\bnoreferrer\b/u.test(value)) return true;

  return allowReferrer && /\bnoopener\b/u.test(value);
}
