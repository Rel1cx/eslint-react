import type { Rule } from "eslint";

/**
 * Ensures that multiline template expressions are handled by auto-dedentation tags
 */
export function noMultilineTemplateExpressionsWithoutAutoDedent() {
  return (context: Rule.RuleContext): Rule.RuleListener => ({
    TemplateLiteral(node) {
      // Assuming this tag supports auto-dedentation to keep it simple
      if (node.parent.type === "TaggedTemplateExpression") return;
      if (node.loc?.start.line !== node.loc?.end.line) {
        context.report({
          node,
          message: "Avoid multiline template expressions without auto-dedentation.",
        });
      }
    },
  });
}
