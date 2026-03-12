import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "unstable-rules-of-props";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "noDuplicateProps"
  | "noControlledAndUncontrolledTogether";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the Rules of Props.",
    },
    messages: {
      noDuplicateProps: "Prop `{{prop}}` is specified more than once. Only the last one will take effect.",
      noControlledAndUncontrolledTogether:
        "Prop `{{controlled}}` and `{{uncontrolled}}` should not be used together. Use either controlled or uncontrolled components, not both.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

// "defaultValue" to "value"; returns null if not a valid default-prefixed prop.
function toControlledName(uncontrolledName: string): string | null {
  const [, head, tail] = /^default([A-Z])(.*)$/.exec(uncontrolledName) ?? [];
  if (head == null || tail == null) return null;
  return head.toLowerCase() + tail;
}

function getPropName(attribute: TSESTree.JSXAttribute): string {
  const { name: nameNode } = attribute;
  if (nameNode.type === AST.JSXNamespacedName) {
    return `${nameNode.namespace.name}:${nameNode.name.name}`;
  }
  return nameNode.name;
}

export function create(context: RuleContext<MessageID, []>) {
  return defineRuleListener({
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      const attributes = new Map<string, TSESTree.JSXAttribute>();

      for (const attribute of node.attributes) {
        if (attribute.type === AST.JSXSpreadAttribute) continue;

        const propName = getPropName(attribute);

        // Report duplicate props.
        if (attributes.has(propName)) {
          context.report({
            data: { prop: propName },
            messageId: "noDuplicateProps",
            node: attribute,
          });
        }

        attributes.set(propName, attribute);
      }

      // Report when both controlled and uncontrolled forms coexist.
      for (const [propName, attrNode] of attributes) {
        // Skip namespaced names for the controlled/uncontrolled check.
        if (propName.includes(":")) continue;

        const controlledProp = toControlledName(propName);
        if (controlledProp == null) continue;

        // No controlled counterpart – fine.
        if (!attributes.has(controlledProp)) continue;

        // Report on the uncontrolled (default*) attribute.
        context.report({
          data: {
            controlled: controlledProp,
            uncontrolled: propName,
          },
          messageId: "noControlledAndUncontrolledTogether",
          node: attrNode,
        });
      }
    },
  });
}
