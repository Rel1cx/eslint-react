import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule, stringify } from "../../utils";
import { isFromReact } from "./lib";

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
  return merge(
    { Identifier: visitorFunction, JSXIdentifier: visitorFunction },
  );
}
