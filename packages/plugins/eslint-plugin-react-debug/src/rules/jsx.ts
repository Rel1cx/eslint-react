import * as core from "@eslint-react/core";
import { flow } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, report } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, match } from "ts-pattern";
import { createRule, stringify } from "../utils";

const { JsxEmit } = core;

export const RULE_NAME = "jsx";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all JSX elements and fragments in JSON format.",
    },
    messages: {
      default: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const jsxConfigFromContext = core.getJsxConfigFromContext(context);
  const jsxConfigFromAnnotation = core.getJsxConfigFromAnnotation(context);
  const jsxConfig = {
    ...jsxConfigFromContext,
    ...jsxConfigFromAnnotation,
  };

  function getReportDescriptor(context: RuleContext) {
    return (node: TSESTree.JSXElement | TSESTree.JSXFragment) => ({
      messageId: "default",
      node,
      data: {
        json: stringify({
          kind: match(node)
            .with(
              { type: AST.JSXElement },
              (n) => core.isJsxFragmentElement(context, n, jsxConfig) ? "fragment" : "element",
            )
            .with({ type: AST.JSXFragment }, () => "fragment")
            .exhaustive(),
          type: core.getJsxElementType(context, node),
          jsx: match(jsxConfig.jsx)
            .with(JsxEmit.None, () => "none")
            .with(JsxEmit.ReactJSX, () => "react-jsx")
            .with(JsxEmit.ReactJSXDev, () => "react-jsx-dev")
            .with(JsxEmit.React, () => "react")
            .with(JsxEmit.ReactNative, () => "react-native")
            .with(JsxEmit.Preserve, () => "preserve")
            .otherwise(() => "unknown"),
          jsxFactory: jsxConfig.jsxFactory,
          jsxFragmentFactory: jsxConfig.jsxFragmentFactory,
          jsxImportSource: jsxConfig.jsxImportSource,
          jsxRuntime: match(jsxConfig.jsx)
            .with(P.union(JsxEmit.None, JsxEmit.ReactJSX, JsxEmit.ReactJSXDev), () => "automatic")
            .otherwise(() => "classic"),
        }),
      },
    } as const);
  }
  return defineRuleListener(
    {
      "JSXElement, JSXFragment": flow(getReportDescriptor(context), report(context)),
    },
  );
}
