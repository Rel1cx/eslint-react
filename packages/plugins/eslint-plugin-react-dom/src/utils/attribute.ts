import { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { CustomAttributeNormalized, CustomComponentNormalized, RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

export function getAdditionalAttributes(componentName: string, additionalComponents: CustomComponentNormalized[]) {
  return additionalComponents
    .findLast((c) => c.name === componentName || c.re.test(componentName))
    ?.attributes
    ?? [];
}

/**
 * Get the metadata of an attribute from the additional attributes.
 * @param name The intrinsic name of the attribute.
 * @param attributes The additional attributes of the user-defined component.
 * @returns The metadata of the attribute.
 */
export function getAttributeMetaData(
  name: string,
  attributes: CustomComponentNormalized["attributes"],
) {
  const settings = attributes
    .findLast((a) => a.as === name);

  return {
    name: settings?.name ?? name,
    controlled: settings?.controlled ?? false,
    defaultValue: settings?.defaultValue,
  };
}

export function getAttributeNodeAndStringValue(
  name: string,
  element: TSESTree.JSXElement,
  context: RuleContext,
  additionalAttributes: CustomAttributeNormalized[],
) {
  const attributeMetaData = getAttributeMetaData(name, additionalAttributes);
  const attributeNameOnElement = attributeMetaData.name;
  const attributeNode = JSX.getAttributeNode(
    attributeNameOnElement,
    context.sourceCode.getScope(element),
    element.openingElement.attributes,
  );
  if (attributeNode == null) {
    return {
      attributeNode: _,
      attributeValue: attributeMetaData.defaultValue,
    } as const;
  }
  const attributeScope = context.sourceCode.getScope(attributeNode);
  const attributeValue = JSX.getAttributeStringValue(
    attributeNameOnElement,
    attributeNode,
    attributeScope,
  );
  return { attributeNode, attributeValue } as const;
}
