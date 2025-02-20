import * as AST from '@eslint-react/ast';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import * as VAR from '@eslint-react/var';
import { nullThrows, NullThrowsReasons } from '@typescript-eslint/utils/eslint-utils';

// package.json
var name = "@local/eslint-plugin-local";
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
var RULE_NAME2 = "no-shadow-underscore";
var RULE_FEATURES2 = [
  "CHK"
];
var no_shadow_underscore_default = createRule({
  meta: {
    type: "problem",
    docs: {
      description: "disallow shadowing of the underscore identifier",
      [Symbol.for("rule_features")]: RULE_FEATURES2
    },
    messages: {
      noShadowUnderscore: "In this codebase, '_' is used to represent the undefined. Avoid shadowing it."
    },
    schema: []
  },
  name: RULE_NAME2,
  create(context) {
    return {
      "Identifier[name='_']"(node) {
        const initialScope = context.sourceCode.getScope(node);
        const isFromImport = VAR.isInitializedFromSource("_", "@eslint-react/eff", initialScope);
        if (!isFromImport) {
          context.report({
            messageId: "noShadowUnderscore",
            node
          });
        }
      }
    };
  },
  defaultOptions: []
});
var RULE_NAME3 = "prefer-eqeq-nullish-comparison";
var prefer_eqeq_nullish_comparison_default = createRule({
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce eqeqeq preferences around nullish comparisons"
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      unexpectedComparison: "Unexpected strict comparison (`{{strictOperator}}`) with `{{nullishKind}}`. In this codebase, we prefer to use loose equality as a general-purpose nullish check when possible.",
      useLooseComparisonSuggestion: "Use loose comparison (`{{looseOperator}} null`) instead, to check both nullish values."
    },
    schema: []
  },
  name: RULE_NAME3,
  create(context) {
    return {
      BinaryExpression(node) {
        if (node.operator === "===" || node.operator === "!==") {
          const offendingChild = [node.left, node.right].find(
            (child) => child.type === AST_NODE_TYPES.Identifier && child.name === "undefined" || child.type === AST_NODE_TYPES.Literal && child.raw === "null"
          );
          if (offendingChild == null) {
            return;
          }
          const operatorToken = nullThrows(
            context.sourceCode.getFirstTokenBetween(
              node.left,
              node.right,
              (token) => token.value === node.operator
            ),
            NullThrowsReasons.MissingToken(node.operator, "binary expression")
          );
          const wasLeft = node.left === offendingChild;
          const nullishKind = offendingChild.type === AST_NODE_TYPES.Identifier ? "undefined" : "null";
          const looseOperator = node.operator === "===" ? "==" : "!=";
          context.report({
            messageId: "unexpectedComparison",
            data: {
              nullishKind,
              strictOperator: node.operator
            },
            loc: wasLeft ? {
              end: operatorToken.loc.end,
              start: node.left.loc.start
            } : {
              end: node.right.loc.end,
              start: operatorToken.loc.start
            },
            suggest: [
              {
                messageId: "useLooseComparisonSuggestion",
                data: {
                  looseOperator
                },
                fix: (fixer) => [
                  fixer.replaceText(offendingChild, "null"),
                  fixer.replaceText(operatorToken, looseOperator)
                ]
              }
            ]
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
    "avoid-multiline-template-expression": avoid_multiline_template_expression_default,
    "no-shadow-underscore": no_shadow_underscore_default,
    "prefer-eqeq-nullish-comparison": prefer_eqeq_nullish_comparison_default
  }
};

export { index_default as default };
