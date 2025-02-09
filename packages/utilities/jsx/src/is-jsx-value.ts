/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

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

/* eslint-disable perfectionist/sort-objects */
export const JSXValueHint = {
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

export const DEFAULT_JSX_VALUE_HINT = 0n
  | JSXValueHint.SkipUndefined
  | JSXValueHint.SkipBooleanLiteral;

/**
 * Heuristic decision to determine if a node is a JSX value
 * @param node The AST node to check
 * @param jsxCtx The requirements for the check
 * @param jsxCtx.getScope The function to get the scope of a node
 * @param hint The `JSXValueHint` to use
 * @returns boolean
 */
export function isJSXValue(
  node: TSESTree.Node | _ | null,
  jsxCtx: { getScope: (node: TSESTree.Node) => Scope },
  hint: bigint = DEFAULT_JSX_VALUE_HINT,
): boolean {
  switch (node?.type) {
    case T.JSXElement:
    case T.JSXFragment:
    case T.JSXMemberExpression:
    case T.JSXNamespacedName: {
      return true;
    }
    case T.Literal: {
      switch (typeof node.value) {
        case "boolean":
          return !(hint & JSXValueHint.SkipBooleanLiteral);
        case "string":
          return !(hint & JSXValueHint.SkipStringLiteral);
        case "number":
          return !(hint & JSXValueHint.SkipNumberLiteral);
        case "bigint":
          return !(hint & JSXValueHint.SkipBigIntLiteral);
      }
      if (node.value == null) {
        return !(hint & JSXValueHint.SkipNullLiteral);
      }
      return false;
    }
    case T.TemplateLiteral: {
      return !(hint & JSXValueHint.SkipStringLiteral);
    }
    case T.ArrayExpression: {
      if (hint & JSXValueHint.StrictArray) {
        return node.elements.every((n) => isJSXValue(n, jsxCtx, hint));
      }
      return node.elements.some((n) => isJSXValue(n, jsxCtx, hint));
    }
    case T.LogicalExpression: {
      if (hint & JSXValueHint.StrictLogical) {
        return isJSXValue(node.left, jsxCtx, hint) && isJSXValue(node.right, jsxCtx, hint);
      }
      return isJSXValue(node.left, jsxCtx, hint) || isJSXValue(node.right, jsxCtx, hint);
    }
    case T.ConditionalExpression: {
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (node.consequent.length === 0) {
            return !(hint & JSXValueHint.SkipEmptyArray);
          }
          if (hint & JSXValueHint.StrictArray) {
            return node.consequent.every((n: TSESTree.Expression) => isJSXValue(n, jsxCtx, hint));
          }
          return node.consequent.some((n: TSESTree.Expression) => isJSXValue(n, jsxCtx, hint));
        }
        return isJSXValue(node.consequent, jsxCtx, hint);
      }
      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJSXValue(node.alternate, jsxCtx, hint);
      }
      if (hint & JSXValueHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }
      return leftHasJSX(node) || rightHasJSX(node);
    }
    case T.SequenceExpression: {
      const exp = node.expressions.at(-1);
      return isJSXValue(exp, jsxCtx, hint);
    }
    case T.CallExpression: {
      if (hint & JSXValueHint.SkipCreateElement) {
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
        return !(hint & JSXValueHint.SkipUndefined);
      }
      if (AST.isJSXTagNameExpression(node)) {
        return true;
      }
      const variable = VAR.findVariable(name, jsxCtx.getScope(node));
      const variableNode = variable
        && VAR.getVariableNode(variable, 0);
      return !!variableNode
        && isJSXValue(variableNode, jsxCtx, hint);
    }
  }
  return false;
}
