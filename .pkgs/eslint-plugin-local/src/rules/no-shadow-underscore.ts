import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule, isInitializedFromSource } from "../utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

export const RULE_NAME = "no-shadow-underscore";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow shadowing of the underscore identifier",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noShadowUnderscore: "In this codebase, '_' is used to represent the undefined. Avoid shadowing it.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    "Identifier[name='_']"(node: TSESTree.Identifier & { name: "_" }) {
      const initialScope = context.sourceCode.getScope(node);
      const isFromImport = isInitializedFromSource("_", "@eslint-react/eff", initialScope);
      if (!isFromImport) {
        context.report({
          messageId: "noShadowUnderscore",
          node,
        });
      }
    },
  };
}
