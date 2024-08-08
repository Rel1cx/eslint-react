import { isJSXTagNameExpression } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableNode } from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
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
 * @param context The rule context
 * @param hint The `JSXValueHint` to use
 * @returns boolean
 */
export function isJSXValue(
  node: TSESTree.Node | null | undefined,
  context: RuleContext,
  hint: bigint = DEFAULT_JSX_VALUE_HINT,
): boolean {
  if (!node) return false;
  return match<typeof node, boolean>(node)
    .with({ type: AST_NODE_TYPES.JSXElement }, F.constTrue)
    .with({ type: AST_NODE_TYPES.JSXFragment }, F.constTrue)
    .with({ type: AST_NODE_TYPES.JSXMemberExpression }, F.constTrue)
    .with({ type: AST_NODE_TYPES.JSXNamespacedName }, F.constTrue)
    .with({ type: AST_NODE_TYPES.Literal }, (node) => {
      return match(node.value)
        .with(null, () => !(hint & JSXValueHint.SkipNullLiteral))
        .with(P.boolean, () => !(hint & JSXValueHint.SkipBooleanLiteral))
        .with(P.string, () => !(hint & JSXValueHint.SkipStringLiteral))
        .with(P.number, () => !(hint & JSXValueHint.SkipNumberLiteral))
        .otherwise(F.constFalse);
    })
    .with({ type: AST_NODE_TYPES.TemplateLiteral }, () => !(hint & JSXValueHint.SkipStringLiteral))
    .with({ type: AST_NODE_TYPES.ArrayExpression }, (node) => {
      if (hint & JSXValueHint.StrictArray) return node.elements.every((n) => isJSXValue(n, context, hint));
      return node.elements.some((n) => isJSXValue(n, context, hint));
    })
    .with({ type: AST_NODE_TYPES.ConditionalExpression }, (node) => {
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
          if (node.consequent.length === 0) return !(hint & JSXValueHint.SkipEmptyArray);
          if (hint & JSXValueHint.StrictArray) {
            return node.consequent.every((n: TSESTree.Expression) => isJSXValue(n, context, hint));
          }
          return node.consequent.some((n: TSESTree.Expression) => isJSXValue(n, context, hint));
        }
        return isJSXValue(node.consequent, context, hint);
      }
      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return isJSXValue(node.alternate, context, hint);
      }
      if (hint & JSXValueHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }
      return leftHasJSX(node) || rightHasJSX(node);
    })
    .with({ type: AST_NODE_TYPES.LogicalExpression }, (node) => {
      if (hint & JSXValueHint.StrictLogical) {
        return isJSXValue(node.left, context, hint) && isJSXValue(node.right, context, hint);
      }
      return isJSXValue(node.left, context, hint) || isJSXValue(node.right, context, hint);
    })
    .with({ type: AST_NODE_TYPES.SequenceExpression }, (node) => {
      const exp = node.expressions.at(-1);
      return isJSXValue(exp, context, hint);
    })
    .with({ type: AST_NODE_TYPES.CallExpression }, (node) => {
      if (hint & JSXValueHint.SkipCreateElement) return false;
      return match(node.callee)
        .with({ type: AST_NODE_TYPES.Identifier, name: "createElement" }, F.constTrue)
        .with({ type: AST_NODE_TYPES.MemberExpression, property: { name: "createElement" } }, F.constTrue)
        .otherwise(F.constFalse);
    })
    .with({ type: AST_NODE_TYPES.Identifier }, (node) => {
      const { name } = node;
      if (name === "undefined") return !(hint & JSXValueHint.SkipUndefinedLiteral);
      if (isJSXTagNameExpression(node)) return true;
      const initialScope = context.sourceCode.getScope(node);
      return F.pipe(
        findVariable(name, initialScope),
        O.flatMap(getVariableNode(0)),
        O.exists(n => isJSXValue(n, context, hint)),
      );
    })
    .otherwise(F.constFalse);
}
