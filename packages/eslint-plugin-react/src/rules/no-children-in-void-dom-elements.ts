import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, isCreateElementCall } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-in-void-dom-elements";

export type MessageID = ConstantCase<typeof RULE_NAME>;

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

        const findProp = findPropInProperties(props, context);

        const hasChildrenOrDangerProp = O.isSome(findProp("children")) || O.isSome(findProp("dangerouslySetInnerHTML"));

        if (hasChildrenOrDangerProp) {
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

          const findAttr = findPropInAttributes(attributes, context);

          const hasChildrenOrDangerAttr = O.isSome(findAttr("children"))
            || O.isSome(findAttr("dangerouslySetInnerHTML"));

          if (hasChildrenOrDangerAttr) {
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
