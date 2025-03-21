import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-void-elements-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
      description: "Disallow `children` in void DOM elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noVoidElementsWithChildren: "'{{element}}' is a void element tag and must not have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node) {
      const elementName = JSX.getElementType(node);
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
      const hasAttribute = (name: string) => JSX.hasAttribute(name, attributes, initialScope);
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
}
