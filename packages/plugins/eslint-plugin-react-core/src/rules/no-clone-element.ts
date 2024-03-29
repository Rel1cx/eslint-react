import { isCloneElementCall } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-clone-element";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'cloneElement'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CLONE_ELEMENT: "Using 'cloneElement' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (!isCloneElementCall(node, context)) return;
        context.report({
          messageId: "NO_CLONE_ELEMENT",
          node,
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
