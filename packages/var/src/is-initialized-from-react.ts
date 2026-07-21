import type { Scope } from "@typescript-eslint/scope-manager";
import { resolveImportSource } from "./resolve-import-source";

/**
 * Check if a variable is initialized from a React import.
 * @param name The variable name.
 * @param initialScope The initial scope.
 * @param importSource Alternative import source of React (ex: "preact/compat").
 * @returns `true` if the variable is initialized or derived from a React import.
 * @internal
 */
export function isInitializedFromReact(
  name: string,
  initialScope: Scope,
  importSource = "react",
) {
  return name.toLowerCase() === "react" || Boolean(resolveImportSource(name, initialScope)?.startsWith(importSource));
}
