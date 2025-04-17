import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

import * as ER from "@eslint-react/core";
import { getSettingsFromContext } from "@eslint-react/shared";

export function createJsxElementResolver(context: RuleContext) {
  const { components, polymorphicPropName } = getSettingsFromContext(context);
  return {
    resolve(node: TSESTree.JSXElement) {
      const name = ER.getElementType(context, node);
      const component = components
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
      const polymorphicPropAttr = ER.getAttribute(
        context,
        polymorphicPropName,
        node.openingElement.attributes,
        initialScope,
      );
      if (polymorphicPropAttr != null) {
        const polymorphicPropValue = ER.getAttributeValue(
          context,
          polymorphicPropAttr,
          polymorphicPropName,
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
