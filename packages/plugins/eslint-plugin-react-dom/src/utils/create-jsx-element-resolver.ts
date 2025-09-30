import { getJsxAttribute, getJsxElementType, resolveJsxAttributeValue } from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Creates a resolver for JSX elements that determines both the JSX element type
 * and the underlying DOM element type.
 *
 * This resolver handles:
 * 1. Regular HTML elements (div, span, etc.)
 * 2. Polymorphic components (components that can render as different elements via a prop)
 *
 * @param context - The ESLint rule context
 * @returns An object with a resolve method to determine element types
 */
export function createJsxElementResolver(context: RuleContext) {
  const { polymorphicPropName } = getSettingsFromContext(context);

  return {
    /**
     * Resolves the JSX element to determine its type and the underlying DOM element type
     *
     * @param node - The JSX element node to resolve
     * @returns An object containing the JSX element type and DOM element type
     */
    resolve(node: TSESTree.JSXElement) {
      // Get the element name/type (e.g., 'div', 'Button', etc.)
      const elementName = getJsxElementType(context, node);

      // Create the base result with element types
      const result = {
        domElementType: elementName,
        jsxElementType: elementName,
      };

      // Early return if any of these conditions are met:
      // 1. It's a native HTML element (lowercase name)
      // 2. No polymorphic prop name is configured
      if (elementName === elementName.toLowerCase() || polymorphicPropName == null) {
        return result;
      }

      // Look for the polymorphic prop (e.g., 'as', 'component') in the element's attributes
      const findAttribute = getJsxAttribute(context, node.openingElement.attributes, context.sourceCode.getScope(node));
      const polymorphicProp = findAttribute(polymorphicPropName);

      // If the polymorphic prop exists, try to determine its static value
      if (polymorphicProp != null) {
        const polymorphicPropValue = resolveJsxAttributeValue(context, polymorphicProp);
        const staticValue = polymorphicPropValue.toStatic(polymorphicPropName);

        // If we have a string value, use it as the DOM element type
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
