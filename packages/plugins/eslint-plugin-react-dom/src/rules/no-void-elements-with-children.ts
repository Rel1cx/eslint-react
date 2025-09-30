import { hasJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createJsxElementResolver, createRule } from "../utils";

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
  const resolver = createJsxElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType: elementName } = resolver.resolve(node);
      if (!voidElements.has(elementName)) {
        return;
      }

      const { attributes } = node.openingElement;
      const initialScope = context.sourceCode.getScope(node);

      const hasChildrenProp = hasJsxAttribute(context, "children", attributes, initialScope);
      const hasDangerouslySetInnerHTML = hasJsxAttribute(context, "dangerouslySetInnerHTML", attributes, initialScope);

      if (node.children.length > 0 || hasChildrenProp || hasDangerouslySetInnerHTML) {
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
