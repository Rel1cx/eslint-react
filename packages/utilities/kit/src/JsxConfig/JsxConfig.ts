import type { RuleContext } from "../types";
import { getOrUpdate } from "@eslint-react/eff";
import { type CompilerOptions, JsxEmit } from "typescript";
import * as RE from "../RE";

export type JsxConfig = Pick<
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
 * Create a JsxConfig object
 * @returns JsxConfig
 */
export function make(): JsxConfig {
  return {};
}

/**
 * Get JsxConfig from RuleContext
 * @param context The RuleContext
 * @returns JsxConfig
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

const cache = new WeakMap<RuleContext["sourceCode"], JsxConfig>();

/**
 * Get JsxConfig from annotation
 * @param context The RuleContext
 * @returns JsxConfig
 */
export function getFromAnnotation(context: RuleContext) {
  return getOrUpdate(
    cache,
    context.sourceCode,
    () => {
      const options = make();
      if (!context.sourceCode.text.includes("@jsx")) return options;
      // eslint-disable-next-line perfectionist/sort-variable-declarations
      let jsx, jsxFrag, jsxRuntime, jsxImportSource;
      for (const comment of context.sourceCode.getAllComments().reverse()) {
        const value = comment.value;
        jsx ??= value.match(RE.ANNOTATION_JSX)?.[1];
        jsxFrag ??= value.match(RE.ANNOTATION_JSX_FRAG)?.[1];
        jsxRuntime ??= value.match(RE.ANNOTATION_JSX_RUNTIME)?.[1];
        jsxImportSource ??= value.match(RE.ANNOTATION_JSX_IMPORT_SOURCE)?.[1];
      }
      if (jsx != null) options.jsxFactory = jsx;
      if (jsxFrag != null) options.jsxFragmentFactory = jsxFrag;
      if (jsxRuntime != null) options.jsx = jsxRuntime === "classic" ? JsxEmit.React : JsxEmit.ReactJSX;
      if (jsxImportSource != null) options.jsxImportSource = jsxImportSource;
      return options;
    },
  );
}
