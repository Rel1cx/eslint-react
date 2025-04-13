import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import * as JSX from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";

export function createJsxElementResolver(context: RuleContext) {
  const {
    additionalComponents,
    polymorphicPropName,
  } = getSettingsFromContext(context);
  return {
    resolve(node: TSESTree.JSXElement) {
      const name = JSX.getElementType(node);
      const component = additionalComponents
        .findLast((c) => c.name === name || c.re.test(name));
      const result = {
        attributes: component?.attributes ?? [],
        domElementType: component?.as ?? name,
        jsxElementType: name,
      };
      if (name === name.toLowerCase() || component != null || polymorphicPropName == null) {
        return result;
      }
      const initialScope = context.sourceCode.getScope(node);
      const polymorphicPropAttr = JSX.getAttribute(
        polymorphicPropName,
        node.openingElement.attributes,
        initialScope,
      );
      if (polymorphicPropAttr != null) {
        const polymorphicPropValue = JSX.getAttributeValue(
          polymorphicPropAttr,
          polymorphicPropName,
          initialScope,
        );
        if (polymorphicPropValue.kind === "some" && typeof polymorphicPropValue.value === "string") {
          return {
            ...result,
            domElementType: polymorphicPropValue.value,
          };
        }
      }
      return result;
    },
  } as const;
}
