import { getJsxAttribute } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noImplicitKey: "Do not use implicit 'key' props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

// TODO: Rewrite the rule to use type checking
export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      // Find the 'key' prop, including those from spread attributes
      const keyProp = getJsxAttribute(context, node.parent)("key");
      // Check if the 'key' prop is explicitly defined on the element
      const isKeyPropOnElement = node.attributes
        .some((n) =>
          n.type === T.JSXAttribute
          && n.name.type === T.JSXIdentifier
          && n.name.name === "key"
        );
      // If a 'key' prop exists but is not explicitly on the element, it's implicit
      if (keyProp != null && !isKeyPropOnElement) {
        // Report an error for the implicit 'key'
        context.report({ messageId: "noImplicitKey", node: keyProp });
      }
    },
  };
}
