import { name, version } from "../package.json";
import avoidMultilineTemplateExpression from "./rules/avoid-multiline-template-expression";

export default {
  meta: {
    name,
    version,
  },
  rules: {
    "avoid-multiline-template-expression": avoidMultilineTemplateExpression,
  },
} as const;
