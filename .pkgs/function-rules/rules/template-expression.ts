import type { Rule } from "eslint";
import { defineRuleListener } from "eslint-plugin-function-rule";

export interface templateExpressionOptions {
  allowMultiline: boolean;
}

export function templateExpression(options?: templateExpressionOptions) {
  const allowMultiline = options?.allowMultiline ?? false;
  return (context: Rule.RuleContext) =>
    defineRuleListener({
      TemplateLiteral(node) {
        if (!allowMultiline && node.loc?.start.line !== node.loc?.end.line) {
          context.report({
            node,
            message: "Avoid multiline template expressions.",
          });
        }
      },
    });
}
