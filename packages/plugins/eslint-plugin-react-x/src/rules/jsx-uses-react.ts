import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { CamelCase } from "string-ts";
import {
  JsxRuntime,
  RE_JSX_ANNOTATION,
  RE_JSX_FRAG_ANNOTATION,
  type RuleContext,
  type RuleFeature,
} from "@eslint-react/kit";
import { JsxEmit } from "typescript";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-react";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export const debug = true;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Marks React variables as used when JSX is used in the file.",
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
  const { jsx, jsxFactory, jsxFragmentFactory, reactNamespace } = JsxRuntime.getJsxRuntimeOptionsFromContext(context);
  const jsxAnnotation = getJsxAnnotation(context);
  if (jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev || jsx === JsxEmit.Preserve) return {};

  function handleJsxElement(node: TSESTree.Node) {
    if (jsxAnnotation == null) {
      context.sourceCode.markVariableAsUsed(reactNamespace, node);
      context.sourceCode.markVariableAsUsed(jsxFactory, node);
      debugReport(context, node, reactNamespace);
      debugReport(context, node, jsxFactory);
    }
    if (jsxAnnotation?.jsx != null) {
      context.sourceCode.markVariableAsUsed(jsxAnnotation.jsx, node);
      debugReport(context, node, jsxAnnotation.jsx);
    }
  }

  function handleJsxFragment(node: TSESTree.Node) {
    if (jsxAnnotation == null) {
      context.sourceCode.markVariableAsUsed(jsxFragmentFactory, node);
      debugReport(context, node, jsxFragmentFactory);
    }
    if (jsxAnnotation?.jsxFrag != null) {
      context.sourceCode.markVariableAsUsed(jsxAnnotation.jsxFrag, node);
      debugReport(context, node, jsxAnnotation.jsxFrag);
    }
  }

  return {
    JSXFragment: handleJsxFragment,
    JSXOpeningElement: handleJsxElement,
    JSXOpeningFragment: handleJsxElement,
  };
}

function getJsxAnnotation(context: RuleContext) {
  if (!context.sourceCode.text.includes("@jsx")) return;
  const allComments = context.sourceCode.getAllComments();
  const jsxComment = allComments.find((n) => RE_JSX_ANNOTATION.test(n.value));
  const jsxFragComment = allComments.find((n) => RE_JSX_FRAG_ANNOTATION.test(n.value));
  const jsx = jsxComment?.value.match(RE_JSX_ANNOTATION)?.[1];
  const jsxFrag = jsxFragComment?.value.match(RE_JSX_FRAG_ANNOTATION)?.[1];
  return {
    jsx,
    jsxFrag,
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
