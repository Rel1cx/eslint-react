import { name, version } from "../package.json";
import avoidMultilineTemplateExpression from "./rules/avoid-multiline-template-expression";
import preferEqeqNullishComparison from "./rules/prefer-eqeq-nullish-comparison";

export default {
  meta: {
    name,
    version,
  },
  rules: {
    "avoid-multiline-template-expression": avoidMultilineTemplateExpression,
    "prefer-eqeq-nullish-comparison": preferEqeqNullishComparison,
  },
} as const;
