import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import type { RuleContext, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-boolean";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using shorthand boolean attributes",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      avoidShorthandBoolean:
        "Avoid using shorthand boolean attribute '{{propName}}'. Use '{{propName}}={true}' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      // eslint-disable-next-line local/prefer-eqeq-nullish-comparison
      if (node.value === null) {
        context.report({
          messageId: "avoidShorthandBoolean",
          node,
          data: {
            propName: JSX.getAttributeName(node),
          },
          fix: (fixer) => fixer.insertTextAfter(node.name, `={true}`),
        });
      }
    },
  };
}
