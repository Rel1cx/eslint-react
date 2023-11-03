import {
  findVariableByNameUpToGlobal,
  getVariableInitFirst,
  isJSXTagNameExpression,
  isOneOf,
  NodeType,
} from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { isCreateElementCall } from "./element";

/* eslint-disable perfectionist/sort-objects */
export const JSXValueCheckHint = {
  None: 0n,
  IgnoreNull: 1n << 0n,
  IgnoreCreateElement: 1n << 1n,
  StrictLogical: 1n << 2n,
  StrictConditional: 1n << 3n,
} as const;
/* eslint-enable perfectionist/sort-objects */

/**
 * Check if a node is a JSX value
 * @param node The AST node to check
 * @param context The rule context
 * @param hint The `JSXValueCheckHint` to use
 * @returns boolean
 */
export function isJSXValue(
  node: TSESTree.Node | null | undefined,
  context: RuleContext,
  hint: bigint = JSXValueCheckHint.None,
): boolean {
  if (!node) {
    return false;
  }

  return match(node)
    .with({ type: NodeType.JSXElement }, F.constTrue)
    .with({ type: NodeType.JSXFragment }, F.constTrue)
    .with({ type: NodeType.Literal }, (node) => {
      if (
        !("value" in node)
        || hint & JSXValueCheckHint.IgnoreNull
      ) {
        return false;
      }

      return node.value === null;
    })
    .with({ type: NodeType.ConditionalExpression }, (node) => {
      if (!("consequent" in node)) {
        return false;
      }

      function leftHasJSX(node: TSESTree.ConditionalExpression) {
        if (!("consequent" in node)) {
          return false;
        }

        if (Array.isArray(node.consequent)) {
          return node.consequent.some((n: TSESTree.Expression) => isJSXValue(n, context, hint));
        }

        return isJSXValue(node.consequent, context, hint);
      }

      function rightHasJSX(node: TSESTree.ConditionalExpression) {
        return "alternate" in node
          && isJSXValue(node.alternate, context, hint);
      }

      if (hint & JSXValueCheckHint.StrictConditional) {
        return leftHasJSX(node) && rightHasJSX(node);
      }

      return leftHasJSX(node) || rightHasJSX(node);
    })
    .with({ type: NodeType.LogicalExpression }, (node) => {
      if (!("left" in node)) {
        return false;
      }

      return isJSXValue(node.left, context, hint) || isJSXValue(node.right, context, hint);
    })
    .with({ type: NodeType.SequenceExpression }, (node) => {
      if (!("expressions" in node)) {
        return false;
      }
      const exp = node.expressions.at(-1);

      return isJSXValue(exp, context, hint);
    })
    .with({ type: NodeType.CallExpression }, (node) => {
      if (hint & JSXValueCheckHint.IgnoreCreateElement) {
        return false;
      }

      return isCreateElementCall(node, context);
    })
    .with({ type: NodeType.Identifier }, (node) => {
      if (!("name" in node)) {
        return false;
      }
      if (isJSXTagNameExpression(node)) {
        return true;
      }
      const variable = findVariableByNameUpToGlobal(node.name, context.getScope());

      return F.pipe(
        variable,
        O.flatMap(getVariableInitFirst),
        O.filter(isOneOf([NodeType.JSXElement, NodeType.JSXFragment])),
        O.isSome,
      );
    })
    .with({ type: NodeType.JSXMemberExpression }, F.constTrue)
    .with({ type: NodeType.JSXNamespacedName }, F.constTrue)
    .otherwise(F.constFalse);
}
