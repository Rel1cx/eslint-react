import * as JSX from "@eslint-react/jsx";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import { F, isString, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match, P } from "ts-pattern";

import { createRule, findAttrInCustomAttributes } from "../utils";

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
    const settings = normalizeSettings(decodeSettings(context.settings));
    const polymorphicPropName = settings.polymorphicPropName;
    const components = settings.components;
    const additionalComponents = settings.additionalComponents.filter(c => c.as === "a");
    function getReportDescriptor(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      const name = JSX.getElementName(node.openingElement);
      const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) };
      const elementType = JSX.getElementType(jsxCtx, components, polymorphicPropName)(node.openingElement);
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
      ] = findAttrInCustomAttributes("target", additionalAttributes);
      const targetProp = JSX.findPropInAttributes(attributes, initialScope)(targetPropName);
      const targetPropValue = O.isNone(targetProp)
        ? O.fromNullable(targetPropDefaultValue)
        : F.pipe(
          targetProp,
          O.flatMap(attr => JSX.getPropValue(attr, jsxCtx.getScope(attr))),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with({ [targetPropName]: P.string }, (v) => v[targetPropName])
              .otherwise(F.constNull)
          ),
          O.filter(isString),
        );
      if (!O.exists(targetPropValue, t => t === "_blank")) return O.none();
      const [
        hrefPropName,
        hrefPropDefaultValue,
      ] = findAttrInCustomAttributes("href", additionalAttributes);
      const hrefProp = JSX.findPropInAttributes(attributes, initialScope)(hrefPropName);
      const hrefPropValue = O.isNone(hrefProp)
        ? O.fromNullable(hrefPropDefaultValue)
        : F.pipe(
          hrefProp,
          O.flatMap(attr => JSX.getPropValue(attr, jsxCtx.getScope(attr))),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with(P.shape({ [hrefPropName]: P.string }), (v) => v[hrefPropName])
              .otherwise(F.constNull)
          ),
          O.filter(isString),
        );
      if (!O.exists(hrefPropValue, isExternalLinkLike)) return O.none();
      const [
        relPropName,
        relPropDefaultValue,
      ] = findAttrInCustomAttributes("rel", additionalAttributes);
      const relProp = JSX.findPropInAttributes(attributes, initialScope)(relPropName);
      const relPropValue = O.isNone(relProp)
        ? O.fromNullable(relPropDefaultValue)
        : F.pipe(
          relProp,
          O.flatMap(attr => JSX.getPropValue(attr, jsxCtx.getScope(attr))),
          O.flatMapNullable(v =>
            match(v?.value)
              .with(P.string, F.identity)
              .with(P.shape({ [relPropName]: P.string }), (v) => v[relPropName])
              .otherwise(F.constNull)
          ),
          O.filter(isString),
        );
      if (O.exists(relPropValue, isSafeRel)) return O.none();
      return O.some({
        messageId: "noUnsafeTargetBlank",
        node,
      });
    }
    return {
      JSXElement: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
