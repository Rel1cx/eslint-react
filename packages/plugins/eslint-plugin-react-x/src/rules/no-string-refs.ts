import { isClassComponent } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
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
    // Tracks whether the current traversal is within a class component
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
      // Check if the attribute is 'ref'
      if (node.name.name !== "ref") return;
      // Get the text value of the ref attribute
      const refName = getJsxAttributeValueText(context, node.value);
      if (refName == null) return;
      // Report an issue if a string ref is found
      context.report({
        messageId: "noStringRefs",
        node,
        // Provides a fix to replace the string ref with a callback ref
        fix(fixer) {
          if (node.value == null) return null;
          // The fix is only applied within class components
          if (!state.isWithinClassComponent) return null;
          return fixer.replaceText(node.value, `{(ref) => { this.refs[${refName}] = ref; }}`);
        },
      });
    },
  };
}

/**
 * Extracts the text content from a JSX attribute's value
 * @param context - The rule context
 * @param node - The JSX attribute value node
 * @returns The text of the attribute value, or null if not a string-like value
 */
function getJsxAttributeValueText(context: RuleContext, node: TSESTree.JSXAttribute["value"]) {
  if (node == null) return null;
  switch (true) {
    // Handles string literals like ref="myRef".
    case node.type === T.Literal
      && typeof node.value === "string":
      return context.sourceCode.getText(node);
    // Handles expressions with string literals like ref={"myRef"}.
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.Literal
      && typeof node.expression.value === "string":
      return context.sourceCode.getText(node.expression);
    // Handles template literals like ref={`myRef`}.
    case node.type === T.JSXExpressionContainer
      && node.expression.type === T.TemplateLiteral:
      return context.sourceCode.getText(node.expression);
    default:
      return null;
  }
}
