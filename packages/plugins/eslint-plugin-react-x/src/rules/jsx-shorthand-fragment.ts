import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import * as ER from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RulePolicy } from "@eslint-react/kit";
import { match } from "ts-pattern";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-shorthand-fragment";

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
      description: "Enforces shorthand syntax for fragments.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      jsxShorthandFragment: "{{message}}",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const policy = context.options[0] ?? defaultOptions[0];
  const jsxConfig = {
    ...ER.getJsxConfigFromContext(context),
    ...ER.getJsxConfigFromAnnotation(context),
  };

  const { jsxFragmentFactory } = jsxConfig;

  return match<number, RuleListener>(policy)
    .with(1, () => ({
      JSXElement(node: TSESTree.JSXElement) {
        if (!ER.isFragmentElement(context, node)) return;
        const hasAttributes = node.openingElement.attributes.length > 0;
        if (hasAttributes) return;
        context.report({
          messageId: "jsxShorthandFragment",
          node,
          data: { message: "Use fragment shorthand syntax instead of 'Fragment' component." },
          fix: (fixer) => {
            const { closingElement, openingElement } = node;
            if (closingElement == null) {
              return [];
            }
            return [
              fixer.replaceTextRange([openingElement.range[0], openingElement.range[1]], "<>"),
              fixer.replaceTextRange([closingElement.range[0], closingElement.range[1]], "</>"),
            ];
          },
        });
      },
    }))
    .with(-1, () => ({
      JSXFragment(node: TSESTree.JSXFragment) {
        context.report({
          messageId: "jsxShorthandFragment",
          node,
          data: { message: "Use 'Fragment' component instead of fragment shorthand syntax." },
          fix: (fixer) => {
            const { closingFragment, openingFragment } = node;
            return [
              fixer.replaceTextRange(
                [openingFragment.range[0], openingFragment.range[1]],
                "<" + jsxFragmentFactory + ">",
              ),
              fixer.replaceTextRange(
                [closingFragment.range[0], closingFragment.range[1]],
                "</" + jsxFragmentFactory + ">",
              ),
            ];
          },
        });
      },
    }))
    .otherwise(() => ({}));
}
