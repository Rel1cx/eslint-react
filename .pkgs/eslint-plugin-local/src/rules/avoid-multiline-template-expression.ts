import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-multiline-template-expression";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow multiline template expressions",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      avoidMultilineTemplateExpression: "Avoid multiline template expressions.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    TemplateLiteral: (node) => {
      if (AST.isMultiLine(node)) {
        context.report({
          messageId: "avoidMultilineTemplateExpression",
          node,
        });
      }
    },
  };
}
