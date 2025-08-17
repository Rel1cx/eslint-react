import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature, RulePolicy } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import * as ER from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-shorthand-boolean";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type Options = readonly [
  | unit
  | RulePolicy,
];

const defaultOptions = [1] as const satisfies Options;

const schema = [
  {
    type: "integer",
    enum: [-1, 1],
  },
] as const satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces shorthand syntax for boolean attributes.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      jsxShorthandBoolean: "{{message}}",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const policy = context.options[0] ?? defaultOptions[0];
  return {
    JSXAttribute(node: TSESTree.JSXAttribute) {
      const { value } = node;
      const propName = ER.getAttributeName(context, node);

      switch (true) {
        case policy === 1
          && value?.type === T.JSXExpressionContainer
          && value.expression.type === T.Literal
          && value.expression.value === true: {
          context.report({
            messageId: "jsxShorthandBoolean",
            node,
            data: {
              message: `Omit attribute value for '${propName}'.`,
            },
            fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
          });
          break;
        }
        case policy === -1
          && value === null: { // eslint-disable-line local/prefer-eqeq-nullish-comparison
          context.report({
            messageId: "jsxShorthandBoolean",
            node: node.value ?? node,
            data: {
              message: `Set attribute value for '${propName}'.`,
            },
            fix: (fixer) => fixer.insertTextAfter(node.name, `={true}`),
          });
          break;
        }
      }
    },
  };
}
