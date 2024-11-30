import type { ESLintReactSettings } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";

/**
 * Check if an identifier is initialized from React
 * @param name The top-level identifier's name
 * @param initialScope Initial scope to search for the identifier
 * @param settings ESLint React settings
 * @returns Whether the identifier is initialized from React
 */
export function isInitializedFromReact(
  name: string,
  initialScope: Scope,
  settings: ESLintReactSettings,
) {
  if (!settings.strictImportCheck) return true;
  // Optimistic assertion when identifier is named react
  if (name.toLowerCase() === "react") return true;
  const { importSource = "react" } = settings;
  return VAR.isInitializedFromSource(name, importSource, initialScope);
}
