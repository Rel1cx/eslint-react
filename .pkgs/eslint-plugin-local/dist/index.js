import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { NullThrowsReasons, nullThrows } from "@typescript-eslint/utils/eslint-utils";

//#region package.json
var name = "@local/eslint-plugin-local";
var version = "0.0.0";

//#endregion
//#region src/utils/create-rule.ts
function getDocsUrl() {
	return "TODO: add docs for local ESLint rules";
}
const createRule = ESLintUtils.RuleCreator(getDocsUrl);

//#endregion
//#region src/rules/avoid-multiline-template-expression.ts
const RULE_NAME$1 = "avoid-multiline-template-expression";
const RULE_FEATURES = [];
var avoid_multiline_template_expression_default = createRule({
	meta: {
		type: "problem",
		docs: {
			description: "disallow multiline template expressions",
			[Symbol.for("rule_features")]: RULE_FEATURES
		},
		messages: { avoidMultilineTemplateExpression: "Avoid multiline template expressions." },
		schema: []
	},
	name: RULE_NAME$1,
	create: create$1,
	defaultOptions: []
});
function create$1(context) {
	return { TemplateLiteral: (node) => {
		if (AST.isMultiLine(node)) context.report({
			messageId: "avoidMultilineTemplateExpression",
			node
		});
	} };
}

//#endregion
//#region src/rules/prefer-eqeq-nullish-comparison.ts
const RULE_NAME = "prefer-eqeq-nullish-comparison";
var prefer_eqeq_nullish_comparison_default = createRule({
	meta: {
		type: "suggestion",
		docs: { description: "Enforces eqeqeq preferences around nullish comparisons." },
		fixable: "code",
		hasSuggestions: true,
		messages: {
			unexpectedComparison: "Unexpected strict comparison (`{{strictOperator}}`) with `{{nullishKind}}`. In this codebase, we prefer to use loose equality as a general-purpose nullish check when possible.",
			useLooseComparisonSuggestion: "Use loose comparison (`{{looseOperator}} null`) instead, to check both nullish values."
		},
		schema: []
	},
	name: RULE_NAME,
	create,
	defaultOptions: []
});
function create(context) {
	return { BinaryExpression(node) {
		if (node.operator === "===" || node.operator === "!==") {
			const offendingChild = [node.left, node.right].find((child) => child.type === AST_NODE_TYPES.Identifier && child.name === "undefined" || child.type === AST_NODE_TYPES.Literal && child.raw === "null");
			if (offendingChild == null) return;
			const operatorToken = nullThrows(context.sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator), NullThrowsReasons.MissingToken(node.operator, "binary expression"));
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
				suggest: [{
					messageId: "useLooseComparisonSuggestion",
					data: { looseOperator },
					fix: (fixer) => [fixer.replaceText(offendingChild, "null"), fixer.replaceText(operatorToken, looseOperator)]
				}]
			});
		}
	} };
}

//#endregion
//#region src/index.ts
const plugin = {
	meta: {
		name,
		version
	},
	rules: {
		"avoid-multiline-template-expression": avoid_multiline_template_expression_default,
		"prefer-eqeq-nullish-comparison": prefer_eqeq_nullish_comparison_default
	}
};
var src_default = plugin;

//#endregion
export { src_default as default };