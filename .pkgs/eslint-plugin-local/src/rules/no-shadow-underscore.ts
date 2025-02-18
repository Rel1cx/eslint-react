import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-shadow-underscore";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow shadowing of the underscore identifier",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noShadowUnderscore: "In this codebase, '_' is used to represent the undefined. Avoid shadowing it.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      "Identifier[name='_']"(node: TSESTree.Identifier & { name: "_" }) {
        const initialScope = context.sourceCode.getScope(node);
        const isFromImport = VAR.isInitializedFromSource("_", "@eslint-react/eff", initialScope);
        if (!isFromImport) {
          context.report({
            messageId: "noShadowUnderscore",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
