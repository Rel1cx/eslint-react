import * as tsParser from "@typescript-eslint/parser";
import type { RuleTesterConfig } from "@typescript-eslint/rule-tester";

import { getFixturesRootDir } from "./fixtures";

/**
 * Shared input for building language options across the test kit.
 * `jsx` toggles JSX parsing, `sourceType` maps to the flat-config
 * `languageOptions.sourceType`, and `types` selects type-aware parsing:
 * `true` uses the project service, `{ tsconfig }` pins a tsconfig file
 * (resolved against `tsconfigRootDir`, which defaults to the fixtures root).
 */
export interface TestLanguageOptionsInput {
  jsx?: boolean;
  sourceType?: "commonjs" | "module" | "script";
  tsconfigRootDir?: string;
  types?: boolean | { tsconfig: string };
}

/**
 * The single construction site for the language options used by every
 * harness in this package (rule tester, inline-rule runner, fix runner).
 */
export function defineTestLanguageOptions(input: TestLanguageOptionsInput = {}) {
  const {
    jsx = true,
    sourceType = "module",
    tsconfigRootDir = getFixturesRootDir(),
    types = false,
  } = input;
  return {
    ecmaVersion: "latest",
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx },
      jsx,
      ...(types === false
        ? { project: false, projectService: false }
        : types === true
        ? { projectService: true, tsconfigRootDir }
        : { project: types.tsconfig, projectService: false, tsconfigRootDir }),
      warnOnUnsupportedTypeScriptVersion: false,
    },
    sourceType,
  } as const satisfies RuleTesterConfig["languageOptions"];
}

/**
 * Extracts the extension (with leading dot) from a file path, used to build
 * the flat-config `files` pattern a filename requires. Returns an empty
 * string when the path has no extension.
 */
export function getFileExtension(filePath: string): string {
  return filePath.match(/\.[^./\\]+$/)?.[0] ?? "";
}
