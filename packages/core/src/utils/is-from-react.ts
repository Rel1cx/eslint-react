import type { Scope } from "@typescript-eslint/scope-manager";

import { isInitializedFromSource } from "./is-from-source";

/**
 * Check if an identifier name is initialized from react
 * @param name The top-level identifier's name
 * @param importSource The import source to check against
 * @param initialScope Initial scope to search for the identifier
 * @returns Whether the identifier name is initialized from react
 */
export function isInitializedFromReact(
  name: string,
  importSource: string,
  initialScope: Scope,
) {
  return name.toLowerCase() === "react" || isInitializedFromSource(name, importSource, initialScope);
}
