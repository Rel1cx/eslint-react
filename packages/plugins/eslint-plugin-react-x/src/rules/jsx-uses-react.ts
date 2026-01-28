import { JsxEmit, getJsxConfigFromAnnotation, getJsxConfigFromContext } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks React variables as used when JSX is present.",
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
  const jsxConfig = {
    ...getJsxConfigFromContext(context),
    ...getJsxConfigFromAnnotation(context),
  };

  const { jsx, jsxFactory, jsxFragmentFactory } = jsxConfig;

  // If using the new JSX transform, this rule is not needed
  if (jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev) return {};

  // Marks the JSX factory (e.g., 'React') as used when a JSX element is found
  function handleJsxElement(node: TSESTree.Node) {
    context.sourceCode.markVariableAsUsed(jsxFactory, node);
    debugReport(context, node, jsxFactory);
  }

  // Marks the JSX fragment factory (e.g., 'React.Fragment') as used when a JSX fragment is found
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
