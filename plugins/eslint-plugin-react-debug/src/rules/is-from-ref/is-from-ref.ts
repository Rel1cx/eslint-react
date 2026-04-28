import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils/create-rule";
import { stringify } from "../../utils/stringify";
import { getRefInitNode } from "./lib";

export const RULE_NAME = "is-from-ref";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all identifiers initialized or derived from refs in JSON format.",
    },
    messages: {
      default: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const initialScope = context.sourceCode.getScope(node);
    const refInit = getRefInitNode(context, node, initialScope);
    if (refInit != null) {
      const json = stringify({
        name: node.name,
        init: context.sourceCode.getText(refInit),
      });
      context.report({
        data: { json },
        messageId: "default",
        node,
      });
    }
  }
  return merge(
    { Identifier: visitorFunction, JSXIdentifier: visitorFunction },
  );
}
