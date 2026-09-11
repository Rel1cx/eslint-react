import { RE_ANNOTATION_JSX, RE_ANNOTATION_JSX_FRAG, RE_ANNOTATION_JSX_IMPORT_SOURCE, RE_ANNOTATION_JSX_RUNTIME } from "@eslint-react/shared";
import ts from "typescript";
import type { RichContext } from "./ctx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Resolved JSX configuration derived from compiler options and / or pragma
 * annotations found in the source file.
 */
export interface JsxConfig {
  /** The JSX emit mode. */
  jsx?: ts.JsxEmit;
  /** The JSX factory function (ex: `React.createElement`). */
  jsxFactory?: string;
  /** The JSX fragment factory (ex: `React.Fragment`). */
  jsxFragmentFactory?: string;
  /** The JSX import source (ex: `react`). */
  jsxImportSource?: string;
}

// ---------------------------------------------------------------------------
// Caches
// ---------------------------------------------------------------------------

const cache0 = new WeakMap<RichContext["src"], JsxConfig>();
const cache1 = new WeakMap<RichContext["src"], Required<JsxConfig>>();

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
 * @param context The rich rule context.
 * @returns Fully‑populated `JsxConfig` derived from compiler options.
 */
export function getJsxConfigFromCompilerOptions(context: RichContext): Required<JsxConfig> {
  const src = context.src;
  const options = src.parserServices?.program?.getCompilerOptions() ?? {};
  return {
    jsx: options.jsx ?? ts.JsxEmit.ReactJSX,
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
 * @param context The rich rule context.
 * @returns Partial `JsxConfig` containing only the values found in pragmas.
 */
export function getJsxConfigFromAnnotation(context: RichContext): JsxConfig {
  const src = context.src;
  const cached = cache0.get(src);
  if (cached != null) return cached;

  const options: JsxConfig = {};

  // Fast path – skip comment scanning when the file has no `@jsx` at all.
  if (!src.text.includes("@jsx")) {
    cache0.set(src, options);
    return options;
  }

  // eslint-disable-next-line perfectionist/sort-variable-declarations
  let jsx, jsxFrag, jsxRuntime, jsxImportSource;

  // Iterate in reverse so that the *last* pragma wins (mirrors tsc behaviour).
  for (const comment of src.getAllComments().reverse()) {
    const value = comment.value;
    jsx ??= value.match(RE_ANNOTATION_JSX)?.[1];
    jsxFrag ??= value.match(RE_ANNOTATION_JSX_FRAG)?.[1];
    jsxRuntime ??= value.match(RE_ANNOTATION_JSX_RUNTIME)?.[1];
    jsxImportSource ??= value.match(RE_ANNOTATION_JSX_IMPORT_SOURCE)?.[1];
  }

  if (jsx != null) options.jsxFactory = jsx;
  if (jsxFrag != null) options.jsxFragmentFactory = jsxFrag;
  if (jsxRuntime != null) options.jsx = jsxRuntime === "classic" ? ts.JsxEmit.React : ts.JsxEmit.ReactJSX;
  if (jsxImportSource != null) options.jsxImportSource = jsxImportSource;

  cache0.set(src, options);
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
 * @param context The rich rule context.
 * @returns Fully‑populated, merged `JsxConfig`.
 */
export function getJsxConfig(context: RichContext): Required<JsxConfig> {
  const cached = cache1.get(context.src);
  if (cached != null) return cached;

  const merged: Required<JsxConfig> = {
    ...getJsxConfigFromCompilerOptions(context),
    ...getJsxConfigFromAnnotation(context),
  };

  cache1.set(context.src, merged);
  return merged;
}
