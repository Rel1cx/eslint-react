import * as JSX from "@eslint-react/jsx";
import type { CustomComponentNormalized, RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

export function getElementNameOnJsxAndDom(
  node: TSESTree.JSXElement,
  context: RuleContext,
  polymorphicPropName?: string,
  additionalComponents: CustomComponentNormalized[] = [],
): [string, string] {
  const name = JSX.getElementName(node);
  // Skip JsxIntrinsicElements
  if (name === name.toLowerCase()) return [name, name];
  // Get the component name using the `settings["react-x"].additionalComponents` setting
  const component = additionalComponents
    .findLast((c) => c.name === name || c.re.test(name));
  if (component != null) return [name, component.as];
  if (polymorphicPropName == null) return [name, name];
  // Get the component name using the `settings["react-x"].polymorphicPropName` setting
  const initialScope = context.sourceCode.getScope(node);
  const attributeNode = JSX.getAttribute(
    polymorphicPropName,
    initialScope,
    node.openingElement.attributes,
  );
  if (attributeNode == null) return [name, name];
  const polymorphicPropValue = JSX.getAttributeValue(attributeNode, polymorphicPropName, initialScope);
  if (polymorphicPropValue.kind === "some" && typeof polymorphicPropValue.value === "string") {
    return [name, polymorphicPropValue.value];
  }
  return [name, name];
}
