import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { CamelCase } from "string-ts";
import { JsxRuntimeConfig, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { JsxEmit } from "typescript";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks React variables as used when JSX is used.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxUsesReact: "Marked {{name}} as used.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const jsxRuntimeConfig = {
    ...JsxRuntimeConfig.getFromContext(context),
    ...JsxRuntimeConfig.getFromAnnotation(context),
  };

  const { jsx, jsxFactory, jsxFragmentFactory } = jsxRuntimeConfig;

  if (jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev) return {};

  function handleJsxElement(node: TSESTree.Node) {
    context.sourceCode.markVariableAsUsed(jsxFactory, node);
    debugReport(context, node, jsxFactory);
  }

  function handleJsxFragment(node: TSESTree.Node) {
    context.sourceCode.markVariableAsUsed(jsxFragmentFactory, node);
    debugReport(context, node, jsxFragmentFactory);
  }

  return {
    JSXFragment: handleJsxFragment,
    JSXOpeningElement: handleJsxElement,
    JSXOpeningFragment: handleJsxElement,
  };
}

function debugReport(context: RuleContext, node: TSESTree.Node, name: string) {
  if (process.env["ESLINT_REACT_DEBUG"] !== "1") return;
  context.report({
    messageId: "jsxUsesReact",
    node,
    data: { name },
  });
}
