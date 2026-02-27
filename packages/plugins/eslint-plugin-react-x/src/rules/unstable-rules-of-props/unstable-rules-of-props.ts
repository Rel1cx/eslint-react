import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "unstable-rules-of-props";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "noControlledAndUncontrolledTogether";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces the Rules of Props.",
    },
    messages: {
      noControlledAndUncontrolledTogether:
        "Prop `{{controlled}}` and `{{uncontrolled}}` should not be used together. Use either controlled or uncontrolled components, not both.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  /**
   * Pairs of [controlled prop, uncontrolled prop] that must not appear together
   * on the same JSX element.
   *
   * - `value`   → controlled;   `defaultValue`   → uncontrolled
   * - `checked` → controlled;   `defaultChecked` → uncontrolled
   */
  const pairs = [
    ["value", "defaultValue"],
    ["checked", "defaultChecked"],
  ] as const;
  return defineRuleListener({
    JSXOpeningElement(node) {
      const map = new Map<string, TSESTree.JSXAttribute>();
      for (const attr of node.attributes) {
        if (attr.type === AST.JSXSpreadAttribute) continue;
        const { name } = attr.name;
        if (typeof name !== "string") continue;
        map.set(name, attr);
      }
      // Check for controlled and uncontrolled props
      for (const [controlled, uncontrolled] of pairs) {
        if (!map.has(controlled) || !map.has(uncontrolled)) continue;
        // Report on the uncontrolled prop node since it is the one being
        // superseded (and therefore misleading) when a controlled prop is
        // present on the same element.
        const attr = map.get(uncontrolled);
        if (attr == null) continue;
        context.report({
          data: { controlled, uncontrolled },
          messageId: "noControlledAndUncontrolledTogether",
          node: attr,
        });
      }
    },
  });
}
