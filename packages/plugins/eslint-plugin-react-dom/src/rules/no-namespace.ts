import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";
import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the absence of a `namespace` in React elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noNamespace: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node) {
      const name = ER.getElementType(context, node);
      if (typeof name !== "string" || !name.includes(":")) {
        return;
      }
      context.report({
        messageId: "noNamespace",
        node: node.openingElement.name,
        data: {
          name,
        },
      });
    },
  };
}
