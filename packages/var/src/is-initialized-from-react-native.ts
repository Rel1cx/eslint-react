import type { Scope } from "@typescript-eslint/scope-manager";
import { resolveImportSource } from "./resolve-import-source";

/**
 * Check if a variable is initialized from a React Native import.
 *
 * Locals named `react_native`, `reactnative`, or `rn` (case-insensitive) are
 * treated as React Native globals. Otherwise the variable's import or require
 * source must start with `importSource`; this is a prefix match, so
 * `"react-native-web"` also matches the default `"react-native"`.
 *
 * @param name The variable name.
 * @param initialScope The initial scope.
 * @param importSource Alternative import source of React Native (ex: "react-native-web").
 * @returns `true` if the variable is initialized or derived from a React Native import.
 * @internal
 */
export function isInitializedFromReactNative(name: string, initialScope: Scope, importSource = "react-native"): boolean {
  return [
    "react_native",
    "reactnative",
    "rn",
  ].includes(name.toLowerCase()) || Boolean(resolveImportSource(name, initialScope)?.startsWith(importSource));
}
