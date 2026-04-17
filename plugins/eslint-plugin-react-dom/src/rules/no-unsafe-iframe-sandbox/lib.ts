export const UNSAFE_SANDBOX_VALUES = ["allow-scripts", "allow-same-origin"] as const;

/**
 * Check if the sandbox attribute value contains an unsafe combination
 * An iframe with both "allow-scripts" and "allow-same-origin" can remove its sandbox attribute,
 * making it as insecure as an iframe without any sandboxing
 * @param value The value of the sandbox attribute
 * @returns `true` if the value is a string and contains an unsafe combination, `false` otherwise
 */
export function isUnsafeSandboxCombination(value: unknown): value is string {
  // The value must be a string to be processed
  if (typeof value !== "string") {
    return false;
  }
  // Check if the value includes both "allow-scripts" and "allow-same-origin"
  return UNSAFE_SANDBOX_VALUES.every((v) => value.includes(v));
}
