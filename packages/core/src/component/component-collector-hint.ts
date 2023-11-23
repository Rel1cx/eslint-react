import { JSXValueCheckHint } from "@eslint-react/jsx";
export type ExRComponentCollectorHint = bigint;

/* eslint-disable perfectionist/sort-objects */
/**
 * hints for component collector
 */
export const ExRComponentCollectorHint = {
  ...JSXValueCheckHint,
  // 1n << 0n - 1n << 63n are reserved for JSXValueCheckHint
  // Skip function component created by React.memo
  SkipMemo: 1n << 64n,
  // Skip function component created by React.forwardRef
  SkipForwardRef: 1n << 65n,
  // Skip function component defined in map function callback
  SkipMapCallback: 1n << 66n,
  // Skip function component defined on object method
  SkipObjectMethod: 1n << 67n,
  // Skip function component defined on class method
  SkipClassMethod: 1n << 68n,
  // Skip function component defined on class property
  SkipClassProperty: 1n << 69n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const defaultComponentCollectorHint = ExRComponentCollectorHint.SkipStringLiteral
  | ExRComponentCollectorHint.SkipNumberLiteral;
