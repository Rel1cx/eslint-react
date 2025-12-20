import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-vars";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks variables used in JSX elements as used.",
    },
    messages: {
      jsxUsesVars: "An identifier in JSX is marked as used.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXOpeningElement(node) {
      switch (node.name.type) {
        case T.JSXIdentifier: {
          // Skip JsxIntrinsicElements (e.g., `<div>`)
          if (/^[a-z]/u.test(node.name.name)) {
            return;
          }
          // Mark custom components (e.g., `<Component />`) as used
          context.sourceCode.markVariableAsUsed(node.name.name, node);
          break;
        }
        case T.JSXMemberExpression: {
          const { object } = node.name;
          if (object.type === T.JSXIdentifier) {
            // Mark the base of member expressions (e.g., `React` in `<React.Fragment />`) as used
            context.sourceCode.markVariableAsUsed(object.name, node);
          }
          break;
        }
      }
    },
  };
}
