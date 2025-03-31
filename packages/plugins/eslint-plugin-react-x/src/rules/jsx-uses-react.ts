import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { JsxRuntime, type RuleContext, type RuleFeature } from "@eslint-react/kit";

import { JsxEmit } from "typescript";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks React variables as used when JSX is used in the file.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxUsesReact: "",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { jsx, jsxFactory, jsxFragmentFactory, reactNamespace } = JsxRuntime.getJsxRuntimeOptionsFromContext(context);
  // If we are using the New JSX Transform, this rule should do nothing.
  if (jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev) return {};
  return {
    JSXFragment(node) {
      context.sourceCode.markVariableAsUsed(jsxFragmentFactory, node);
    },
    JSXOpeningElement(node) {
      context.sourceCode.markVariableAsUsed(reactNamespace, node);
      context.sourceCode.markVariableAsUsed(jsxFactory, node);
    },
    JSXOpeningFragment(node) {
      context.sourceCode.markVariableAsUsed(reactNamespace, node);
      context.sourceCode.markVariableAsUsed(jsxFactory, node);
    },
  };
}
