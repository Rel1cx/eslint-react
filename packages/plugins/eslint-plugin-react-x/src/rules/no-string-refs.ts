import { isClassComponent } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-string-refs";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces string refs with callback refs.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noStringRefs: "[Deprecated] Use callback refs instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const state = {
    isWithinClassComponent: false,
  };

  function onClassBodyEnter(node: TSESTree.ClassBody) {
    if (isClassComponent(node.parent)) {
      state.isWithinClassComponent = true;
    }
  }

  function onClassBodyExit() {
    state.isWithinClassComponent = false;
  }

  return {
    ClassBody: onClassBodyEnter,
    "ClassBody:exit": onClassBodyExit,
    JSXAttribute(node) {
      if (node.name.name !== "ref") return;
      const refNameText = getAttributeValueText(context, node.value);
      if (refNameText == null) return;
      context.report({
        messageId: "noStringRefs",
        node,
        fix(fixer) {
          if (node.value == null) return null;
          if (!state.isWithinClassComponent) return null;
          return fixer.replaceText(node.value, `{(ref) => { this.refs[${refNameText}] = ref; }}`);
        },
      });
    },
  };
}

function getAttributeValueText(context: RuleContext, node: TSESTree.JSXAttribute["value"]) {
  if (node == null) return null;
  switch (true) {
    case node.type === T.Literal
      && typeof node.value === "string":
      return context.sourceCode.getText(node);
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.Literal
      && typeof node.expression.value === "string":
      return context.sourceCode.getText(node.expression);
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.TemplateLiteral:
      return context.sourceCode.getText(node.expression);
    default:
      return null;
  }
}
