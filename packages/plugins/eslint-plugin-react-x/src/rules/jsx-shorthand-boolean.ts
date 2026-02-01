import * as core from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import type { RuleContext, RuleFeature, RulePolicy } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-shorthand-boolean";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

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
      description: "Enforces shorthand syntax for boolean props.",
    },
    fixable: "code",
    messages: {
      default: "{{message}}",
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
      const propName = core.getJsxAttributeName(context, node);

      switch (true) {
        // Enforce shorthand syntax for boolean attributes (e.g., `prop` instead of `prop={true}`)
        case policy === 1
          && value?.type === AST.JSXExpressionContainer
          && value.expression.type === AST.Literal
          && value.expression.value === true: {
          context.report({
            messageId: "default",
            node,
            data: {
              message: `Omit attribute value for '${propName}'.`,
            },
            fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
          });
          break;
        }
        // Enforce explicit `={true}` for boolean attributes (e.g., `prop={true}` instead of `prop`)
        case policy === -1
          // eslint-disable-next-line function-rule-2/function-rule
          && value === null: {
          context.report({
            messageId: "default",
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
