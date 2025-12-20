import {
  JsxEmit,
  getJsxConfigFromAnnotation,
  getJsxConfigFromContext,
  getJsxElementType,
  isJsxFragmentElement,
} from "@eslint-react/core";
import { flow } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, report } from "@eslint-react/shared";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { P, match } from "ts-pattern";
import { createRule, stringify } from "../utils";

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
  const jsxConfigFromContext = getJsxConfigFromContext(context);
  const jsxConfigFromAnnotation = getJsxConfigFromAnnotation(context);
  const jsxConfig = {
    ...jsxConfigFromContext,
    ...jsxConfigFromAnnotation,
  };

  function getReportDescriptor(context: RuleContext) {
    return (node: TSESTree.JSXElement | TSESTree.JSXFragment) => ({
      messageId: "jsx",
      node,
      data: {
        json: stringify({
          kind: match(node)
            .with({ type: T.JSXElement }, (n) => isJsxFragmentElement(context, n) ? "fragment" : "element")
            .with({ type: T.JSXFragment }, () => "fragment")
            .exhaustive(),
          type: getJsxElementType(context, node),
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
  return {
    "JSXElement, JSXFragment": flow(getReportDescriptor(context), report(context)),
  };
}
