import type { RuleFeature } from "@eslint-react/kit";
import type { RuleContext, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-boolean";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: true,
    docs: {
      description: "Enforces explicit boolean values for boolean attributes.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      avoidShorthandBoolean:
        "Avoid using shorthand boolean attribute '{{propName}}'. Use '{{propName}}={true}' instead.",
    },
    replacedBy: [
      "react-x/jsx-shorthand-boolean",
    ],
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.value == null) {
        context.report({
          messageId: "avoidShorthandBoolean",
          node,
          data: {
            propName: ER.getAttributeName(context, node),
          },
          fix: (fixer) => fixer.insertTextAfter(node.name, `={true}`),
        });
      }
    },
  };
}
