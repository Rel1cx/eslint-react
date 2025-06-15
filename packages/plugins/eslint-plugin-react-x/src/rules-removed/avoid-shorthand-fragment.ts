import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { JsxConfig, type RuleContext, type RuleFeature } from "@eslint-react/kit";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-fragment";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces explicit `<Fragment>` components instead of the shorthand `<>` or `</>` syntax.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      avoidShorthandFragment: "Avoid using shorthand fragment syntax. Use '{{jsxFragmentFactory}}' component instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const jsxConfigFromContext = JsxConfig.getFromContext(context);
  const jsxConfigFromAnnotation = JsxConfig.getFromAnnotation(context);
  const jsxConfig = {
    ...jsxConfigFromContext,
    ...jsxConfigFromAnnotation,
  };

  return {
    JSXFragment(node) {
      context.report({
        messageId: "avoidShorthandFragment",
        node,
        data: {
          jsxFragmentFactory: jsxConfig.jsxFragmentFactory,
        },
      });
    },
  };
}
