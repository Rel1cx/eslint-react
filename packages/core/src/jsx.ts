import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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

/**
 * Determine whether a node represents JSX-like content based on heuristics.
 *
 * The detection behaviour is configurable through {@link JsxDetectionHint}
 * bit-flags so that callers can opt individual value kinds in or out.
 *
 * @param context - The ESLint rule context (needed for variable resolution).
 * @param node    - The AST node to analyse.
 * @param hint    - Optional bit-flags to adjust detection behaviour.
 *                  Defaults to {@link DEFAULT_JSX_DETECTION_HINT}.
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
      if (node.value == null) {
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithNullValue);
      }
      return false;
    }

    case AST.TemplateLiteral: {
      return !(hint & JsxDetectionHint.DoNotIncludeJsxWithStringValue);
    }

    case AST.ArrayExpression: {
      if (node.elements.length === 0) {
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue);
      }
      if (hint & JsxDetectionHint.RequireAllArrayElementsToBeJsx) {
        return node.elements.every((n) => isJsxLike(context, n, hint));
      }
      return node.elements.some((n) => isJsxLike(context, n, hint));
    }

    case AST.LogicalExpression: {
      if (hint & JsxDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx) {
        return isJsxLike(context, node.left, hint) && isJsxLike(context, node.right, hint);
      }
      return isJsxLike(context, node.left, hint) || isJsxLike(context, node.right, hint);
    }

    case AST.ConditionalExpression: {
      const consequentIsJsx = Array.isArray(node.consequent)
        ? checkArray(context, node.consequent as TSESTree.Expression[], hint)
        : isJsxLike(context, node.consequent, hint);

      const alternateIsJsx = isJsxLike(context, node.alternate, hint);

      if (hint & JsxDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx) {
        return consequentIsJsx && alternateIsJsx;
      }
      return consequentIsJsx || alternateIsJsx;
    }

    case AST.SequenceExpression: {
      const last = node.expressions.at(-1) ?? null;
      return isJsxLike(context, last, hint);
    }

    case AST.CallExpression: {
      if (hint & JsxDetectionHint.DoNotIncludeJsxWithCreateElementValue) {
        return false;
      }
      const callee = Extract.unwrap(node.callee);
      switch (callee.type) {
        case AST.Identifier:
          return callee.name === "createElement";
        case AST.MemberExpression:
          return callee.property.type === AST.Identifier
            && callee.property.name === "createElement";
      }
      return false;
    }

    case AST.Identifier: {
      if (node.name === "undefined") {
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue);
      }
      if (Check.isJSXTagNameExpression(node)) {
        return true;
      }
      return isJsxLike(context, resolve(context, node), hint);
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function checkArray(
  context: RuleContext,
  elements: TSESTree.Expression[],
  hint: JsxDetectionHint,
): boolean {
  if (elements.length === 0) {
    return !(hint & JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue);
  }
  if (hint & JsxDetectionHint.RequireAllArrayElementsToBeJsx) {
    return elements.every((n) => isJsxLike(context, n, hint));
  }
  return elements.some((n) => isJsxLike(context, n, hint));
}
