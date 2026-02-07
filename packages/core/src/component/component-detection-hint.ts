/* eslint-disable perfectionist/sort-objects */

import { JsxDetectionHint } from "../jsx";

export type ComponentDetectionHint = bigint;

/**
 * Hints for component collector
 */
export const ComponentDetectionHint = {
  ...JsxDetectionHint,
  DoNotIncludeFunctionDefinedOnObjectMethod: 1n << 64n,
  DoNotIncludeFunctionDefinedOnClassMethod: 1n << 65n,
  DoNotIncludeFunctionDefinedOnClassProperty: 1n << 66n,
  DoNotIncludeFunctionDefinedInArrayPattern: 1n << 67n,
  DoNotIncludeFunctionDefinedInArrayExpression: 1n << 68n,
  DoNotIncludeFunctionDefinedAsArrayMapCallback: 1n << 69n,
} as const;

/**
 * Default component detection hint
 */
export const DEFAULT_COMPONENT_DETECTION_HINT = 0n
  | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
  | ComponentDetectionHint.DoNotIncludeJsxWithBigIntValue
  | ComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
  | ComponentDetectionHint.DoNotIncludeJsxWithStringValue
  | ComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
  | ComponentDetectionHint.RequireAllArrayElementsToBeJsx
  | ComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
  | ComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayExpression
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedInArrayPattern
  | ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;
