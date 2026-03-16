import { JsxEmit, JsxInspector } from "@eslint-react/jsx";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "runtime";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "noNamespace"
  | "noDeoptimization";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces JSX runtime related rules including namespace restrictions and deoptimization prevention.",
    },
    messages: {
      noDeoptimization:
        "Placing 'key' after spread props causes deoptimization when using the automatic JSX runtime. Put 'key' before any spread props.",
      noNamespace: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const jsxInspector = JsxInspector.from(context);
  const { jsx } = jsxInspector.jsxConfig;

  const isAutomaticRuntime = jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev;

  return defineRuleListener({
    JSXElement(node) {
      const name = jsxInspector.getElementType(node);
      if (typeof name !== "string" || !name.includes(":")) {
        return;
      }
      context.report({
        data: {
          name,
        },
        messageId: "noNamespace",
        node: node.openingElement.name,
      });
    },
    ...(isAutomaticRuntime
      ? {
        JSXOpeningElement(node) {
          let firstSpreadPropIndex: null | number = null;
          for (const [index, prop] of node.attributes.entries()) {
            if (prop.type === AST.JSXSpreadAttribute) {
              firstSpreadPropIndex ??= index;
              continue;
            }
            if (firstSpreadPropIndex == null) {
              continue;
            }
            // If a 'key' prop is found after a spread prop, it causes deoptimization
            if (prop.name.name === "key" && index > firstSpreadPropIndex) {
              context.report({
                messageId: "noDeoptimization",
                node: prop,
              });
            }
          }
        },
      }
      : {}),
  });
}
