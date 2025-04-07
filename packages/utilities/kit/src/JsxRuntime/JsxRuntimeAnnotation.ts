import type { _ } from "@eslint-react/eff";
import type { RuleContext } from "../Rule";

/**
 * Regular expression for matching a `@jsx` annotation comment.
 */
export const RE_JSX_RT_ANNOTATION_JSX = /@jsx\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxFrag` annotation comment.
 */
export const RE_JSX_RT_ANNOTATION_JSX_FRAG = /@jsxFrag\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxRuntime` annotation comment.
 */
export const RE_JSX_RT_ANNOTATION_JSX_RUNTIME = /@jsxRuntime\s+(\S+)/u;

/**
 * Regular expression for matching a `@jsxImportSource` annotation comment.
 */
export const RE_JSX_RT_ANNOTATION_JSX_IMPORT_SOURCE = /@jsxImportSource\s+(\S+)/u;

export interface JsxRuntimeAnnotation {
  jsx?: _ | string;
  jsxFrag?: _ | string;
  jsxImportSource?: _ | string;
  jsxRuntime?: _ | string;
}

export function make(): JsxRuntimeAnnotation {
  return {};
}

/**
 * Get the a JsxRuntimeAnnotation object representing the JSX annotations in the file.
 * @param context The RuleContext
 * @returns JsxRuntimeAnnotation
 */
export function getJsxRuntimeAnnotation(context: RuleContext) {
  const JsxRuntimeAnnotation = make();
  if (!context.sourceCode.text.includes("@jsx")) return JsxRuntimeAnnotation;
  const allComments = context.sourceCode.getAllComments();
  for (const comment of allComments) {
    const jsx = comment.value.match(RE_JSX_RT_ANNOTATION_JSX);
    const jsxFrag = comment.value.match(RE_JSX_RT_ANNOTATION_JSX_FRAG);
    const jsxRuntime = comment.value.match(RE_JSX_RT_ANNOTATION_JSX_RUNTIME);
    const jsxImportSource = comment.value.match(RE_JSX_RT_ANNOTATION_JSX_IMPORT_SOURCE);
    JsxRuntimeAnnotation.jsx = jsx?.[1];
    JsxRuntimeAnnotation.jsxFrag = jsxFrag?.[1];
    JsxRuntimeAnnotation.jsxRuntime = jsxRuntime?.[1];
    JsxRuntimeAnnotation.jsxImportSource = jsxImportSource?.[1];
  }
  return JsxRuntimeAnnotation;
}
