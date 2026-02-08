/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Rule } from "eslint";

/**
 * Ensures that nullish equality is used instead of strict equality when possible
 */
export function preferLooseNullishEquality() {
  return (context: Rule.RuleContext): Rule.RuleListener => ({
    BinaryExpression(node): void {
      if (node.operator === "===" || node.operator === "!==") {
        const offendingChild = [
          node.left,
          node.right,
        ].find((n) =>
          (n.type === "Identifier"
            && n.name === "undefined")
          || (n.type === "Literal" && n.raw === "null")
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
