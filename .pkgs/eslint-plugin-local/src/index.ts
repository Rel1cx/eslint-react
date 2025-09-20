import { name, version } from "../package.json";

import type { CompatiblePlugin } from "@eslint-react/kit";

import avoidMultilineTemplateExpression from "./rules/avoid-multiline-template-expression";
import noShadowingUnderscore from "./rules/no-shadow-underscore";
import preferEqeqNullishComparison from "./rules/prefer-eqeq-nullish-comparison";

const plugin: CompatiblePlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "avoid-multiline-template-expression": avoidMultilineTemplateExpression,
    "no-shadow-underscore": noShadowingUnderscore,
    "prefer-eqeq-nullish-comparison": preferEqeqNullishComparison,
  },
};

export default plugin;
