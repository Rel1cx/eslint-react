import * as core from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, type RulePolicy, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-shorthand-fragment";

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
      description: "Enforces shorthand syntax for fragment elements.",
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

export function create(context: RuleContext<MessageID, Options>) {
  // Get the rule policy from options, default to 1 (enforce shorthand)
  const policy = context.options[0] ?? defaultOptions[0];
  const jsxConfig = {
    ...core.getJsxConfigFromContext(context),
    ...core.getJsxConfigFromAnnotation(context),
  };

  const { jsxFragmentFactory } = jsxConfig;

  // Apply logic based on the policy
  return match<number, ReturnType<typeof defineRuleListener>>(policy)
    // Policy 1: Enforce shorthand fragment syntax (<>...</>)
    .with(1, () =>
      defineRuleListener({
        JSXElement(node: TSESTree.JSXElement) {
          // Check if the element is a Fragment component
          if (!core.isJsxFragmentElement(context, node, jsxConfig)) return;
          // Ignore if the Fragment has attributes (e.g., key)
          const hasAttributes = node.openingElement.attributes.length > 0;
          if (hasAttributes) return;
          // Report an error and suggest using shorthand syntax
          context.report({
            messageId: "default",
            node,
            data: { message: "Use fragment shorthand syntax instead of 'Fragment' component." },
            fix: (fixer) => {
              const { closingElement, openingElement } = node;
              if (closingElement == null) {
                return [];
              }
              // Replace <Fragment> with <> and </Fragment> with </>
              return [
                fixer.replaceTextRange([openingElement.range[0], openingElement.range[1]], "<>"),
                fixer.replaceTextRange([closingElement.range[0], closingElement.range[1]], "</>"),
              ];
            },
          });
        },
      }))
    // Policy -1: Enforce longhand fragment syntax (<Fragment>...</Fragment>)
    .with(-1, () =>
      defineRuleListener({
        JSXFragment(node: TSESTree.JSXFragment) {
          // Report an error for shorthand syntax and suggest using the longhand component
          context.report({
            messageId: "default",
            node,
            data: { message: "Use 'Fragment' component instead of fragment shorthand syntax." },
            fix: (fixer) => {
              const { closingFragment, openingFragment } = node;
              // Replace <> with <Fragment> and </> with </Fragment>
              return [
                fixer.replaceTextRange(
                  [
                    openingFragment.range[0],
                    openingFragment.range[1],
                  ],
                  `<${jsxFragmentFactory}>`,
                ),
                fixer.replaceTextRange(
                  [
                    closingFragment.range[0],
                    closingFragment.range[1],
                  ],
                  `</${jsxFragmentFactory}>`,
                ),
              ];
            },
          });
        },
      }))
    // Do nothing for other policies
    .otherwise(() => ({}));
}
