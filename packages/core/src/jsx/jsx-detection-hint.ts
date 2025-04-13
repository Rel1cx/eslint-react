// type ReactNode =
//   | ReactElement
//   | string
//   | number
//   | Iterable<ReactNode>
//   | ReactPortal
//   | boolean
//   | null
//   | undefined
//   | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[
//     keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES
//   ];

export type JSXDetectionHint = bigint;

/* eslint-disable perfectionist/sort-objects */
export const JSXDetectionHint = {
  None: 0n,
  SkipUndefined: 1n << 0n,
  SkipNullLiteral: 1n << 1n,
  SkipBooleanLiteral: 1n << 2n,
  SkipStringLiteral: 1n << 3n,
  SkipNumberLiteral: 1n << 4n,
  SkipBigIntLiteral: 1n << 5n,
  SkipEmptyArray: 1n << 6n,
  SkipCreateElement: 1n << 7n,
  StrictArray: 1n << 8n,
  StrictLogical: 1n << 9n,
  StrictConditional: 1n << 10n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const DEFAULT_JSX_DETECTION_HINT = 0n
  | JSXDetectionHint.SkipUndefined
  | JSXDetectionHint.SkipBooleanLiteral;
