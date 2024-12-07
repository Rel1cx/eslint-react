import { getElementType } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-in-void-dom-elements";

export type MessageID = CamelCase<typeof RULE_NAME>;

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
      noChildrenInVoidDomElements: "A void DOM element '<{{element}} />' cannot have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const elementType = getElementType(node.openingElement, context);
        if (!elementType || !voidElements.has(elementType)) return;
        if (node.children.length > 0) {
          context.report({
            messageId: "noChildrenInVoidDomElements",
            node,
            data: {
              element: elementType,
            },
          });
        }
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const hasAttr = (name: string) => O.isSome(JSX.findPropInAttributes(attributes, initialScope)(name));
        const hasChildrenOrDangerAttr = hasAttr("children") || hasAttr("dangerouslySetInnerHTML");
        if (hasChildrenOrDangerAttr) {
          // e.g. <br children="Foo" />
          context.report({
            messageId: "noChildrenInVoidDomElements",
            node,
            data: {
              element: elementType,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
