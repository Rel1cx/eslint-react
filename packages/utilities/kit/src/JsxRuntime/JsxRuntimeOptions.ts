import type { RuleContext } from "../Rule";
import { type CompilerOptions, JsxEmit } from "typescript";

export type JsxRuntimeOptions = Pick<
  CompilerOptions,
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

/**
 * Get JsxRuntimeOptions from RuleContext
 * @param context The RuleContext
 * @returns JsxRuntimeOptions
 */
export function getJsxRuntimeOptions(context: RuleContext) {
  const options = context.sourceCode.parserServices?.program?.getCompilerOptions() ?? {};
  return {
    jsx: options.jsx ?? JsxEmit.ReactJSX,
    jsxFactory: options.jsxFactory ?? "React.createElement",
    jsxFragmentFactory: options.jsxFragmentFactory ?? "React.Fragment",
    jsxImportSource: options.jsxImportSource ?? "react",
    reactNamespace: options.reactNamespace ?? "React",
  };
}
