import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * BitFlags for configuring JSX detection behavior.
 *
 * Used by `isJsxLike` to control which AST node kinds are considered
 * "JSX-like". Combine flags with the `|` operator.
 */
export type JsxDetectionHint = bigint;

/* eslint-disable perfectionist/sort-objects */
/**
 * Hints for JSX detection.
 */
export const JsxDetectionHint = {
  /** No hints set. */
  None: 0n,
  /** Do not treat `null` values as JSX-like. */
  DoNotIncludeJsxWithNullValue: 1n << 0n,
  /** Do not treat number values as JSX-like. */
  DoNotIncludeJsxWithNumberValue: 1n << 1n,
  /** Do not treat bigint values as JSX-like. */
  DoNotIncludeJsxWithBigIntValue: 1n << 2n,
  /** Do not treat string values as JSX-like. */
  DoNotIncludeJsxWithStringValue: 1n << 3n,
  /** Do not treat boolean values as JSX-like. */
  DoNotIncludeJsxWithBooleanValue: 1n << 4n,
  /** Do not treat undefined values as JSX-like. */
  DoNotIncludeJsxWithUndefinedValue: 1n << 5n,
  /** Do not treat empty array values as JSX-like. */
  DoNotIncludeJsxWithEmptyArrayValue: 1n << 6n,
  /** Do not treat `createElement` calls as JSX-like. */
  DoNotIncludeJsxWithCreateElementValue: 1n << 7n,
  /** Require all array elements to be JSX-like for the array to be JSX-like. */
  RequireAllArrayElementsToBeJsx: 1n << 8n,
  /** Require both sides of a logical expression to be JSX-like. */
  RequireBothSidesOfLogicalExpressionToBeJsx: 1n << 9n,
  /** Require both branches of a conditional expression to be JSX-like. */
  RequireBothBranchesOfConditionalExpressionToBeJsx: 1n << 10n,
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Default JSX detection hint.
 *
 * Skips number, bigint, boolean, string, and undefined literals,
 * the value types that are commonly returned alongside JSX in React
 * components but are not themselves renderable elements.
 */
export const DEFAULT_JSX_DETECTION_HINT: JsxDetectionHint = 0n
  | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
  | JsxDetectionHint.DoNotIncludeJsxWithBigIntValue
  | JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
  | JsxDetectionHint.DoNotIncludeJsxWithStringValue
  | JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue;

/**
 * Check if the node represents JSX-like content based on heuristics.
 *
 * The detection behavior is configurable through {@link JsxDetectionHint}
 * bit-flags so that callers can opt individual value kinds in or out.
 *
 * Identifiers are resolved to their definitions via scope analysis;
 * circular definitions (e.g. `var a = b; var b = a;`) are detected and
 * treated as not JSX-like instead of recursing indefinitely.
 *
 * @param context The ESLint rule context (needed for variable resolution).
 * @param node The AST node to analyze.
 * @param hint Optional bit-flags to adjust detection behavior. Defaults to {@link DEFAULT_JSX_DETECTION_HINT}.
 * @returns Whether the node is considered JSX-like.
 *
 * @example
 * ```ts
 * import { isJsxLike } from "@eslint-react/core";
 *
 * if (isJsxLike(context, node)) {
 *   // node looks like it evaluates to a React element
 * }
 * ```
 */
export function isJsxLike(
  context: RuleContext,
  node: TSESTree.Node | null,
  hint: JsxDetectionHint = DEFAULT_JSX_DETECTION_HINT,
): boolean {
  const seen = new Set<TSESTree.Identifier>();
  function visit(node: TSESTree.Node | null): boolean {
    if (node == null) return false;

    // Actual JSX nodes are always considered JSX-like.
    if (Check.isJSX(node)) return true;

    switch (node.type) {
      case AST.Literal: {
        switch (typeof node.value) {
          case "boolean":
            return !(hint & JsxDetectionHint.DoNotIncludeJsxWithBooleanValue);
          case "string":
            return !(hint & JsxDetectionHint.DoNotIncludeJsxWithStringValue);
          case "number":
            return !(hint & JsxDetectionHint.DoNotIncludeJsxWithNumberValue);
          case "bigint":
            return !(hint & JsxDetectionHint.DoNotIncludeJsxWithBigIntValue);
        }
        // The only nullish literal value is `null`; other object-valued
        // literals (e.g. RegExp) are never JSX-like.
        return node.value == null
          && !(hint & JsxDetectionHint.DoNotIncludeJsxWithNullValue);
      }

      case AST.TemplateLiteral:
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithStringValue);

      case AST.ArrayExpression: {
        if (node.elements.length === 0) {
          return !(hint & JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue);
        }
        return hint & JsxDetectionHint.RequireAllArrayElementsToBeJsx
          ? node.elements.every(visit)
          : node.elements.some(visit);
      }

      case AST.LogicalExpression: {
        if (hint & JsxDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx) {
          return visit(node.left) && visit(node.right);
        }
        return visit(node.left) || visit(node.right);
      }

      case AST.ConditionalExpression: {
        if (hint & JsxDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx) {
          return visit(node.consequent) && visit(node.alternate);
        }
        return visit(node.consequent) || visit(node.alternate);
      }

      // Only the last expression determines the value of a sequence.
      case AST.SequenceExpression:
        return visit(node.expressions.at(-1) ?? null);

      case AST.CallExpression: {
        if (hint & JsxDetectionHint.DoNotIncludeJsxWithCreateElementValue) {
          return false;
        }
        return Extract.getCalleeName(node) === "createElement";
      }

      case AST.Identifier: {
        if (node.name === "undefined") {
          return !(hint & JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue);
        }
        // Guard against circular variable definitions (e.g. `var a = b; var b = a;`).
        if (seen.has(node)) return false;
        seen.add(node);
        return visit(resolve(context, node));
      }
    }

    return false;
  }

  return visit(node);
}
