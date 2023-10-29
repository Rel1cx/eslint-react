import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-in-void-dom-elements";

type MessageID = "NO_CHILDREN_IN_VOID_DOM_ELEMENTS";

const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing children to void DOM elements",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CHILDREN_IN_VOID_DOM_ELEMENTS: "Void DOM elements <{{element}} /> cannot have children.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type !== NodeType.MemberExpression
          && node.callee.type !== NodeType.Identifier
        ) {
          return;
        }

        if (!isCreateElementCall(node, context)) {
          return;
        }

        const args = node.arguments;

        if (args.length < 2) {
          // React.createElement() with only one argument is valid (definitely no children)
          return;
        }

        const elementNameNode = args[0];
        if (!elementNameNode || !("value" in elementNameNode)) {
          return;
        }

        const elementName = elementNameNode.value;
        if (typeof elementName !== "string" || !voidElements.has(elementName)) {
          return;
        }

        const propsNode = args[1];
        if (propsNode?.type !== NodeType.ObjectExpression) {
          return;
        }

        const firstChild = args[2];
        if (firstChild) {
          // e.g. React.createElement('br', undefined, 'Foo')
          context.report({
            data: {
              element: elementName,
            },
            messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
            node,
          });
        }

        const props = propsNode.properties;

        const hasChildrenPropOrDanger = props.some((prop) => {
          if (!("key" in prop)) {
            return false;
          }
          if (!("name" in prop.key)) {
            return false;
          }

          return prop.key.name === "children" || prop.key.name === "dangerouslySetInnerHTML";
        });

        if (hasChildrenPropOrDanger) {
          // e.g. React.createElement('br', { children: 'Foo' })
          context.report({
            data: {
              element: elementName,
            },
            messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
            node,
          });
        }
      },
      JSXElement(node) {
        const openingElementNameExpression = node.openingElement.name;
        if ("name" in openingElementNameExpression) {
          const elementName = openingElementNameExpression.name;

          if (typeof elementName !== "string" || !voidElements.has(elementName)) {
            return;
          }

          if (node.children.length > 0) {
            context.report({
              data: {
                element: elementName,
              },
              messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
              node,
            });
          }

          const { attributes } = node.openingElement;

          const hasChildrenAttributeOrDanger = attributes.some((attribute) => {
            if (!("name" in attribute)) {
              return false;
            }

            return attribute.name.name === "children" || attribute.name.name === "dangerouslySetInnerHTML";
          });

          if (hasChildrenAttributeOrDanger) {
            // e.g. <br children="Foo" />
            context.report({
              data: {
                element: elementName,
              },
              messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
              node,
            });
          }
        }
      },
    };
  },
});
