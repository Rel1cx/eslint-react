import { NodeType } from "@eslint-react/ast";
import { getPropValue } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { isString } from "effect/Predicate";
import type { ConstantCase } from "string-ts";

import { findPropInAttributes } from "../../../jsx/src/prop/find-prop-in-attributes";
import { createRule, isSafeRel } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: 'disallow `target="_blank"` without `rel="noreferrer noopener"`',
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSAFE_TARGET_BLANK: 'Using `target="_blank"` without `rel="noreferrer noopener"` is a security risk.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type !== NodeType.JSXIdentifier || !node.value) {
          return;
        }
        const link = getStaticValue(
          node.value.type === NodeType.JSXExpressionContainer
            ? node.value.expression
            : node.value,
          context.getScope(),
        );
        if (!isString(link?.value) || link.value !== "_blank") {
          return;
        }

        const { parent } = node;

        if (parent.type !== NodeType.JSXOpeningElement) {
          return;
        }

        const maybeRelAttribute = findPropInAttributes(parent.attributes, context)("rel");

        if (O.isNone(maybeRelAttribute)) {
          context.report({
            messageId: "NO_UNSAFE_TARGET_BLANK",
            node,
          });

          return;
        }

        const isSafeRelValue = F.pipe(
          getPropValue(maybeRelAttribute.value, context),
          O.flatMapNullable(v => v?.value),
          O.filter(isString),
          O.filter(isSafeRel),
          O.isSome,
        );

        if (!isSafeRelValue) {
          context.report({
            messageId: "NO_UNSAFE_TARGET_BLANK",
            node,
          });
        }
      },
    };
  },
});
