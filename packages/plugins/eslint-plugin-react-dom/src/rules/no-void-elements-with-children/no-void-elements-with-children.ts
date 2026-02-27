import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createJsxElementResolver, createRule } from "../../utils";

export const RULE_NAME = "no-void-elements-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

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
      description: "Disallows 'children' in void DOM elements.",
    },
    messages: {
      default: "'{{elementType}}' is a void element tag and must not have children.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const resolver = createJsxElementResolver(context);

  return defineRuleListener(
    {
      JSXElement(node) {
        const { domElementType } = resolver.resolve(node);
        // If the element is not a void element, do nothing
        if (!voidElements.has(domElementType)) {
          return;
        }

        const findJsxAttribute = core.getJsxAttribute(context, node);

        // Check if the element has a 'children' prop
        const hasChildrenProp = findJsxAttribute("children") != null;
        // Check if the element has a 'dangerouslySetInnerHTML' prop
        const hasDangerouslySetInnerHTML = findJsxAttribute("dangerouslySetInnerHTML") != null;

        // Report an error if the void element has children, a 'children' prop, or 'dangerouslySetInnerHTML'
        if (node.children.length > 0 || hasChildrenProp || hasDangerouslySetInnerHTML) {
          context.report({
            data: {
              elementType: domElementType,
            },
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
