import * as JSX from "@eslint-react/jsx";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
      const initialScope = context.sourceCode.getScope(node);
      const keyPropFound = JSX.getAttribute("key", node.attributes, initialScope);
      const keyPropOnElement = node.attributes
        .some((n) =>
          n.type === T.JSXAttribute
          && n.name.type === T.JSXIdentifier
          && n.name.name === "key"
        );
      if (keyPropFound != null && !keyPropOnElement) {
        context.report({ messageId: "noImplicitKey", node: keyPropFound });
      }
    },
  };
}
