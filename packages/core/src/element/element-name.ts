import * as JSX from "@eslint-react/jsx";
import type { CustomComponentNormalized, RuleContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function getElementNameAndRepresentName(
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
  const polymorphicProp = JSX.findPropInAttributes(
    polymorphicPropName,
    initialScope,
    node.attributes,
  );
  if (polymorphicProp == null) return [name, name];
  const polymorphicName = VAR.toResolved(JSX.getPropValue(polymorphicProp, initialScope)).value;
  if (typeof polymorphicName === "string") {
    return [name, polymorphicName];
  }
  return [name, name];
}
