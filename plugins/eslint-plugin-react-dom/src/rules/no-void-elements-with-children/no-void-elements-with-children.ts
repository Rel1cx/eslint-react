import { createJsxElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { hasAnyAttribute } from "@eslint-react/jsx";
import { VOID_ELEMENTS } from "./lib";

export const RULE_NAME = "no-void-elements-with-children";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

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

  return merge(
    {
      JSXElement(node) {
        const { domElementType } = resolver.resolve(node);
        // If the element is not a void element, do nothing
        if (!VOID_ELEMENTS.has(domElementType)) {
          return;
        }

        // Report an error if the void element has children, a 'children' prop, or 'dangerouslySetInnerHTML'
        if (node.children.length > 0 || hasAnyAttribute(context, node, ["children", "dangerouslySetInnerHTML"])) {
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
