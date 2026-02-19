/**
 * Check if a given name corresponds to a ref name
 * @param name The name to check
 * @returns True if the name is "ref" or ends with "Ref"
 */
export function isRefLikeName(name: string): boolean {
  return name === "ref" || name.endsWith("Ref");
}
