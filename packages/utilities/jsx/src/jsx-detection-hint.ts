/**
 * BitFlags for configuring JSX detection behavior.
 *
 * Used by {@link isJsxLike} to control which AST node kinds are
 * considered "JSX-like". Combine flags with the `|` operator.
 *
 * @example
 * ```ts
 * const hint = JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
 *   | JsxDetectionHint.DoNotIncludeJsxWithStringValue;
 *
 * isJsxLike(context, node, hint);
 * ```
 */
export type JsxDetectionHint = bigint;

/* eslint-disable perfectionist/sort-objects */
export const JsxDetectionHint = {
  None: 0n,
  DoNotIncludeJsxWithNullValue: 1n << 0n,
  DoNotIncludeJsxWithNumberValue: 1n << 1n,
  DoNotIncludeJsxWithBigIntValue: 1n << 2n,
  DoNotIncludeJsxWithStringValue: 1n << 3n,
  DoNotIncludeJsxWithBooleanValue: 1n << 4n,
  DoNotIncludeJsxWithUndefinedValue: 1n << 5n,
  DoNotIncludeJsxWithEmptyArrayValue: 1n << 6n,
  DoNotIncludeJsxWithCreateElementValue: 1n << 7n,
  RequireAllArrayElementsToBeJsx: 1n << 8n,
  RequireBothSidesOfLogicalExpressionToBeJsx: 1n << 9n,
  RequireBothBranchesOfConditionalExpressionToBeJsx: 1n << 10n,
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Default JSX detection configuration.
 *
 * Skips number, bigint, boolean, string, and undefined literals –
 * the value types that are commonly returned alongside JSX in React
 * components but are not themselves renderable elements.
 */
export const DEFAULT_JSX_DETECTION_HINT: JsxDetectionHint = 0n
  | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
  | JsxDetectionHint.DoNotIncludeJsxWithBigIntValue
  | JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
  | JsxDetectionHint.DoNotIncludeJsxWithStringValue
  | JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue;
