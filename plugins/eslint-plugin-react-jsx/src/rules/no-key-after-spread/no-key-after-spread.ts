import { createRule } from "@/utils/create-rule";
import { Check } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAttribute } from "@eslint-react/jsx";
import { dropWhile, not } from "@local/eff";
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
  // Fast-path: if 'key=' is not in the source code, skip the rule.
  if (!context.sourceCode.text.includes("key=")) return {};
  const { jsx } = core.getJsxConfig(context);
  if (jsx !== ts.JsxEmit.ReactJSX && jsx !== ts.JsxEmit.ReactJSXDev) return {};
  const isJsxSpreadAttribute = Check.is(AST.JSXSpreadAttribute);
  return {
    JSXOpeningElement(node) {
      // A 'key' after any spread prop falls back to createElement (deoptimization).
      for (const n of dropWhile(node.attributes, not(isJsxSpreadAttribute)).filter(isAttribute("key"))) {
        context.report({ messageId: "default", node: n });
      }
    },
  };
}
