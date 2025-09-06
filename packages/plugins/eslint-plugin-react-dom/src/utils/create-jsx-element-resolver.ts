import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

import * as ER from "@eslint-react/core";
import { getSettingsFromContext } from "@eslint-react/shared";

export function createJsxElementResolver(context: RuleContext) {
  const { components, polymorphicPropName: polyPropName } = getSettingsFromContext(context);
  return {
    resolve(node: TSESTree.JSXElement) {
      const name = ER.getElementType(context, node);
      const component = components
        .findLast((c) => c.name === name || c.re.test(name));
      const result = {
        domElementType: component?.as ?? name,
        jsxElementType: name,
      };
      if (name === name.toLowerCase() || component != null || polyPropName == null) {
        return result;
      }
      const initialScope = context.sourceCode.getScope(node);
      const polyPropAttr = ER.getAttribute(context, node.openingElement.attributes, initialScope)(polyPropName);
      if (polyPropAttr != null) {
        const polyPropValue = ER.resolveAttributeValue(context, polyPropAttr);
        const staticValue = polyPropValue.toStatic(polyPropName);
        if (typeof staticValue === "string") {
          return {
            ...result,
            domElementType: staticValue,
          };
        }
      }
      return result;
    },
  } as const;
}
