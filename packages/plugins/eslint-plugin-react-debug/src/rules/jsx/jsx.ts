import * as ast from "@eslint-react/ast";
import { JsxEmit, getElementType, getJsxConfig, isFragmentElement } from "@eslint-react/jsx";
import { type RuleContext, type RuleFeature, defineRuleListener, report } from "@eslint-react/shared";
import { flow } from "@local/eff";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { P, match } from "ts-pattern";

import { createRule, stringify } from "../../utils";

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
  const jsxConfig = getJsxConfig(context);

  function getReportDescriptor(context: RuleContext) {
    return (node: ast.TSESTreeJSXElementLike) => ({
      data: {
        json: stringify({
          kind: match(node)
            .with(
              { type: AST.JSXElement },
              (n) => isFragmentElement(n, jsxConfig.jsxFragmentFactory) ? "fragment" : "element",
            )
            .with({ type: AST.JSXFragment }, () => "fragment")
            .exhaustive(),
          type: getElementType(node),
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
      messageId: "default",
      node,
    } as const);
  }
  return defineRuleListener(
    {
      "JSXElement, JSXFragment": flow(getReportDescriptor(context), report(context)),
    },
  );
}
