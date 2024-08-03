import { findPropInAttributes, getElementType } from "@eslint-react/jsx";
import { decodeSettings, expandSettings } from "@eslint-react/shared";
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

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use the void element internally
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
    const { components, polymorphicPropName } = expandSettings(decodeSettings(context.settings));
    return {
      JSXElement(node) {
        const openingElementNameExpression = node.openingElement;
        const elementType = getElementType(context, components, polymorphicPropName)(openingElementNameExpression);
        if (!elementType || !voidElements.has(elementType)) return;
        if (node.children.length > 0) {
          context.report({
            data: {
              element: elementType,
            },
            messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
            node,
          });
        }
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const hasAttr = (name: string) => O.isSome(findPropInAttributes(attributes, context, initialScope)(name));
        const hasChildrenOrDangerAttr = hasAttr("children") || hasAttr("dangerouslySetInnerHTML");
        if (hasChildrenOrDangerAttr) {
          // e.g. <br children="Foo" />
          context.report({
            data: {
              element: elementType,
            },
            messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
