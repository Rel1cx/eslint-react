/* eslint-disable perfectionist/sort-objects */

import { JsxDetectionHint } from "../jsx";

export type ComponentDetectionHint = bigint;

/**
 * Hints for component collector
 */
export const ComponentDetectionHint = {
  /**
   * 1n << 0n - 1n << 63n are reserved for JsxDetectionHint
   */
  ...JsxDetectionHint,
  /**
   * Skip function component defined on object method
   */
  SkipObjectMethod: 1n << 64n,
  /**
   * Skip function component defined on class method
   */
  SkipClassMethod: 1n << 65n,
  /**
   * Skip function component defined on class property
   */
  SkipClassProperty: 1n << 66n,
  /**
   * Skip function component defined as array map callback
   */
  SkipArrayMapCallback: 1n << 67n,
} as const;

/**
 * Default component detection hint
 */
export const DEFAULT_COMPONENT_DETECTION_HINT = 0n
  | ComponentDetectionHint.SkipArrayMapCallback
  | ComponentDetectionHint.SkipBooleanLiteral
  | ComponentDetectionHint.SkipEmptyArray
  | ComponentDetectionHint.SkipNumberLiteral
  | ComponentDetectionHint.SkipStringLiteral
  | ComponentDetectionHint.SkipUndefined
  | ComponentDetectionHint.StrictArray
  | ComponentDetectionHint.StrictConditional
  | ComponentDetectionHint.StrictLogical;
