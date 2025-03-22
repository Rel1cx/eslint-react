// Ported from: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin-internal/src/rules/eqeq-nullish.ts

import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import { nullThrows, NullThrowsReasons, type RuleListener } from "@typescript-eslint/utils/eslint-utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-eqeq-nullish-comparison";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "unexpectedComparison"
  | "useLooseComparisonSuggestion";

export default createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces eqeqeq preferences around nullish comparisons.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      unexpectedComparison:
        "Unexpected strict comparison (`{{strictOperator}}`) with `{{nullishKind}}`. In this codebase, we prefer to use loose equality as a general-purpose nullish check when possible.",
      useLooseComparisonSuggestion:
        "Use loose comparison (`{{looseOperator}} null`) instead, to check both nullish values.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    BinaryExpression(node): void {
      if (node.operator === "===" || node.operator === "!==") {
        const offendingChild = [node.left, node.right].find(
          (child) =>
            (child.type === T.Identifier
              && child.name === "undefined")
            || (child.type === T.Literal && child.raw === "null"),
        );

        if (offendingChild == null) {
          return;
        }

        const operatorToken = nullThrows(
          context.sourceCode.getFirstTokenBetween(
            node.left,
            node.right,
            (token) => token.value === node.operator,
          ),
          NullThrowsReasons.MissingToken(node.operator, "binary expression"),
        );

        const wasLeft = node.left === offendingChild;

        const nullishKind = offendingChild.type === T.Identifier
          ? "undefined"
          : "null";

        const looseOperator = node.operator === "===" ? "==" : "!=";

        context.report({
          messageId: "unexpectedComparison",

          data: {
            nullishKind,
            strictOperator: node.operator,
          },
          loc: wasLeft
            ? {
              end: operatorToken.loc.end,
              start: node.left.loc.start,
            }
            : {
              end: node.right.loc.end,
              start: operatorToken.loc.start,
            },
          suggest: [
            {
              messageId: "useLooseComparisonSuggestion",
              data: {
                looseOperator,
              },
              fix: (fixer) => [
                fixer.replaceText(offendingChild, "null"),
                fixer.replaceText(operatorToken, looseOperator),
              ],
            },
          ],
        });
      }
    },
  };
}
