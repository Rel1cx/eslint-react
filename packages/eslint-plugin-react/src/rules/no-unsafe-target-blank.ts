import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, getPropValue } from "@eslint-react/jsx";
import { F, O, P } from "@eslint-react/tools";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string) {
  return /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string) {
  return /\bnoreferrer\b/u.test(value) && /\bnoopener\b/u.test(value);
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: 'disallow `target="_blank"` on an external link without `rel="noreferrer noopener"`',
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_UNSAFE_TARGET_BLANK:
        'Using `target="_blank"` on an external link without `rel="noreferrer noopener"` is a security risk.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXElement(node) {
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

        const hasTargetBlank = F.pipe(
          findPropInAttributes(attributes, context, initialScope)("target"),
          O.flatMap(attr => getPropValue(attr, context)),
          O.exists(v => v?.value === "_blank"),
        );

        if (!hasTargetBlank) {
          return;
        }

        const hasExternalLinkLike = attributes.some(attr => {
          if (attr.type !== NodeType.JSXAttribute) {
            return false;
          }

          return F.pipe(
            getPropValue(attr, context),
            O.flatMapNullable(v => v?.value),
            O.filter(P.isString),
            O.exists(isExternalLinkLike),
          );
        });

        if (!hasExternalLinkLike) {
          return;
        }

        const hasUnsafeRel = !F.pipe(
          findPropInAttributes(attributes, context, initialScope)("rel"),
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(P.isString),
          O.exists(isSafeRel),
        );

        if (!hasUnsafeRel) {
          return;
        }

        context.report({
          node,
          messageId: "NO_UNSAFE_TARGET_BLANK",
        });
      },
    };
  },
});
