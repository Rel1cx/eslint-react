import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInAttributes, findPropInProperties } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Option as O } from "effect";
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
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing 'children' to void DOM elements",
    },
    messages: {
      NO_CHILDREN_IN_VOID_DOM_ELEMENTS: "A void DOM element '<{{element}} />' cannot have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type !== NodeType.MemberExpression
          && node.callee.type !== NodeType.Identifier
        ) {
          return;
        }
        const initialScope = context.sourceCode.getScope(node);
        if (!isCreateElementCall(node, context)) return;
        const args = node.arguments;
        // React.createElement() with only one argument is valid (definitely no children)
        if (args.length < 2) return;
        const elementNameNode = args[0];
        if (!elementNameNode || !("value" in elementNameNode)) return;
        const elementName = elementNameNode.value;
        if (typeof elementName !== "string" || !voidElements.has(elementName)) return;
        const propsNode = args[1];
        if (propsNode?.type !== NodeType.ObjectExpression) return;
        const firstChild = args[2];
        // e.g. React.createElement('br', undefined, 'Foo')
        if (firstChild) {
          context.report({
            data: {
              element: elementName,
            },
            messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
            node,
          });
        }
        const props = propsNode.properties;
        const findProp = findPropInProperties(props, context, initialScope);
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
          if (typeof elementName !== "string" || !voidElements.has(elementName)) return;
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
          const initialScope = context.sourceCode.getScope(node);
          const findAttr = findPropInAttributes(attributes, context, initialScope);
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
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
