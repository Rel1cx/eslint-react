import { AST_NODE_TYPES } from "@typescript-eslint/types";
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
          case AST_NODE_TYPES.Identifier:
            if (callee.name === "findDOMNode") {
              context.report({ messageId: "noFindDomNode", node });
            }
            return;
          case AST_NODE_TYPES.MemberExpression:
            if (callee.property.type === AST_NODE_TYPES.Identifier && callee.property.name === "findDOMNode") {
              context.report({ messageId: "noFindDomNode", node });
            }
            return;
        }
      },
    };
  },
  defaultOptions: [],
});
