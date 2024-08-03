import { findPropInAttributes, getElementName, getElementType, getPropValue } from "@eslint-react/jsx";
import { decodeSettings, expandSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import * as R from "remeda";
import type { CamelCase } from "string-ts";
import { match, P } from "ts-pattern";

import { createRule, getPropFromUserDefined } from "../utils";

export const RULE_NAME = "no-unsafe-target-blank";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isExternalLinkLike(value: string) {
  return value.startsWith("https://")
    || /^(?:\w+:|\/\/)/u.test(value);
}

function isSafeRel(value: string) {
  return value === "noreferrer"
    || /\bnoreferrer\b/u.test(value);
}

// TODO: Extract the shared utilities to the utils module
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: `disallow 'target="_blank"' on an external link without 'rel="noreferrer noopener"'`,
    },
    messages: {
      noUnsafeTargetBlank:
        `Using 'target="_blank"' on an external link without 'rel="noreferrer noopener"' is a security risk.`,
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const settings = expandSettings(decodeSettings(context.settings));
    const polymorphicPropName = settings.polymorphicPropName;
    const components = settings.components;
    const additionalComponents = settings?.additionalComponents?.filter(c => c.as === "a") ?? [];
    function checkJSXElement(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      const name = getElementName(node.openingElement);
      const elementType = getElementType(context, components, polymorphicPropName)(node.openingElement);
      if (elementType !== "a" && !additionalComponents.some(c => c.re.test(name))) return O.none();
      const { attributes } = node.openingElement;
      const initialScope = context.sourceCode.getScope(node);
      const additionalAttributes = additionalComponents
        .findLast(c => c.re.test(name))
        ?.attributes
        ?? [];
      const [
        targetPropName,
        targetPropDefaultValue,
      ] = getPropFromUserDefined("target", additionalAttributes);
      const targetProp = findPropInAttributes(attributes, context, initialScope)(targetPropName);
      const targetPropValue = O.isNone(targetProp)
        ? O.fromNullable(targetPropDefaultValue)
        : F.pipe(
          targetProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with(P.shape({ [targetPropName]: P.string }), (v) => v[targetPropName])
              .otherwise(F.constNull)
          ),
          O.filter(R.isString),
        );
      if (!O.exists(targetPropValue, t => t === "_blank")) return O.none();
      const [
        hrefPropName,
        hrefPropDefaultValue,
      ] = getPropFromUserDefined("href", additionalAttributes);
      const hrefProp = findPropInAttributes(attributes, context, initialScope)(hrefPropName);
      const hrefPropValue = O.isNone(hrefProp)
        ? O.fromNullable(hrefPropDefaultValue)
        : F.pipe(
          hrefProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with(P.shape({ [hrefPropName]: P.string }), (v) => v[hrefPropName])
              .otherwise(F.constNull)
          ),
          O.filter(R.isString),
        );
      if (!O.exists(hrefPropValue, isExternalLinkLike)) return O.none();
      const [
        relPropName,
        relPropDefaultValue,
      ] = getPropFromUserDefined("rel", additionalAttributes);
      const relProp = findPropInAttributes(attributes, context, initialScope)(relPropName);
      const relPropValue = O.isNone(relProp)
        ? O.fromNullable(relPropDefaultValue)
        : F.pipe(
          relProp,
          O.flatMap(attr => getPropValue(attr, context)),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with(P.shape({ [relPropName]: P.string }), (v) => v[relPropName])
              .otherwise(F.constNull)
          ),
          O.filter(R.isString),
        );
      if (O.exists(relPropValue, isSafeRel)) return O.none();
      return O.some(
        {
          messageId: "noUnsafeTargetBlank",
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
