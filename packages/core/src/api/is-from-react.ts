import type { Scope } from "@typescript-eslint/scope-manager";

import { findImportSource } from "./find-import-source";

/**
 * Check if a variable is initialized from React import
 * @param name The variable name
 * @param initialScope The initial scope
 * @param importSource Alternative import source of React (e.g., "preact/compat")
 * @returns True if the variable is initialized or derived from React import
 */
export function isInitializedFromReact(
  name: string,
  initialScope: Scope,
  importSource = "react",
) {
  return name.toLowerCase() === "react" || Boolean(findImportSource(name, initialScope)?.startsWith(importSource));
}
