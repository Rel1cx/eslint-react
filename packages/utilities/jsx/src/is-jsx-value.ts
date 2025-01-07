import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

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
  SkipNullLiteral: 1n << 0n,
  SkipUndefinedLiteral: 1n << 1n,
  SkipBooleanLiteral: 1n << 2n,
  SkipStringLiteral: 1n << 3n,
  SkipNumberLiteral: 1n << 4n,
  SkipCreateElement: 1n << 5n,
  SkipEmptyArray: 1n << 6n,
  StrictArray: 1n << 7n,
  StrictLogical: 1n << 8n,
  StrictConditional: 1n << 9n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const DEFAULT_JSX_VALUE_HINT = 0n
  | JSXValueHint.SkipUndefinedLiteral
  | JSXValueHint.SkipBooleanLiteral;

/**
 * Check if a node is a JSX value
 * @param node The AST node to check
 * @param jsxCtx The requirements for the check
 * @param jsxCtx.getScope The function to get the scope of a node
 * @param hint The `JSXValueHint` to use
 * @returns boolean
 */
export function isJSXValue(
  node: null | TSESTree.Node | undefined,
  jsxCtx: { getScope: (node: TSESTree.Node) => Scope },
  hint: bigint = DEFAULT_JSX_VALUE_HINT,
): boolean {
  if (!node) {
    return false;
  }
  return match<typeof node, boolean>(node)
    .with({ type: T.JSXElement }, F.constTrue)
    .with({ type: T.JSXFragment }, F.constTrue)
    .with({ type: T.JSXMemberExpression }, F.constTrue)
    .with({ type: T.JSXNamespacedName }, F.constTrue)
    .with({ type: T.Literal }, (node) => {
      return match(node.value)
        .with(null, () => !(hint & JSXValueHint.SkipNullLiteral))
        .with(P.boolean, () => !(hint & JSXValueHint.SkipBooleanLiteral))
        .with(P.string, () => !(hint & JSXValueHint.SkipStringLiteral))
        .with(P.number, () => !(hint & JSXValueHint.SkipNumberLiteral))
        .otherwise(F.constFalse);
    })
    .with({ type: T.TemplateLiteral }, () => !(hint & JSXValueHint.SkipStringLiteral))
    .with({ type: T.ArrayExpression }, (node) => {
      if (hint & JSXValueHint.StrictArray) {
        return node.elements.every((n) => isJSXValue(n, jsxCtx, hint));
      }
      return node.elements.some((n) => isJSXValue(n, jsxCtx, hint));
    })
    .with({ type: T.ConditionalExpression }, (node) => {
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
    })
    .with({ type: T.LogicalExpression }, (node) => {
      if (hint & JSXValueHint.StrictLogical) {
        return isJSXValue(node.left, jsxCtx, hint) && isJSXValue(node.right, jsxCtx, hint);
      }
      return isJSXValue(node.left, jsxCtx, hint) || isJSXValue(node.right, jsxCtx, hint);
    })
    .with({ type: T.SequenceExpression }, (node) => {
      const exp = node.expressions.at(-1);
      return isJSXValue(exp, jsxCtx, hint);
    })
    .with({ type: T.CallExpression }, (node) => {
      if (hint & JSXValueHint.SkipCreateElement) {
        return false;
      }
      return match(node.callee)
        .with({ type: T.Identifier, name: "createElement" }, F.constTrue)
        .with({ type: T.MemberExpression, property: { name: "createElement" } }, F.constTrue)
        .otherwise(F.constFalse);
    })
    .with({ type: T.Identifier }, (node) => {
      const { name } = node;
      if (name === "undefined") {
        return !(hint & JSXValueHint.SkipUndefinedLiteral);
      }
      if (AST.isJSXTagNameExpression(node)) {
        return true;
      }
      const initialScope = jsxCtx.getScope(node);
      return F.pipe(
        VAR.findVariable(name, initialScope),
        O.flatMap(VAR.getVariableNode(0)),
        O.exists(n => isJSXValue(n, jsxCtx, hint)),
      );
    })
    .otherwise(F.constFalse);
}
