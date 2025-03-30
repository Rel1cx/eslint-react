/* eslint-disable perfectionist/sort-objects */
import * as JSX from "@eslint-react/jsx";

export type ComponentHint = bigint;

/**
 * hints for component collector
 */
export const ComponentHint = {
  /**
   * 1n << 0n - 1n << 63n are reserved for JSXValueHint
   */
  ...JSX.JSXValueHint,
  /**
   * Skip function component created by React.memo
   */
  SkipMemo: 1n << 64n,
  /**
   * Skip function component created by React.forwardRef
   */
  SkipForwardRef: 1n << 65n,
  /**
   * Skip function component defined as array map argument
   */
  SkipArrayMapArgument: 1n << 66n,
  /**
   * Skip function component defined on object method
   */
  SkipObjectMethod: 1n << 67n,
  /**
   * Skip function component defined on class method
   */
  SkipClassMethod: 1n << 68n,
  /**
   * Skip function component defined on class property
   */
  SkipClassProperty: 1n << 69n,
} as const;

export const DEFAULT_COMPONENT_HINT = 0n
  | ComponentHint.SkipBooleanLiteral
  | ComponentHint.SkipEmptyArray
  | ComponentHint.SkipArrayMapArgument
  | ComponentHint.SkipNumberLiteral
  | ComponentHint.SkipStringLiteral
  | ComponentHint.SkipUndefined
  | ComponentHint.StrictArray
  | ComponentHint.StrictConditional
  | ComponentHint.StrictLogical;
