import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-find-dom-node";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'findDOMNode'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
