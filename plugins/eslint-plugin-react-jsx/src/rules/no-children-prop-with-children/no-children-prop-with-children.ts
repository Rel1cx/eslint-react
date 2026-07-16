import { createRule } from "@/utils/create-rule";
import { Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { findAttribute, hasChildren } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-children-prop-with-children";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "removeChildrenContent"
  | "removeChildrenProp";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows passing 'children' as a prop when children are also passed as nested content.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Do not pass 'children' as a prop when the element already has children content.",
      removeChildrenContent: "Remove the nested children content.",
      removeChildrenProp: "Remove the 'children' prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      if (!core.isCreateElementCall(context, node)) return;

      const [, propsArg, firstExtra] = node.arguments;
      if (propsArg == null) return;

      const propsObject = Extract.unwrap(propsArg);
      if (propsObject.type !== AST.ObjectExpression) return;

      let childrenProp: TSESTree.Property | null = null;
      for (const prop of propsObject.properties) {
        if (prop.type === AST.Property && Extract.getStaticPropertyName(prop) === "children") {
          childrenProp = prop;
          break;
        }
      }
      if (childrenProp == null) return;

      // `createElement(type, props, ...children)` treats arguments after the
      // props object as children content; without them there is no conflict
      if (firstExtra == null) return;

      context.report({
        messageId: "default",
        node: childrenProp,
      });
    },
    JSXElement(node) {
      const childrenProp = findAttribute(context, node, "children");
      if (childrenProp == null) return;
      if (!hasChildren(node)) return;

      // If children comes from a spread attribute we cannot safely remove
      // just the `children` key from it, so report without suggestions.
      if (childrenProp.type !== AST.JSXAttribute) {
        context.report({ messageId: "default", node: childrenProp });
        return;
      }

      context.report({
        messageId: "default",
        node: childrenProp,
        suggest: [
          {
            fix(fixer) {
              // Expand the removal range to also cover whitespace before the prop
              let start = childrenProp.range[0];
              const end = childrenProp.range[1];
              while (start > 0 && /\s/.test(context.sourceCode.text[start - 1] ?? "")) start--;
              return fixer.removeRange([start, end]);
            },
            messageId: "removeChildrenProp",
          },
          {
            fix(fixer) {
              const first = node.children.at(0);
              const last = node.children.at(-1);
              if (first == null || last == null) return [];
              return fixer.removeRange([first.range[0], last.range[1]]);
            },
            messageId: "removeChildrenContent",
          },
        ],
      });
    },
  };
}
