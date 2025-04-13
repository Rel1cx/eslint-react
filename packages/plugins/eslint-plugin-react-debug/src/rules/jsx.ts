import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { flow } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import { JsxConfig, Report, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";
import { JsxEmit } from "typescript";
import { createRule } from "../utils";

export const RULE_NAME = "jsx";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all JSX elements and fragments.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsx: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const jsxConfigFromContext = JsxConfig.getFromContext(context);
  const jsxConfigFromAnnotation = JsxConfig.getFromAnnotation(context);
  const jsxConfig = {
    ...jsxConfigFromContext,
    ...jsxConfigFromAnnotation,
  };

  function getReportDescriptor(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    return {
      messageId: "jsx",
      node,
      data: {
        json: JSON.stringify({
          type: match(node)
            .with({ type: T.JSXElement }, (n) => JSX.isFragmentElement(n) ? "fragment" : "element")
            .with({ type: T.JSXFragment }, () => "fragment")
            .exhaustive(),
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
    } as const;
  }
  return {
    "JSXElement, JSXFragment": flow(getReportDescriptor, Report.make(context).send),
  };
}
