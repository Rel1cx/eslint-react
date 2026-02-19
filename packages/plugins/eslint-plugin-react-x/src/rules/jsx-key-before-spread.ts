import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-key-before-spread";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces 'key' prop placement before spread props.",
    },
    messages: {
      default: "The 'key' prop must be placed before any spread props when using the new JSX transform.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { jsx } = {
    ...core.getJsxConfigFromContext(context),
    ...core.getJsxConfigFromAnnotation(context),
  };

  // This rule is only applicable for the new JSX transform
  if (jsx !== core.JsxEmit.ReactJSX && jsx !== core.JsxEmit.ReactJSXDev) return {};

  return defineRuleListener(
    {
      JSXOpeningElement(node) {
        let firstSpreadPropIndex: null | number = null;
        for (const [index, prop] of node.attributes.entries()) {
          if (prop.type === AST.JSXSpreadAttribute) {
            firstSpreadPropIndex ??= index;
            continue;
          }
          if (firstSpreadPropIndex == null) {
            continue;
          }
          // If a 'key' prop is found after a spread prop, report an error
          if (prop.name.name === "key" && index > firstSpreadPropIndex) {
            context.report({
              messageId: "default",
              node: prop,
            });
          }
        }
      },
    },
  );
}
