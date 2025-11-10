/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Rule } from "eslint";
import { defineRuleListener } from "eslint-plugin-function-rule";

export interface nullishComparisonOptions {
  enforce: "eqeq" | "eqeqeq";
}

// TODO: Implement different enforce options
export function nullishComparison(options?: nullishComparisonOptions) {
  return (context: Rule.RuleContext): Rule.RuleListener => ({
    BinaryExpression(node): void {
      if (node.operator === "===" || node.operator === "!==") {
        const offendingChild = [node.left, node.right].find(
          (child) =>
            (child.type === "Identifier"
              && child.name === "undefined")
            || (child.type === "Literal" && child.raw === "null"),
        );

        if (offendingChild == null) {
          return;
        }

        const operatorToken = context.sourceCode.getFirstTokenBetween(
          node.left,
          node.right,
          (token) => token.value === node.operator,
        );

        if (operatorToken == null) throw new Error("Can't get operator token");

        const wasLeft = node.left === offendingChild;

        const nullishKind = offendingChild.type === "Identifier"
          ? "undefined"
          : "null";

        const looseOperator = node.operator === "===" ? "==" : "!=";

        context.report({
          loc: wasLeft
            ? {
              end: operatorToken.loc.end,
              start: node.left.loc!.start,
            }
            : {
              end: node.right.loc!.end,
              start: operatorToken.loc.start,
            },
          message:
            `Unexpected strict comparison ('${node.operator}') with '${nullishKind}'. In this codebase, we prefer to use loose equality as a general-purpose nullish check when possible.`,
          suggest: [
            {
              desc: `Use loose comparison ('${looseOperator} null') instead, to check both nullish values.`,
              fix: (fixer) => [
                fixer.replaceText(offendingChild, "null"),
                fixer.replaceText(operatorToken, looseOperator),
              ],
            },
          ],
        });
      }
    },
  });
}
