import type { _ } from "@eslint-react/eff";
import type { RuleContext, RuleFeature, RulePolicy } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import * as ER from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-shorthand-boolean";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "omitAttributeValue"
  | "setAttributeValue";

type Options = readonly [
  | _
  | RulePolicy,
];

const defaultOptions = ["prefer"] as const satisfies Options;

const schema = [
  {
    type: "string",
    enum: ["prefer", "avoid"],
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
      omitAttributeValue: "Value must be omitted for boolean attribute `{{propName}}`",
      setAttributeValue: "Value must be set for boolean attribute `{{propName}}`",
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
      if (policy === "avoid" && value == null) {
        context.report({
          messageId: "setAttributeValue",
          node,
          data: {
            propName: ER.getAttributeName(context, node),
          },
          fix: (fixer) => fixer.insertTextAfter(node.name, `={true}`),
        });
        return;
      }

      const hasValueTrue = value?.type === T.JSXExpressionContainer
        && value.expression.type === T.Literal
        && value.expression.value === true;
      const propName = ER.getAttributeName(context, node);
      if (policy === "prefer" && hasValueTrue) {
        context.report({
          messageId: "omitAttributeValue",
          node: node.value ?? node,
          data: {
            propName,
          },
          fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
        });
      }
    },
  };
}
