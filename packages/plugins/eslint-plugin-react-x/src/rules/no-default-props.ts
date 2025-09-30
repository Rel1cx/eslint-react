import * as AST from "@eslint-react/ast";
import { isComponentNameLoose } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-default-props";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `defaultProps` property in favor of ES6 default parameters.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDefaultProps: "[Deprecated] Use ES6 default parameters instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `defaultProps` is not present in the file
  if (!context.sourceCode.text.includes("defaultProps")) return {};
  return {
    AssignmentExpression(node) {
      if (node.operator !== "=" || node.left.type !== T.MemberExpression) {
        return;
      }
      const { object, property } = node.left;
      if (object.type !== T.Identifier) {
        return;
      }
      if (property.type !== T.Identifier || property.name !== "defaultProps") {
        return;
      }
      if (!isComponentNameLoose(object.name)) {
        return;
      }
      const variable = findVariable(object.name, context.sourceCode.getScope(node));
      const variableNode = getVariableDefinitionNode(variable, 0);
      if (variableNode == null) return;
      if (!AST.isFunction(variableNode)) return;
      context.report({ messageId: "noDefaultProps", node: property });
    },
  };
}
