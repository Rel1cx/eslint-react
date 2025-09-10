import "@typescript-eslint/utils/eslint-utils";
import * as _typescript_eslint_utils_ts_eslint0 from "@typescript-eslint/utils/ts-eslint";

//#region src/rules/prefer-eqeq-nullish-comparison.d.ts
type MessageID = "unexpectedComparison" | "useLooseComparisonSuggestion";
//#endregion
//#region src/index.d.ts
declare const _default: {
  readonly meta: {
    readonly name: string;
    readonly version: string;
  };
  readonly rules: {
    readonly "avoid-multiline-template-expression": _typescript_eslint_utils_ts_eslint0.RuleModule<"avoidMultilineTemplateExpression", [], unknown, _typescript_eslint_utils_ts_eslint0.RuleListener>;
    readonly "no-shadow-underscore": _typescript_eslint_utils_ts_eslint0.RuleModule<"noShadowUnderscore", [], unknown, _typescript_eslint_utils_ts_eslint0.RuleListener>;
    readonly "prefer-eqeq-nullish-comparison": _typescript_eslint_utils_ts_eslint0.RuleModule<MessageID, [], unknown, _typescript_eslint_utils_ts_eslint0.RuleListener>;
  };
};
//#endregion
export { _default as default };