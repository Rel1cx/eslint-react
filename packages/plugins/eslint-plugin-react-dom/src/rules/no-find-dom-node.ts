import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-find-dom-node";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `findDOMNode`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noFindDomNode: "[Deprecated] Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const findDOMNode = "findDOMNode";

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes(findDOMNode)) return {};
  return {
    CallExpression(node) {
      const { callee } = node;
      switch (callee.type) {
        case T.Identifier:
          if (callee.name === findDOMNode) {
            context.report({ messageId: "noFindDomNode", node });
          }
          return;
        case T.MemberExpression:
          if (callee.property.type === T.Identifier && callee.property.name === findDOMNode) {
            context.report({ messageId: "noFindDomNode", node });
          }
          return;
      }
    },
  };
}
