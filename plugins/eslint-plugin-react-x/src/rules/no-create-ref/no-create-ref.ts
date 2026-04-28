import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { createRule } from "../../utils/create-rule";

export const RULE_NAME = "no-create-ref";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows 'createRef' in function components.",
    },
    messages: {
      default: "[Deprecated] Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return merge(
    {
      CallExpression(node) {
        if (core.isCreateRefCall(context, node) && Traverse.findParent(node, core.isClassComponent) == null) {
          context.report({ messageId: "default", node });
        }
      },
    },
  );
}
