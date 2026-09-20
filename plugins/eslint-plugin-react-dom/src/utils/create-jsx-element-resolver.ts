import type { RuleContext } from "@eslint-react/eslint";
import { getAttributeStaticValue, getElementFullType } from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Creates a resolver for JSX elements that determines the underlying DOM element type.
 *
 * This resolver handles:
 * 1. Regular HTML elements (div, span, etc.)
 * 2. Polymorphic components (components that render as a different element via a prop,
 *    ex: `<Box as="a">`). Only static string values of the polymorphic prop are
 *    supported; `<Box as={Component}>` cannot be resolved statically and falls back
 *    to the JSX element's own name.
 *
 * @param context The ESLint rule context
 * @returns An object with a resolve method to determine the element type
 */
export function createJsxElementResolver(context: RuleContext) {
  const { polymorphicPropName } = getSettingsFromContext(context);
  return {
    /**
     * Resolves the JSX element to determine its type and the underlying DOM element type
     *
     * @param node The JSX element node to resolve
     * @returns An object containing the JSX element type and DOM element type
     */
    resolve(node: TSESTree.JSXElement) {
      // Get the element name/type (ex: 'div', 'Button', etc.)
      const elementName = getElementFullType(node);

      // Create the base result with element types
      const result = {
        domElementType: elementName,
        jsxElementType: elementName,
      };

      const nameNode = node.openingElement.name;

      // Per React semantics, only plain identifiers starting with a lowercase
      // letter are host elements (ex: 'div'). Member expressions (ex: 'motion.iframe')
      // and namespaced names are components and may still resolve to a DOM element
      // via the polymorphic prop.
      if (nameNode.type === AST.JSXIdentifier && nameNode.name.charAt(0) === nameNode.name.charAt(0).toLowerCase()) {
        return result;
      }

      // Try to get the value of the polymorphic prop (ex: 'as' or 'component')
      const polyPropValue = getAttributeStaticValue(context, node, polymorphicPropName);

      // If we have a string value, use it as the DOM element type; tag names are
      // case-insensitive in HTML, so normalize to lowercase for comparison
      if (typeof polyPropValue === "string") {
        return {
          ...result,
          domElementType: polyPropValue.toLowerCase(),
        };
      }

      return result;
    },
  } as const;
}
