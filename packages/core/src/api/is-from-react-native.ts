import { findImportSource } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";

/**
 * Checks if a variable is initialized from React Native import
 * @param name The variable name
 * @param initialScope The initial scope
 * @param importSource Alternative import source of React Native (e.g., "react-native-web")
 * @returns True if the variable is initialized from React Native import
 */
export function isInitializedFromReactNative(
  name: string,
  initialScope: Scope,
  importSource = "react-native",
) {
  return [
    "react_native",
    "reactnative",
    "rn",
  ].includes(name.toLowerCase()) || Boolean(findImportSource(name, initialScope)?.startsWith(importSource));
}
