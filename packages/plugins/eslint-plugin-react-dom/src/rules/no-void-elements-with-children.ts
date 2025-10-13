import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

export const RULE_NAME = "no-void-elements-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// A set of HTML void elements that cannot have children
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
      description: "Disallow `children` in void DOM elements.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noVoidElementsWithChildren: "'{{elementType}}' is a void element tag and must not have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      // If the element is not a void element, do nothing
      if (!voidElements.has(domElementType)) {
        return;
      }

      const findJsxAttribute = getJsxAttribute(context, node);

      // Check if the element has a 'children' prop
      const hasChildrenProp = findJsxAttribute("children") != null;
      // Check if the element has a 'dangerouslySetInnerHTML' prop
      const hasDangerouslySetInnerHTML = findJsxAttribute("dangerouslySetInnerHTML") != null;

      // Report an error if the void element has children, a 'children' prop, or 'dangerouslySetInnerHTML'
      if (node.children.length > 0 || hasChildrenProp || hasDangerouslySetInnerHTML) {
        context.report({
          messageId: "noVoidElementsWithChildren",
          node,
          data: {
            elementType: domElementType,
          },
        });
      }
    },
  };
}
