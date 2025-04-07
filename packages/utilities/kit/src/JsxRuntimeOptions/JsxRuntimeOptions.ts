/* eslint-disable perfectionist/sort-variable-declarations */
import type { RuleContext } from "../Rule";
import { type CompilerOptions, JsxEmit } from "typescript";
import {
  RE_ANNOTATION_JSX,
  RE_ANNOTATION_JSX_FRAG,
  RE_ANNOTATION_JSX_IMPORT_SOURCE,
  RE_ANNOTATION_JSX_RUNTIME,
} from "../RegExp";

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
 * Create a JsxRuntimeOptions object
 * @returns JsxRuntimeOptions
 */
export function make(): JsxRuntimeOptions {
  return {};
}

/**
 * Get JsxRuntimeOptions from RuleContext
 * @param context The RuleContext
 * @returns JsxRuntimeOptions
 */
export function getFromContext(context: RuleContext) {
  const options = context.sourceCode.parserServices?.program?.getCompilerOptions() ?? {};
  return {
    jsx: options.jsx ?? JsxEmit.ReactJSX,
    jsxFactory: options.jsxFactory ?? "React.createElement",
    jsxFragmentFactory: options.jsxFragmentFactory ?? "React.Fragment",
    jsxImportSource: options.jsxImportSource ?? "react",
    reactNamespace: options.reactNamespace ?? "React",
  };
}

/**
 * Get JsxRuntimeOptions from annotation
 * @param context The RuleContext
 * @returns JsxRuntimeOptions
 */
export function getFromAnnotation(context: RuleContext) {
  if (!context.sourceCode.text.includes("@jsx")) return {};
  let jsx, jsxFrag, jsxRuntime, jsxImportSource;
  for (const comment of context.sourceCode.getAllComments()) {
    const value = comment.value;
    jsx = value.match(RE_ANNOTATION_JSX)?.[1];
    jsxFrag = value.match(RE_ANNOTATION_JSX_FRAG)?.[1];
    jsxRuntime = value.match(RE_ANNOTATION_JSX_RUNTIME)?.[1];
    jsxImportSource = value.match(RE_ANNOTATION_JSX_IMPORT_SOURCE)?.[1];
  }
  const options = make();
  if (jsx != null) options.jsxFactory = jsx;
  if (jsxFrag != null) options.jsxFragmentFactory = jsxFrag;
  if (jsxRuntime != null) options.jsx = jsxRuntime === "classic" ? JsxEmit.ReactJSX : JsxEmit.ReactJSXDev;
  if (jsxImportSource != null) options.jsxImportSource = jsxImportSource;
  return options;
}
