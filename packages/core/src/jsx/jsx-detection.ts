import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

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
 * Default JSX detection configuration
 * Skips undefined and boolean literals (common in React)
 */
export const DEFAULT_JSX_DETECTION_HINT = 0n
  | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
  | JsxDetectionHint.DoNotIncludeJsxWithBigIntValue
  | JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
  | JsxDetectionHint.DoNotIncludeJsxWithStringValue
  | JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue;

/**
 * Check if a node is a `JSXText` or a `Literal` node
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXText` or a `Literal` node
 */
export function isJsxText(node: TSESTree.Node | null): node is TSESTree.JSXText | TSESTree.Literal {
  if (node == null) return false;
  return node.type === AST.JSXText || node.type === AST.Literal;
}

/**
 * Determine if a node represents JSX-like content based on heuristics
 * Supports configuration through hint flags to customize detection behavior
 *
 * @param context The rule context with scope lookup capability
 * @param node The AST node to analyze
 * @param hint The configuration flags to adjust detection behavior
 * @returns boolean Whether the node is considered JSX-like
 */
export function isJsxLike(
  context: RuleContext,
  node: TSESTree.Node | null,
  hint: JsxDetectionHint = DEFAULT_JSX_DETECTION_HINT,
): boolean {
  if (node == null) return false;

  // Actual JSX nodes are always considered JSX-like
  if (ast.isJSX(node)) return true;

  switch (node.type) {
    case AST.Literal: {
      // Handle different literal types according to hint flags
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
      // Template literals are treated like string literals
      return !(hint & JsxDetectionHint.DoNotIncludeJsxWithStringValue);
    }
    case AST.ArrayExpression: {
      // Empty arrays can be filtered with SkipEmptyArray
      if (node.elements.length === 0) {
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue);
      }
      // Requires all elements to be JSX
      if (hint & JsxDetectionHint.RequireAllArrayElementsToBeJsx) {
        return node.elements.every((n) => isJsxLike(context, n, hint));
      }
      // Default: array is JSX-like if any element is JSX-like
      return node.elements.some((n) => isJsxLike(context, n, hint));
    }
    case AST.LogicalExpression: {
      // Requires both sides to be JSX
      if (hint & JsxDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx) {
        return isJsxLike(context, node.left, hint) && isJsxLike(context, node.right, hint);
      }
      // Default: logical expression is JSX-like if either side is JSX-like
      return isJsxLike(context, node.left, hint) || isJsxLike(context, node.right, hint);
    }
    case AST.ConditionalExpression: {
      // Helper function to check if the consequent (then) branch has JSX
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (node.consequent.length === 0) {
            return !(hint & JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue);
          }
          if (hint & JsxDetectionHint.RequireAllArrayElementsToBeJsx) {
            return node.consequent.every((n: TSESTree.Expression) => isJsxLike(context, n, hint));
          }
          return node.consequent.some((n: TSESTree.Expression) => isJsxLike(context, n, hint));
        }
        return isJsxLike(context, node.consequent, hint);
      }

      // Helper function to check if the alternate (else) branch has JSX
      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJsxLike(context, node.alternate, hint);
      }

      // Requires both branches to contain JSX
      if (hint & JsxDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx) {
        return leftHasJSX(node) && rightHasJSX(node);
      }
      // Default: conditional is JSX-like if either branch has JSX
      return leftHasJSX(node) || rightHasJSX(node);
    }
    case AST.SequenceExpression: {
      // For sequence expressions, only check the last expression
      const exp = node.expressions.at(-1) ?? null;
      return isJsxLike(context, exp, hint);
    }
    case AST.CallExpression: {
      // Skip createElement calls if configured to do so
      if (hint & JsxDetectionHint.DoNotIncludeJsxWithCreateElementValue) {
        return false;
      }
      // Check for React.createElement or createElement calls
      switch (node.callee.type) {
        case AST.Identifier:
          return node.callee.name === "createElement";
        case AST.MemberExpression:
          return node.callee.property.type === AST.Identifier && node.callee.property.name === "createElement";
      }
      return false;
    }
    case AST.Identifier: {
      // Handle 'undefined' identifier according to hint
      if (node.name === "undefined") {
        return !(hint & JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue);
      }
      // Check if this is a JSX tag name
      if (ast.isJSXTagNameExpression(node)) {
        return true;
      }
      // Resolve variables to their values and check if they're JSX-like
      return isJsxLike(context, resolve(context, node), hint);
    }
  }
  return false;
}
