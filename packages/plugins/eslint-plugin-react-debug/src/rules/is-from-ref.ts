import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule, stringify } from "../utils";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const initialScope = context.sourceCode.getScope(node);
    if (isFromRef(node, initialScope)) {
      const json = stringify({
        name: node.name,
        // init: TODO: Add initialization info
      });
      context.report({
        messageId: "default",
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
    case node.parent.type === AST.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.Identifier:
      return core.isInitializedFromRef(node.parent.object.name, initialScope);
    case node.parent.type === AST.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.JSXIdentifier:
      return core.isInitializedFromRef(node.parent.object.name, initialScope);
    default:
      return core.isInitializedFromRef(name, initialScope);
  }
}
