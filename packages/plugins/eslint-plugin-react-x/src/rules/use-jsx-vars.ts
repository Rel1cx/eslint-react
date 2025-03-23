import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "use-jsx-vars";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks variables used in JSX as used.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      useJsxVars: "",
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
          // Skip JsxIntrinsicElements
          if (/^[a-z]/u.test(node.name.name)) {
            return;
          }
          context.sourceCode.markVariableAsUsed(node.name.name, node);
          break;
        }
        case T.JSXMemberExpression: {
          const { object } = node.name;
          if (object.type === T.JSXIdentifier) {
            context.sourceCode.markVariableAsUsed(object.name, node);
          }
          break;
        }
      }
    },
  };
}
