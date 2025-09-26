import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { findVariable } from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

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
    JSXOpeningElement(node) {
      const name = match(node.name)
        .with({ type: T.JSXIdentifier }, (n) => n.name)
        .with({ type: T.JSXMemberExpression, object: { type: T.JSXIdentifier } }, (n) => n.object.name)
        .otherwise(() => null);
      if (name == null) return;
      if (name === "this") return;
      // Skip JsxIntrinsicElements
      if (/^[a-z]/u.test(name)) return;
      if (findVariable(name, context.sourceCode.getScope(node)) == null) {
        context.report({
          messageId: "jsxNoUndef",
          node,
          data: {
            name,
          },
        });
      }
    },
  };
}
