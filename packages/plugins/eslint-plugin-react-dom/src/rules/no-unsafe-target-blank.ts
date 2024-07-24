import { NodeType } from "@eslint-react/ast";
import { elementType, findPropInAttributes, getPropValue } from "@eslint-react/jsx";
import { parseESLintSettings } from "@eslint-react/shared";
import { F, O, Pred } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { groupBy } from "es-toolkit";
import type { ConstantCase } from "string-ts";

import { createRule, getPropFromPreDefined } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string) {
  return value.startsWith("https://")
    || /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string) {
  return value === "noreferrer"
    || /\bnoreferrer\b/u.test(value);
}

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
    const additionalComponentsByName = groupBy(additionalComponents, c => "name" in c ? c.name : "");
    function checkJSXElement(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      const elementName = elementType(node.openingElement);
      const { attributes } = node.openingElement;
      const initialScope = context.sourceCode.getScope(node);
      const additionalAttributes = F.pipe(
        O.fromNullable(additionalComponentsByName[elementName]?.filter(c => c.as === "a")),
        O.flatMapNullable(c => c.at(-1)),
        O.flatMapNullable(c => c.attributes),
      );
      const [
        targetPropName,
        targetPropDefaultValue,
      ] = getPropFromPreDefined("target", O.getOrElse(() => [])(additionalAttributes));
      const targetProp = findPropInAttributes(attributes, context, initialScope)(targetPropName);
      const targetPropValue = O.isNone(targetProp)
        ? O.fromNullable(targetPropDefaultValue)
        : F.pipe(
          targetProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(Pred.isString),
        );
      if (!O.exists(targetPropValue, t => t === "_blank")) return O.none();
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
      const [
        relPropName,
        relPropDefaultValue,
      ] = getPropFromPreDefined("rel", O.getOrElse(() => [])(additionalAttributes));
      const relProp = findPropInAttributes(attributes, context, initialScope)(relPropName);
      const relPropValue = O.isNone(relProp)
        ? O.fromNullable(relPropDefaultValue)
        : F.pipe(
          relProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v => v?.value),
          O.filter(Pred.isString),
        );
      if (O.exists(relPropValue, isSafeRel)) return O.none();
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
