/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import * as AST from "@eslint-react/ast";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { DEFAULT_JSX_DETECTION_HINT, JSXDetectionHint } from "./jsx-detection-hint";

/**
 * Heuristic decision to determine if a node is a JSX-like node.
 * @param node The AST node to check
 * @param jsxCtx The requirements for the check
 * @param jsxCtx.getScope The function to get the scope of a node
 * @param hint The `JSXDetectionHint` to use
 * @returns boolean
 */
export function isJSXLike(
  node: TSESTree.Node | _ | null,
  jsxCtx: { getScope: (node: TSESTree.Node) => Scope },
  hint: JSXDetectionHint = DEFAULT_JSX_DETECTION_HINT,
): boolean {
  switch (node?.type) {
    case T.JSXText:
    case T.JSXElement:
    case T.JSXFragment:
    case T.JSXAttribute:
    case T.JSXClosingElement:
    case T.JSXClosingFragment:
    case T.JSXEmptyExpression:
    case T.JSXExpressionContainer:
    case T.JSXIdentifier:
    case T.JSXMemberExpression:
    case T.JSXOpeningElement:
    case T.JSXOpeningFragment:
    case T.JSXSpreadAttribute:
    case T.JSXSpreadChild:
    case T.JSXNamespacedName: {
      return true;
    }
    case T.Literal: {
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
      return !(hint & JSXDetectionHint.SkipStringLiteral);
    }
    case T.ArrayExpression: {
      if (hint & JSXDetectionHint.StrictArray) {
        return node.elements.every((n) => isJSXLike(n, jsxCtx, hint));
      }
      return node.elements.some((n) => isJSXLike(n, jsxCtx, hint));
    }
    case T.LogicalExpression: {
      if (hint & JSXDetectionHint.StrictLogical) {
        return isJSXLike(node.left, jsxCtx, hint) && isJSXLike(node.right, jsxCtx, hint);
      }
      return isJSXLike(node.left, jsxCtx, hint) || isJSXLike(node.right, jsxCtx, hint);
    }
    case T.ConditionalExpression: {
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (node.consequent.length === 0) {
            return !(hint & JSXDetectionHint.SkipEmptyArray);
          }
          if (hint & JSXDetectionHint.StrictArray) {
            return node.consequent.every((n: TSESTree.Expression) => isJSXLike(n, jsxCtx, hint));
          }
          return node.consequent.some((n: TSESTree.Expression) => isJSXLike(n, jsxCtx, hint));
        }
        return isJSXLike(node.consequent, jsxCtx, hint);
      }
      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJSXLike(node.alternate, jsxCtx, hint);
      }
      if (hint & JSXDetectionHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }
      return leftHasJSX(node) || rightHasJSX(node);
    }
    case T.SequenceExpression: {
      const exp = node.expressions.at(-1);
      return isJSXLike(exp, jsxCtx, hint);
    }
    case T.CallExpression: {
      if (hint & JSXDetectionHint.SkipCreateElement) {
        return false;
      }
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
      if (name === "undefined") {
        return !(hint & JSXDetectionHint.SkipUndefined);
      }
      if (AST.isJSXTagNameExpression(node)) {
        return true;
      }
      const variable = VAR.findVariable(name, jsxCtx.getScope(node));
      const variableNode = variable
        && VAR.getVariableInitNode(variable, 0);
      return !!variableNode
        && isJSXLike(variableNode, jsxCtx, hint);
    }
  }
  return false;
}
