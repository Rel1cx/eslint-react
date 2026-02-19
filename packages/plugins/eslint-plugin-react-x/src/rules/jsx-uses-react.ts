import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks React variables as used when JSX is present.",
    },
    messages: {
      default: "Marked {{name}} as used.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const jsxConfig = {
    ...core.getJsxConfigFromContext(context),
    ...core.getJsxConfigFromAnnotation(context),
  };

  const { jsx, jsxFactory, jsxFragmentFactory } = jsxConfig;

  // If using the new JSX transform, this rule is not needed
  if (jsx === core.JsxEmit.ReactJSX || jsx === core.JsxEmit.ReactJSXDev) return {};

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

  return defineRuleListener(
    {
      JSXFragment: handleJsxFragment,
      JSXOpeningElement: handleJsxElement,
      JSXOpeningFragment: handleJsxElement,
    },
  );
}

function debugReport(context: RuleContext, node: TSESTree.Node, name: string) {
  if (process.env["ESLINT_REACT_DEBUG"] !== "1") return;
  context.report({
    messageId: "default",
    node,
    data: { name },
  });
}
