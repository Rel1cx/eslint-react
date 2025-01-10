import { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-void-elements-with-children";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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
      description: "disallow void elements (AKA self-closing elements) from having children",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noVoidElementsWithChildren: "'{{element}}' is a void element tag and must not have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const elementName = JSX.getElementName(node.openingElement);
        if (elementName.length === 0 || !voidElements.has(elementName)) {
          return;
        }
        if (node.children.length > 0) {
          context.report({
            messageId: "noVoidElementsWithChildren",
            node,
            data: {
              element: elementName,
            },
          });
        }
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const hasAttribute = (name: string) => JSX.findPropInAttributes(name, initialScope, attributes) !== _;
        if (hasAttribute("children") || hasAttribute("dangerouslySetInnerHTML")) {
          // e.g. <br children="Foo" />
          context.report({
            messageId: "noVoidElementsWithChildren",
            node,
            data: {
              element: elementName,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
