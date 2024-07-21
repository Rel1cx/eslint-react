import { NodeType } from "@eslint-react/ast";
import { elementType, findPropInAttributes, getPropValue } from "@eslint-react/jsx";
import { parseESLintSettings } from "@eslint-react/shared";
import { F, O, Pred } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string) {
  return /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string) {
  return /\bnoreferrer\b/u.test(value);
}

// TODO(WIP): Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the "rel" attribute internally
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: `disallow 'target="_blank"' on an external link without 'rel="noreferrer noopener"'`,
    },
    messages: {
      NO_UNSAFE_TARGET_BLANK:
        `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const additionalComponents = parseESLintSettings(context.settings)["react-x"]?.additionalComponents ?? [];
    function checkJSXElement(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      const { attributes } = node.openingElement;
      const initialScope = context.sourceCode.getScope(node);
      const hasTargetBlank = F.pipe(
        findPropInAttributes(attributes, context, initialScope)("target"),
        O.flatMap(attr => getPropValue(attr, context)),
        O.exists(v => v?.value === "_blank"),
      );
      if (!hasTargetBlank) return O.none();
      const hasExternalLinkLike = attributes.some(attr => {
        if (attr.type !== NodeType.JSXAttribute) return false;
        return F.pipe(
          getPropValue(attr, context),
          O.flatMapNullable(v => v?.value),
          O.filter(Pred.isString),
          O.exists(isExternalLinkLike),
        );
      });
      if (!hasExternalLinkLike) return O.none();
      const relProp = findPropInAttributes(attributes, context, initialScope)("rel");
      const relPropValue = F.pipe(
        relProp,
        O.flatMap(attr => getPropValue(attr, context)),
        O.flatMapNullable(v => v?.value),
        O.filter(Pred.isString),
      );
      if (O.isSome(relProp) && O.exists(relPropValue, isSafeRel)) return O.none();
      const elementName = elementType(node.openingElement);
      const defaultRelValue = F.pipe(
        O.fromNullable(additionalComponents.find(c => c.name === elementName)),
        O.flatMapNullable(c => c.attributes),
        O.flatMapNullable(attrs => attrs.findLast(a => a.name === "rel")),
        O.flatMapNullable(a => a.defaultValue),
      );
      if (O.exists(defaultRelValue, isSafeRel)) return O.none();
      return O.some(
        {
          messageId: "NO_UNSAFE_TARGET_BLANK",
          node,
        } as const,
      );
    }
    return {
      JSXElement: F.flow(checkJSXElement, O.map(context.report)),
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
