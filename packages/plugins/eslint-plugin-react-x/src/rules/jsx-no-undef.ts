import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as VAR from "@eslint-react/var";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-undef";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow undefined variables in JSX.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxNoUndef: "JSX variable '{{name}}' is not defined.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXIdentifier(node) {
      if (node.name === "this") {
        return;
      }
      // Skip JsxIntrinsicElements
      if (/^[a-z]/u.test(node.name)) {
        return;
      }
      // Skip JSXMemberExpression property
      if (node.parent.type === T.JSXMemberExpression && node.parent.property === node) {
        return;
      }
      const initialScope = context.sourceCode.getScope(node);
      if (VAR.findVariable(node.name, initialScope) == null) {
        context.report({
          messageId: "jsxNoUndef",
          node,
          data: { name: node.name },
        });
      }
    },
  };
}
