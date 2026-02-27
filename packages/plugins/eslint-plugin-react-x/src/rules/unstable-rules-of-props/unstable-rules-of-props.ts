import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "unstable-rules-of-props";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "noControlledAndUncontrolledTogether";

/**
 * Pairs of [controlled prop, uncontrolled prop] that must not appear together
 * on the same JSX element.
 *
 * - `value`   → controlled;   `defaultValue`   → uncontrolled
 * - `checked` → controlled;   `defaultChecked` → uncontrolled
 */
const CONTROLLED_UNCONTROLLED_PAIRS = [
  ["value", "defaultValue"],
  ["checked", "defaultChecked"],
] as const;

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
  return defineRuleListener({
    JSXOpeningElement(node) {
      const propMap = new Map<string, TSESTree.JSXAttribute>();

      for (const attr of node.attributes) {
        if (attr.type === AST.JSXSpreadAttribute) continue;
        const { name } = attr.name;
        if (typeof name !== "string") continue;
        propMap.set(name, attr);
      }

      for (const [controlled, uncontrolled] of CONTROLLED_UNCONTROLLED_PAIRS) {
        if (!propMap.has(controlled) || !propMap.has(uncontrolled)) continue;

        // Report on the uncontrolled prop node since it is the one being
        // superseded (and therefore misleading) when a controlled prop is
        // present on the same element.
        const uncontrolledAttr = propMap.get(uncontrolled);
        if (uncontrolledAttr == null) continue;

        context.report({
          data: { controlled, uncontrolled },
          messageId: "noControlledAndUncontrolledTogether",
          node: uncontrolledAttr,
        });
      }
    },
  });
}
