import * as ER from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/kit";
import type { CustomComponentPropNormalized } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { findCustomComponentProp } from "./find-custom-component";

export function resolveAttribute(
  context: RuleContext,
  attributes: CustomComponentPropNormalized[],
  elementNode: TSESTree.JSXElement,
  attributeName: string,
): {
  attribute: unit | TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute;
  attributeName: string;
  attributeValue: unit | ReturnType<typeof ER.getAttributeValue>;
  attributeValueString: unit | string;
} {
  const customComponentProp = findCustomComponentProp(attributeName, attributes);
  const propNameOnJsx = customComponentProp?.name ?? attributeName;
  const attribute = ER.getAttribute(
    context,
    propNameOnJsx,
    elementNode.openingElement.attributes,
    context.sourceCode.getScope(elementNode),
  );
  if (attribute == null) {
    return {
      attribute: unit,
      attributeName: propNameOnJsx,
      attributeValue: unit,
      attributeValueString: customComponentProp?.defaultValue,
    } as const;
  }
  const attributeValue = ER.getAttributeValue(context, attribute, propNameOnJsx);
  if (attributeValue.kind === "some" && typeof attributeValue.value === "string") {
    return {
      attribute,
      attributeName: propNameOnJsx,
      attributeValue,
      attributeValueString: attributeValue.value,
    } as const;
  }
  return {
    attribute,
    attributeName: propNameOnJsx,
    attributeValue: unit,
    attributeValueString: customComponentProp?.defaultValue ?? unit,
  } as const;
}
