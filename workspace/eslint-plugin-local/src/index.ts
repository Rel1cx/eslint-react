import { name, version } from "../package.json";
import avoidMultilineTemplateExpression from "./rules/avoid-multiline-template-expression";
import noShadowingUnderscore from "./rules/no-shadowing-underscore";
import preferEqeqNullishComparison from "./rules/prefer-eqeq-nullish-comparison";

export default {
  meta: {
    name,
    version,
  },
  rules: {
    "avoid-multiline-template-expression": avoidMultilineTemplateExpression,
    "no-shadowing-underscore": noShadowingUnderscore,
    "prefer-eqeq-nullish-comparison": preferEqeqNullishComparison,
  },
} as const;
