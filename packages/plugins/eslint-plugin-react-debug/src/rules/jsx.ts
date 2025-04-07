import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as JSX from "@eslint-react/jsx";
import { JsxConfig, type RuleContext, type RuleFeature } from "@eslint-react/kit";
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
      jsx:
        "[jsx {{type}}] jsx: '{{jsx}}', jsxFactory: '{{jsxFactory}}', jsxFragmentFactory: '{{jsxFragmentFactory}}', jsxRuntime: '{{jsxRuntime}}' jsxImportSource: '{{jsxImportSource}}'",
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

  const getDescriptor = (type: string) => ({
    messageId: "jsx",
    data: {
      type,
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
    },
  } as const);

  return {
    JSXElement(node) {
      const isFragment = JSX.isFragmentElement(node);
      context.report({
        ...getDescriptor(isFragment ? "fragment" : "element"),
        node,
      });
    },
    JSXFragment(node) {
      context.report({
        ...getDescriptor("fragment"),
        node,
      });
    },
  };
}
