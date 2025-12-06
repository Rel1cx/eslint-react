/* eslint-disable perfectionist/sort-objects */
import { getOrElseUpdate } from "@eslint-react/eff";
import {
  RE_ANNOTATION_JSX,
  RE_ANNOTATION_JSX_FRAG,
  RE_ANNOTATION_JSX_IMPORT_SOURCE,
  RE_ANNOTATION_JSX_RUNTIME,
  type RuleContext,
} from "@eslint-react/shared";

export const JsxEmit = {
  None: 0,
  Preserve: 1,
  React: 2,
  ReactNative: 3,
  ReactJSX: 4,
  ReactJSXDev: 5,
} as const;

export interface JsxConfig {
  jsx?: number;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  jsxImportSource?: string;
}

/**
 * Get JsxConfig from the rule context by reading compiler options
 * @param context The RuleContext
 * @returns JsxConfig derived from compiler options
 */
export function getJsxConfigFromContext(context: RuleContext) {
  const options = context.sourceCode.parserServices?.program?.getCompilerOptions() ?? {};
  return {
    jsx: options.jsx ?? JsxEmit.ReactJSX,
    jsxFactory: options.jsxFactory ?? "React.createElement",
    jsxFragmentFactory: options.jsxFragmentFactory ?? "React.Fragment",
    jsxImportSource: options.jsxImportSource ?? "react",
  };
}

// A weak map to cache JsxConfig for each source code
const cache = new WeakMap<RuleContext["sourceCode"], JsxConfig>();

/**
 * Get JsxConfig from pragma comments (annotations) in the source code
 * @param context The RuleContext
 * @returns JsxConfig derived from pragma comments
 */
export function getJsxConfigFromAnnotation(context: RuleContext) {
  return getOrElseUpdate(
    cache,
    context.sourceCode,
    () => {
      const options: JsxConfig = {};
      // Early return if no @jsx pragma is present
      if (!context.sourceCode.text.includes("@jsx")) return options;
      // eslint-disable-next-line perfectionist/sort-variable-declarations
      let jsx, jsxFrag, jsxRuntime, jsxImportSource;
      // Iterate over comments in reverse to find the last pragma
      for (const comment of context.sourceCode.getAllComments().reverse()) {
        const value = comment.value;
        // Match pragma comments and extract their values
        jsx ??= value.match(RE_ANNOTATION_JSX)?.[1];
        jsxFrag ??= value.match(RE_ANNOTATION_JSX_FRAG)?.[1];
        jsxRuntime ??= value.match(RE_ANNOTATION_JSX_RUNTIME)?.[1];
        jsxImportSource ??= value.match(RE_ANNOTATION_JSX_IMPORT_SOURCE)?.[1];
      }
      // Update options with the extracted values
      if (jsx != null) options.jsxFactory = jsx;
      if (jsxFrag != null) options.jsxFragmentFactory = jsxFrag;
      if (jsxRuntime != null) options.jsx = jsxRuntime === "classic" ? JsxEmit.React : JsxEmit.ReactJSX;
      if (jsxImportSource != null) options.jsxImportSource = jsxImportSource;
      return options;
    },
  );
}
