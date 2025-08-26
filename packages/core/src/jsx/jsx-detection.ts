/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { DEFAULT_JSX_DETECTION_HINT, JSXDetectionHint } from "./jsx-detection-hint";

/**
 * Checks if a node is a `JSXText` or a `Literal` node
 * @param node The AST node to check
 * @returns `true` if the node is a `JSXText` or a `Literal` node
 */
export function isJsxText(node: TSESTree.Node | null | unit): node is TSESTree.JSXText | TSESTree.Literal {
  if (node == null) return false;
  return node.type === T.JSXText || node.type === T.Literal;
}

/**
 * Determines if a node represents JSX-like content based on heuristics
 * Supports configuration through hint flags to customize detection behavior
 *
 * @param code The source code with scope lookup capability
 * @param code.getScope The function to get the scope of a node
 * @param node The AST node to analyze
 * @param hint The configuration flags to adjust detection behavior
 * @returns boolean Whether the node is considered JSX-like
 */
export function isJsxLike(
  code: { getScope: (node: TSESTree.Node) => Scope },
  node: TSESTree.Node | unit | null,
  hint: JSXDetectionHint = DEFAULT_JSX_DETECTION_HINT,
): boolean {
  if (node == null) return false;

  // Actual JSX nodes are always considered JSX-like
  if (AST.isJSX(node)) return true;

  switch (node.type) {
    case T.Literal: {
      // Handle different literal types according to hint flags
      switch (typeof node.value) {
        case "boolean":
          return !(hint & JSXDetectionHint.SkipBooleanLiteral);
        case "string":
          return !(hint & JSXDetectionHint.SkipStringLiteral);
        case "number":
          return !(hint & JSXDetectionHint.SkipNumberLiteral);
        case "bigint":
          return !(hint & JSXDetectionHint.SkipBigIntLiteral);
      }
      if (node.value == null) {
        return !(hint & JSXDetectionHint.SkipNullLiteral);
      }
      return false;
    }
    case T.TemplateLiteral: {
      // Template literals are treated like string literals
      return !(hint & JSXDetectionHint.SkipStringLiteral);
    }
    case T.ArrayExpression: {
      // Empty arrays can be filtered with SkipEmptyArray
      if (node.elements.length === 0) {
        return !(hint & JSXDetectionHint.SkipEmptyArray);
      }
      // StrictArray requires all elements to be JSX
      if (hint & JSXDetectionHint.StrictArray) {
        return node.elements.every((n) => isJsxLike(code, n, hint));
      }
      // Default: array is JSX-like if any element is JSX-like
      return node.elements.some((n) => isJsxLike(code, n, hint));
    }
    case T.LogicalExpression: {
      // StrictLogical requires both sides to be JSX
      if (hint & JSXDetectionHint.StrictLogical) {
        return isJsxLike(code, node.left, hint) && isJsxLike(code, node.right, hint);
      }
      // Default: logical expression is JSX-like if either side is JSX-like
      return isJsxLike(code, node.left, hint) || isJsxLike(code, node.right, hint);
    }
    case T.ConditionalExpression: {
      // Helper function to check if the consequent (then) branch has JSX
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (node.consequent.length === 0) {
            return !(hint & JSXDetectionHint.SkipEmptyArray);
          }
          if (hint & JSXDetectionHint.StrictArray) {
            return node.consequent.every((n: TSESTree.Expression) => isJsxLike(code, n, hint));
          }
          return node.consequent.some((n: TSESTree.Expression) => isJsxLike(code, n, hint));
        }
        return isJsxLike(code, node.consequent, hint);
      }

      // Helper function to check if the alternate (else) branch has JSX
      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJsxLike(code, node.alternate, hint);
      }

      // StrictConditional requires both branches to contain JSX
      if (hint & JSXDetectionHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }
      // Default: conditional is JSX-like if either branch has JSX
      return leftHasJSX(node) || rightHasJSX(node);
    }
    case T.SequenceExpression: {
      // For sequence expressions, only check the last expression
      const exp = node.expressions.at(-1);
      return isJsxLike(code, exp, hint);
    }
    case T.CallExpression: {
      // Skip createElement calls if configured to do so
      if (hint & JSXDetectionHint.SkipCreateElement) {
        return false;
      }
      // Check for React.createElement or createElement calls
      switch (node.callee.type) {
        case T.Identifier:
          return node.callee.name === "createElement";
        case T.MemberExpression:
          return node.callee.property.type === T.Identifier && node.callee.property.name === "createElement";
      }
      return false;
    }
    case T.Identifier: {
      const { name } = node;
      // Handle 'undefined' identifier according to hint
      if (name === "undefined") {
        return !(hint & JSXDetectionHint.SkipUndefined);
      }
      // Check if this is a JSX tag name
      if (AST.isJSXTagNameExpression(node)) {
        return true;
      }
      // Resolve variables to their values and check if they're JSX-like
      const variable = VAR.findVariable(name, code.getScope(node));
      const variableNode = variable
        && VAR.getVariableInitNode(variable, 0);
      return !!variableNode
        && isJsxLike(code, variableNode, hint);
    }
  }
  return false;
}
