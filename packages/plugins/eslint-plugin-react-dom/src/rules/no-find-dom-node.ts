import { NodeType } from "@eslint-react/ast";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F } from "effect";
import type { ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-find-dom-node";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'findDOMNode'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_FIND_DOM_NODE:
        "The 'findDOMNode' will be removed in a future version of React. Use the the alternatives instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node;
        const isFindDOMNode = match(callee)
          .with({ type: NodeType.Identifier }, ({ name }) => name === "findDOMNode")
          .with(
            { type: NodeType.MemberExpression },
            ({ property }) => "name" in property && property.name === "findDOMNode",
          )
          .otherwise(F.constFalse);
        if (!isFindDOMNode) return;
        context.report({
          messageId: "NO_FIND_DOM_NODE",
          node,
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
