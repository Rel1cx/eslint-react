import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-vars";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks JSX element variables as used.",
    },
    messages: {
      default: "An identifier in JSX is marked as used.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener(
    {
      JSXOpeningElement(node) {
        switch (node.name.type) {
          case AST.JSXIdentifier: {
            // Skip JsxIntrinsicElements (e.g., `<div>`)
            if (/^[a-z]/u.test(node.name.name)) {
              return;
            }
            // Mark custom components (e.g., `<Component />`) as used
            context.sourceCode.markVariableAsUsed(node.name.name, node);
            break;
          }
          case AST.JSXMemberExpression: {
            const { object } = node.name;
            if (object.type === AST.JSXIdentifier) {
              // Mark the base of member expressions (e.g., `React` in `<React.Fragment />`) as used
              context.sourceCode.markVariableAsUsed(object.name, node);
            }
            break;
          }
        }
      },
    },
  );
}
