import { _, identity } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { CustomComponentNormalized, RuleContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";

export function getAdditionalAttributes(name: string, additionalComponents: CustomComponentNormalized[]) {
  return additionalComponents
    .findLast((c) => c.name === name || c.re.test(name))
    ?.attributes
    ?? [];
}

export function getAttributeStringValue(
  attributeName: string,
  element: TSESTree.JSXElement,
  context: RuleContext,
  additionalAttributes: CustomComponentNormalized["attributes"],
) {
  const attributeConfig = additionalAttributes
    .findLast((attr) => attr.as === attributeName);
  const actualAttributeName = attributeConfig?.name ?? attributeName;
  const actualAttributeNode = JSX.findPropInAttributes(
    actualAttributeName,
    context.sourceCode.getScope(element),
    element.openingElement.attributes,
  );
  if (actualAttributeNode == null) return attributeConfig?.defaultValue;
  const actualAttributeScope = context.sourceCode.getScope(actualAttributeNode);
  const actualAttributeValue = JSX.getPropValue(actualAttributeNode, actualAttributeScope);
  const actualAttributeValueResolved = VAR.toResolved(actualAttributeValue).value;
  return match(actualAttributeValueResolved)
    .with(P.string, identity)
    .with({ [actualAttributeName]: P.select(P.string) }, identity)
    .otherwise(() => _);
}
