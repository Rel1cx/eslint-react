import { isCloneElementCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-clone-element";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'cloneElement'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noCloneElement: "Using 'cloneElement' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isCloneElementCall(node, context)) {
          return;
        }
        context.report({
          messageId: "noCloneElement",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
