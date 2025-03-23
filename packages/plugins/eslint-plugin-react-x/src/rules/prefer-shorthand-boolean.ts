import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-boolean";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces shorthand syntax for boolean attributes.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      preferShorthandBoolean: "Use shorthand boolean attribute '{{propName}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node: TSESTree.JSXAttribute) {
      const { value } = node;
      const propName = JSX.getAttributeName(node);
      const hasValueTrue = value?.type === T.JSXExpressionContainer
        && value.expression.type === T.Literal
        && value.expression.value === true;
      if (!hasValueTrue) {
        return;
      }
      context.report({
        messageId: "preferShorthandBoolean",
        node,
        data: {
          propName,
        },
        fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
      });
    },
  };
}
