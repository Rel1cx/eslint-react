import { JsxEmit, getJsxConfig } from "@eslint-react/jsx";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-key-after-spread";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "noKeyAfterSpread";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevent patterns that cause deoptimization when using the automatic JSX runtime.",
    },
    messages: {
      noKeyAfterSpread:
        "Placing 'key' after spread props causes deoptimization when using the automatic JSX runtime. Put 'key' before any spread props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { jsx } = getJsxConfig(context);

  const isAutomaticRuntime = jsx === JsxEmit.ReactJSX || jsx === JsxEmit.ReactJSXDev;

  if (!isAutomaticRuntime) {
    return {};
  }

  return defineRuleListener({
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
        // Only check JSXIdentifier (not JSXNamespacedName like xml:key)
        if (prop.name.type === AST.JSXIdentifier && prop.name.name === "key" && index > firstSpreadPropIndex) {
          context.report({
            messageId: "noKeyAfterSpread",
            node: prop,
          });
        }
      }
    },
  });
}
