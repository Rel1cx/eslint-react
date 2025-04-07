import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { CamelCase } from "string-ts";
import { JsxRuntime, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { JsxEmit } from "typescript";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export const debug = false;

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
  const jsxOptions = JsxRuntime.getJsxRuntimeOptions(context);
  const jsxAnnotation = JsxRuntime.getJsxRuntimeAnnotation(context);
  const jsx = jsxAnnotation.jsxRuntime === "classic"
    ? JsxEmit.React
    : jsxOptions.jsx;
  if (jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev) return {};

  const jsxFactory = jsxAnnotation.jsx ?? jsxOptions.jsxFactory;
  const jsxFragmentFactory = jsxAnnotation.jsxFrag ?? jsxOptions.jsxFragmentFactory;

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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!debug) return;
  context.report({
    messageId: "jsxUsesReact",
    node,
    data: { name },
  });
}
