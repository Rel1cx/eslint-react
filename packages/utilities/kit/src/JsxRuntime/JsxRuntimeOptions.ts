import type { RuleContext } from "../_Rule";
import { getTsconfig, type TsConfigJson } from "get-tsconfig";

export type JsxRuntimeOptions = Pick<
  TsConfigJson.CompilerOptions,
  // Specifies the object invoked for `createElement` and `__spread` when targeting `'react'` JSX emit.
  | "reactNamespace"
  // Specifies what JSX code is generated.
  | "jsx"
  // Specifies the JSX factory function to use when targeting React JSX emit, e.g. `React.createElement` or `h`.
  | "jsxFactory"
  // Specifies the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
  | "jsxFragmentFactory"
  // Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.
  | "jsxImportSource"
>;

export const defaultJsxRuntimeOptions = {
  jsx: "react-jsx",
  jsxFactory: "React.createElement",
  jsxFragmentFactory: "React.Fragment",
  jsxImportSource: "react",
  reactNamespace: "React",
} as const satisfies JsxRuntimeOptions;

const tsconfigCache = new Map<string, unknown>();

// TODO: Add `jsconfig.json` support for JavaScript projects.
export function getJsxRuntimeOptionsFromContext(context: RuleContext) {
  const tsconfigResult = getTsconfig(context.cwd, "tsconfig.json", tsconfigCache);
  const compilerOptions = tsconfigResult?.config.compilerOptions;
  if (compilerOptions == null) return defaultJsxRuntimeOptions;
  return {
    jsx: compilerOptions.jsx ?? defaultJsxRuntimeOptions.jsx,
    jsxFactory: compilerOptions.jsxFactory ?? defaultJsxRuntimeOptions.jsxFactory,
    jsxFragmentFactory: compilerOptions.jsxFragmentFactory ?? defaultJsxRuntimeOptions.jsxFragmentFactory,
    jsxImportSource: compilerOptions.jsxImportSource ?? defaultJsxRuntimeOptions.jsxImportSource,
    reactNamespace: compilerOptions.reactNamespace ?? defaultJsxRuntimeOptions.reactNamespace,
  };
}
