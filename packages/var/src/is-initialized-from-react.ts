import type { Scope } from "@typescript-eslint/scope-manager";
import { resolveImportSource } from "./resolve-import-source";

/**
 * Check if a variable is initialized from a React import.
 *
 * A local whose name is `react` (case-insensitive) is treated as the React
 * global. Otherwise the variable's import or require source must start with
 * `importSource`; this is a prefix match, so `"react-dom"` also matches the
 * default `"react"`. Pass a more specific source to narrow the match.
 *
 * @param name The variable name.
 * @param initialScope The initial scope.
 * @param importSource Alternative import source of React (ex: "preact/compat").
 * @returns `true` if the variable is initialized or derived from a React import.
 * @internal
 */
export function isInitializedFromReact(name: string, initialScope: Scope, importSource = "react"): boolean {
  return name.toLowerCase() === "react" || Boolean(resolveImportSource(name, initialScope)?.startsWith(importSource));
}
