import { isJSXTagNameExpression, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableInit } from "@eslint-react/var";
import { type TSESTree } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import { match, P } from "ts-pattern";

import { isCreateElementCall } from "../element";

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
  StrictArray: 1n << 6n,
  StrictLogical: 1n << 7n,
  StrictConditional: 1n << 8n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const DEFAULT_JSX_VALUE_HINT = JSXValueHint.SkipUndefinedLiteral
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
    .with({ type: NodeType.JSXElement }, F.constTrue)
    .with({ type: NodeType.JSXFragment }, F.constTrue)
    .with({ type: NodeType.JSXMemberExpression }, F.constTrue)
    .with({ type: NodeType.JSXNamespacedName }, F.constTrue)
    .with({ type: NodeType.Literal }, (node) => {
      return match(node.value)
        .with(null, () => !(hint & JSXValueHint.SkipNullLiteral))
        .with(P.boolean, () => !(hint & JSXValueHint.SkipBooleanLiteral))
        .with(P.string, () => !(hint & JSXValueHint.SkipStringLiteral))
        .with(P.number, () => !(hint & JSXValueHint.SkipNumberLiteral))
        .otherwise(F.constFalse);
    })
    .with({ type: NodeType.TemplateLiteral }, () => !(hint & JSXValueHint.SkipStringLiteral))
    .with({ type: NodeType.ArrayExpression }, (node) => {
      if (hint & JSXValueHint.StrictArray) return node.elements.every((n) => isJSXValue(n, context, hint));

      return node.elements.some((n) => isJSXValue(n, context, hint));
    })
    .with({ type: NodeType.ConditionalExpression }, (node) => {
      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (Array.isArray(node.consequent)) {
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
    .with({ type: NodeType.LogicalExpression }, (node) => {
      return isJSXValue(node.left, context, hint) || isJSXValue(node.right, context, hint);
    })
    .with({ type: NodeType.SequenceExpression }, (node) => {
      const exp = node.expressions.at(-1);

      return isJSXValue(exp, context, hint);
    })
    .with({ type: NodeType.CallExpression }, (node) => {
      if (hint & JSXValueHint.SkipCreateElement) return false;

      return isCreateElementCall(node, context);
    })
    .with({ type: NodeType.Identifier }, (node) => {
      const { name } = node;
      if (name === "undefined") return !(hint & JSXValueHint.SkipUndefinedLiteral);
      if (isJSXTagNameExpression(node)) return true;
      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
      const maybeVariable = findVariable(name, initialScope);

      return F.pipe(
        maybeVariable,
        O.flatMap(getVariableInit(0)),
        O.exists(n => isJSXValue(n, context, hint)),
      );
    })
    .otherwise(F.constFalse);
}
