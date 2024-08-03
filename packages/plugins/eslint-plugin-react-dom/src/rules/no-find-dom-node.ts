import { NodeType } from "@eslint-react/ast";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-find-dom-node";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'findDOMNode'",
    },
    messages: {
      noFindDomNode: "[Deprecated] Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node;
        switch (callee.type) {
          case NodeType.Identifier:
            if (callee.name === "findDOMNode") {
              context.report({ messageId: "noFindDomNode", node });
            }
            return;
          case NodeType.MemberExpression:
            if (callee.property.type === NodeType.Identifier && callee.property.name === "findDOMNode") {
              context.report({ messageId: "noFindDomNode", node });
            }
            return;
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
