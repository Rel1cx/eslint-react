// This is a representation of React Node types for reference
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

/**
 * BitFlags for configuring JSX detection behavior
 * Uses BigInt for bit operations to support many flags
 */
export type JSXDetectionHint = bigint;

/* eslint-disable perfectionist/sort-objects */
/**
 * Flags to control JSX detection behavior:
 * - Skip* flags: Ignore specific node types when detecting JSX
 * - Strict* flags: Enforce stricter rules for container types
 */
export const JSXDetectionHint = {
  None: 0n,
  SkipUndefined: 1n << 0n, // Ignore undefined values
  SkipNullLiteral: 1n << 1n, // Ignore null literals
  SkipBooleanLiteral: 1n << 2n, // Ignore boolean literals
  SkipStringLiteral: 1n << 3n, // Ignore string literals
  SkipNumberLiteral: 1n << 4n, // Ignore number literals
  SkipBigIntLiteral: 1n << 5n, // Ignore bigint literals
  SkipEmptyArray: 1n << 6n, // Ignore empty arrays
  SkipCreateElement: 1n << 7n, // Ignore React.createElement calls
  StrictArray: 1n << 8n, // Require all array elements to be JSX
  StrictLogical: 1n << 9n, // Require both sides of logical expr to be JSX
  StrictConditional: 1n << 10n, // Require both branches of conditional to be JSX
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Default JSX detection configuration
 * Skips undefined and boolean literals (common in React)
 */
export const DEFAULT_JSX_DETECTION_HINT = 0n
  | JSXDetectionHint.SkipUndefined
  | JSXDetectionHint.SkipBooleanLiteral;
