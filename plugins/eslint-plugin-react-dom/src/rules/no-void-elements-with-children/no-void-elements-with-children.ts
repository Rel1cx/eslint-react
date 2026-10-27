import { createJSXElementResolver } from "@/utils/create-jsx-element-resolver";
import { createRule } from "@/utils/create-rule";
import { isChildContent } from "@/utils/is-child-content";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { hasAnyAttribute } from "@eslint-react/jsx";
import { KNOWN_VOID_ELEMENTS } from "./lib";

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
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const resolver = createJSXElementResolver(context);

  return {
    JSXElement(node) {
      const { domElementType } = resolver.resolve(node);
      if (!KNOWN_VOID_ELEMENTS.has(domElementType)) {
        return;
      }

      // Formatting whitespace and empty expression containers are omitted by
      // the JSX transform, so they do not count as children at runtime.
      const hasChild = node.children.some(isChildContent);

      // Report an error if the void element has children, a 'children' prop, or 'dangerouslySetInnerHTML'
      if (hasChild || hasAnyAttribute(node, ["children", "dangerouslySetInnerHTML"])) {
        context.report({
          data: {
            elementType: domElementType,
          },
          messageId: "default",
          node,
        });
      }
    },
  };
}
