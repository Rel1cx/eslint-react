import { createRule } from "@/utils/create-rule";
import { stringify } from "@/utils/stringify";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  const { importSource } = context.settings;
  const src = context.src;

  function visit(node: TSESTree.Identifier | TSESTree.JSXIdentifier) {
    const shouldSkipDuplicate = node.parent.type === AST.ImportSpecifier
      && node.parent.imported === node
      && node.parent.imported.name === node.parent.local.name;
    if (shouldSkipDuplicate) return;
    const name = node.name;
    const initialScope = src.getScope(node);
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
  return { Identifier: visit, JSXIdentifier: visit };
}
