import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getAttributeName } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import ts from "typescript";

export const RULE_NAME = "no-key-after-spread";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevent patterns that cause deoptimization when using the automatic JSX runtime.",
    },
    messages: {
      default: "Placing 'key' after spread props causes deoptimization when using the automatic JSX runtime. Put 'key' before any spread props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { jsx } = core.getJsxConfig(context);
  if (jsx !== ts.JsxEmit.ReactJSX && jsx !== ts.JsxEmit.ReactJSXDev) return {};
  return {
    JSXOpeningElement(node) {
      let hasSpreadBefore = false;
      for (const prop of node.attributes) {
        if (prop.type === AST.JSXSpreadAttribute) {
          hasSpreadBefore = true;
          continue;
        }
        // A 'key' after any spread prop falls back to createElement (deoptimization).
        // Namespaced names like `xml:key` never equal "key".
        if (hasSpreadBefore && getAttributeName(prop) === "key") {
          context.report({ messageId: "default", node: prop });
        }
      }
    },
  };
}
