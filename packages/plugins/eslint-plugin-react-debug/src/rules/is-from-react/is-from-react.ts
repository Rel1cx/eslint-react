import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";

import { createRule, stringify } from "../../utils";

export const RULE_NAME = "is-from-react";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all identifiers initialized from React in JSON format.",
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
  const { importSource } = getSettingsFromContext(context);

  function visitorFunction(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const shouldSkipDuplicate = node.parent.type === AST.ImportSpecifier
      && node.parent.imported === node
      && node.parent.imported.name === node.parent.local.name;
    if (shouldSkipDuplicate) return;
    const name = node.name;
    const initialScope = context.sourceCode.getScope(node);
    if (!isFromReact(node, initialScope, importSource)) return;
    context.report({
      data: {
        json: stringify({
          name,
          importSource,
        }),
      },
      messageId: "default",
      node,
    });
  }
  return defineRuleListener(
    { Identifier: visitorFunction, JSXIdentifier: visitorFunction },
  );
}

/**
 * Check if an identifier node is initialized from React
 * @param node The identifier node to check
 * @param initialScope Initial scope to search for the identifier
 * @param importSource The import source to check against
 * @returns Whether the identifier node is initialized from React
 */
function isFromReact(
  node: TSESTree.Identifier | TSESTree.JSXIdentifier,
  initialScope: Scope,
  importSource = "react",
) {
  const name = node.name;
  switch (true) {
    case node.parent.type === AST.MemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.Identifier:
      return core.isInitializedFromReact(node.parent.object.name, initialScope, importSource);
    case node.parent.type === AST.JSXMemberExpression
      && node.parent.property === node
      && node.parent.object.type === AST.JSXIdentifier:
      return core.isInitializedFromReact(node.parent.object.name, initialScope, importSource);
    default:
      return core.isInitializedFromReact(name, initialScope, importSource);
  }
}
