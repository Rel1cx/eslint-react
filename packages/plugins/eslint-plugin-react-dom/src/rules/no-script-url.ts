import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";
import { RegExp as RE } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

/**
 * This rule is adapted from eslint-plugin-solid's jsx-no-script-url rule under the MIT license.
 * Thank you for your work!
 */
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `javascript:` URLs as attribute values.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noScriptUrl: "Using a `javascript:` URL is a security risk and should be avoided.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXAttribute(node) {
      if (node.name.type !== T.JSXIdentifier || node.value == null) {
        return;
      }
      const attributeValue = ER.getAttributeValue(context, node, ER.getAttributeName(context, node));
      if (attributeValue.kind === "none" || typeof attributeValue.value !== "string") return;
      if (RE.JAVASCRIPT_PROTOCOL.test(attributeValue.value)) {
        context.report({
          messageId: "noScriptUrl",
          node: node.value,
        });
      }
    },
  };
}
