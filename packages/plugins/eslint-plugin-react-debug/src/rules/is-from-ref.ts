import { isInitializedFromRef } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule, stringify } from "../utils";

export const RULE_NAME = "is-from-ref";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all identifiers derived from ref in JSON format.",
    },
    messages: {
      isFromRef: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const initialScope = context.sourceCode.getScope(node);
    if (isFromRef(node, initialScope)) {
      const json = stringify({
        name: node.name,
        // init: TODO: Add initialization info
      });
      context.report({
        messageId: "isFromRef",
        node,
        data: { json },
      });
    }
  }
  return { Identifier: visitorFunction, JSXIdentifier: visitorFunction };
}

function isFromRef(
  node: TSESTree.Identifier | TSESTree.JSXIdentifier,
  initialScope: Scope,
) {
  const name = node.name;
  switch (true) {
    case node.parent.type === T.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === T.Identifier:
      return isInitializedFromRef(node.parent.object.name, initialScope);
    case node.parent.type === T.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === T.JSXIdentifier:
      return isInitializedFromRef(node.parent.object.name, initialScope);
    default:
      return isInitializedFromRef(name, initialScope);
  }
}
