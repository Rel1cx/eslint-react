import * as AST from "@eslint-react/ast";
import { isClassComponent, isCreateRefCall } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `createRef` in function components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noCreateRef: "[Deprecated] Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      if (isCreateRefCall(context, node) && AST.findParentNode(node, isClassComponent) == null) {
        context.report({ messageId: "noCreateRef", node });
      }
    },
  };
}
