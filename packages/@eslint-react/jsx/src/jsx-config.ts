/* eslint-disable perfectionist/sort-objects */
import type { RuleContext } from "@eslint-react/eslint";
import {
  RE_ANNOTATION_JSX,
  RE_ANNOTATION_JSX_FRAG,
  RE_ANNOTATION_JSX_IMPORT_SOURCE,
  RE_ANNOTATION_JSX_RUNTIME,
} from "@eslint-react/shared";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * TypeScript `jsx` compiler option values.
 *
 * Mirrors `ts.JsxEmit` so that consumers do not need a direct dependency on
 * the TypeScript compiler.
 */
export const JsxEmit = {
  None: 0,
  Preserve: 1,
  React: 2,
  ReactNative: 3,
  ReactJSX: 4,
  ReactJSXDev: 5,
} as const;

/**
 * Resolved JSX configuration derived from compiler options and / or pragma
 * annotations found in the source file.
 */
export interface JsxConfig {
  jsx?: number;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  jsxImportSource?: string;
}

// ---------------------------------------------------------------------------
// Caches
// ---------------------------------------------------------------------------

/**
 * Weak‑map cache keyed by `sourceCode` so that the (potentially expensive)
 * pragma‑scanning pass runs at most once per file.
 */
const annotationCache = new WeakMap<RuleContext["sourceCode"], JsxConfig>();

/**
 * Weak‑map cache for the fully‑merged config (compiler options + annotation).
 */
const mergedCache = new WeakMap<RuleContext["sourceCode"], Required<JsxConfig>>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read JSX configuration from the TypeScript compiler options exposed by the
 * parser services.
 *
 * Falls back to sensible React defaults when no compiler options are
 * available (e.g. when the file is parsed without type information).
 *
 * @param context - The ESLint rule context.
 * @returns Fully‑populated `JsxConfig` derived from compiler options.
 */
export function getJsxConfigFromCompilerOptions(context: RuleContext): Required<JsxConfig> {
  const options = context.sourceCode.parserServices?.program?.getCompilerOptions() ?? {};
  return {
    jsx: options.jsx ?? JsxEmit.ReactJSX,
    jsxFactory: options.jsxFactory ?? "React.createElement",
    jsxFragmentFactory: options.jsxFragmentFactory ?? "React.Fragment",
    jsxImportSource: options.jsxImportSource ?? "react",
  };
}

/**
 * Extract JSX configuration from `@jsx`, `@jsxFrag`, `@jsxRuntime` and
 * `@jsxImportSource` pragma comments in the source file.
 *
 * The result is cached per `sourceCode` instance via a `WeakMap` so that
 * repeated calls from different rules analysing the same file are free.
 *
 * @param context - The ESLint rule context.
 * @returns Partial `JsxConfig` containing only the values found in pragmas.
 */
export function getJsxConfigFromAnnotation(context: RuleContext): JsxConfig {
  const cached = annotationCache.get(context.sourceCode);
  if (cached != null) return cached;

  const options: JsxConfig = {};

  // Fast path – skip comment scanning when the file has no `@jsx` at all.
  if (!context.sourceCode.text.includes("@jsx")) {
    annotationCache.set(context.sourceCode, options);
    return options;
  }

  // eslint-disable-next-line perfectionist/sort-variable-declarations
  let jsx, jsxFrag, jsxRuntime, jsxImportSource;

  // Iterate in reverse so that the *last* pragma wins (mirrors tsc behaviour).
  for (const comment of context.sourceCode.getAllComments().reverse()) {
    const value = comment.value;
    jsx ??= value.match(RE_ANNOTATION_JSX)?.[1];
    jsxFrag ??= value.match(RE_ANNOTATION_JSX_FRAG)?.[1];
    jsxRuntime ??= value.match(RE_ANNOTATION_JSX_RUNTIME)?.[1];
    jsxImportSource ??= value.match(RE_ANNOTATION_JSX_IMPORT_SOURCE)?.[1];
  }

  if (jsx != null) options.jsxFactory = jsx;
  if (jsxFrag != null) options.jsxFragmentFactory = jsxFrag;
  if (jsxRuntime != null) options.jsx = jsxRuntime === "classic" ? JsxEmit.React : JsxEmit.ReactJSX;
  if (jsxImportSource != null) options.jsxImportSource = jsxImportSource;

  annotationCache.set(context.sourceCode, options);
  return options;
}

/**
 * Get the fully‑merged JSX configuration for the current file.
 *
 * Compiler options provide the base values; pragma annotations found in the
 * source override them where present.  The result is cached per `sourceCode`.
 *
 * This is the main entry‑point most consumers should use.
 *
 * @param context - The ESLint rule context.
 * @returns Fully‑populated, merged `JsxConfig`.
 */
export function getJsxConfig(context: RuleContext): Required<JsxConfig> {
  const cached = mergedCache.get(context.sourceCode);
  if (cached != null) return cached;

  const merged: Required<JsxConfig> = {
    ...getJsxConfigFromCompilerOptions(context),
    ...getJsxConfigFromAnnotation(context),
  };

  mergedCache.set(context.sourceCode, merged);
  return merged;
}
