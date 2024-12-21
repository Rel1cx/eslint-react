import * as AST from '@eslint-react/ast';
import { ESLintUtils } from '@typescript-eslint/utils';

// package.json
var name = "@workspace/eslint-plugin-local";
var version = "0.0.0";
function getDocsUrl() {
  return "TODO: add docs for local ESLint rules";
}
var createRule = ESLintUtils.RuleCreator(getDocsUrl);

// src/rules/avoid-multiline-template-expression.ts
var RULE_NAME = "avoid-multiline-template-expression";
var RULE_FEATURES = [
  "CHK"
];
var avoid_multiline_template_expression_default = createRule({
  meta: {
    type: "problem",
    docs: {
      description: "disallow multiline template expressions",
      [Symbol.for("rule_features")]: RULE_FEATURES
    },
    messages: {
      avoidMultilineTemplateExpression: "Avoid multiline template expressions."
    },
    schema: []
  },
  name: RULE_NAME,
  create(context) {
    return {
      TemplateLiteral: (node) => {
        if (AST.isMultiLine(node)) {
          context.report({
            messageId: "avoidMultilineTemplateExpression",
            node
          });
        }
      }
    };
  },
  defaultOptions: []
});

// src/index.ts
var index_default = {
  meta: {
    name,
    version
  },
  rules: {
    "avoid-multiline-template-expression": avoid_multiline_template_expression_default
  }
};

export { index_default as default };
