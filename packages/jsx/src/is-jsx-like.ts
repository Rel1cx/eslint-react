import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { DEFAULT_JSX_DETECTION_HINT, type JsxDetectionHint, JsxDetectionHint as Hint } from "./jsx-detection-hint";

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
 * import { isJsxLike } from "@eslint-react/jsx";
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
  if (ast.isJSX(node)) return true;

  switch (node.type) {
    case AST.Literal: {
      switch (typeof node.value) {
        case "boolean":
          return !(hint & Hint.DoNotIncludeJsxWithBooleanValue);
        case "string":
          return !(hint & Hint.DoNotIncludeJsxWithStringValue);
        case "number":
          return !(hint & Hint.DoNotIncludeJsxWithNumberValue);
        case "bigint":
          return !(hint & Hint.DoNotIncludeJsxWithBigIntValue);
      }
      if (node.value == null) {
        return !(hint & Hint.DoNotIncludeJsxWithNullValue);
      }
      return false;
    }

    case AST.TemplateLiteral: {
      return !(hint & Hint.DoNotIncludeJsxWithStringValue);
    }

    case AST.ArrayExpression: {
      if (node.elements.length === 0) {
        return !(hint & Hint.DoNotIncludeJsxWithEmptyArrayValue);
      }
      if (hint & Hint.RequireAllArrayElementsToBeJsx) {
        return node.elements.every((n) => isJsxLike(context, n, hint));
      }
      return node.elements.some((n) => isJsxLike(context, n, hint));
    }

    case AST.LogicalExpression: {
      if (hint & Hint.RequireBothSidesOfLogicalExpressionToBeJsx) {
        return isJsxLike(context, node.left, hint) && isJsxLike(context, node.right, hint);
      }
      return isJsxLike(context, node.left, hint) || isJsxLike(context, node.right, hint);
    }

    case AST.ConditionalExpression: {
      const consequentIsJsx = Array.isArray(node.consequent)
        ? checkArray(context, node.consequent as TSESTree.Expression[], hint)
        : isJsxLike(context, node.consequent, hint);

      const alternateIsJsx = isJsxLike(context, node.alternate, hint);

      if (hint & Hint.RequireBothBranchesOfConditionalExpressionToBeJsx) {
        return consequentIsJsx && alternateIsJsx;
      }
      return consequentIsJsx || alternateIsJsx;
    }

    case AST.SequenceExpression: {
      const last = node.expressions.at(-1) ?? null;
      return isJsxLike(context, last, hint);
    }

    case AST.CallExpression: {
      if (hint & Hint.DoNotIncludeJsxWithCreateElementValue) {
        return false;
      }
      switch (node.callee.type) {
        case AST.Identifier:
          return node.callee.name === "createElement";
        case AST.MemberExpression:
          return node.callee.property.type === AST.Identifier
            && node.callee.property.name === "createElement";
      }
      return false;
    }

    case AST.Identifier: {
      if (node.name === "undefined") {
        return !(hint & Hint.DoNotIncludeJsxWithUndefinedValue);
      }
      if (ast.isJSXTagNameExpression(node)) {
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
    return !(hint & Hint.DoNotIncludeJsxWithEmptyArrayValue);
  }
  if (hint & Hint.RequireAllArrayElementsToBeJsx) {
    return elements.every((n) => isJsxLike(context, n, hint));
  }
  return elements.some((n) => isJsxLike(context, n, hint));
}
