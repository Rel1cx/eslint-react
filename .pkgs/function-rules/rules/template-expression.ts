import type { Rule } from "eslint";

export interface templateExpressionOptions {
  allowMultiline: boolean;
}

export function templateExpression(options?: templateExpressionOptions) {
  const allowMultiline = options?.allowMultiline ?? false;
  return (context: Rule.RuleContext): Rule.RuleListener => ({
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
