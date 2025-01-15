import * as JSX from "@eslint-react/jsx";
import type { CustomComponentNormalized, RuleContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function getElementNameOnJsxAndDom(
  node: TSESTree.JSXOpeningElement,
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
  const attributeNode = JSX.getAttributeNode(
    polymorphicPropName,
    initialScope,
    node.attributes,
  );
  if (attributeNode == null) return [name, name];
  const polymorphicPropValue = VAR.toResolved(JSX.getAttributeStaticValue(attributeNode, initialScope)).value;
  if (typeof polymorphicPropValue === "string") {
    return [name, polymorphicPropValue];
  }
  return [name, name];
}
