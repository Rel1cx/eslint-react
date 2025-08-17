/* eslint-disable perfectionist/sort-objects */
import { getOrElseUpdate } from "@eslint-react/eff";
import * as RE from "../RegExp";
import type { RuleContext } from "../types";

export const JsxEmit = {
  None: 0,
  Preserve: 1,
  React: 2,
  ReactNative: 3,
  ReactJSX: 4,
  ReactJSXDev: 5,
} as const;

export interface JsxConfig {
  // Specifies what JSX code is generated.
  jsx?: number;
  // Specifies the JSX factory function to use when targeting React JSX emit, e.g. `React.createElement` or `h`.
  jsxFactory?: string;
  // Specifies the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.
  jsxFragmentFactory?: string;
  // Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.
  jsxImportSource?: string;
}

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
  return getOrElseUpdate(
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
