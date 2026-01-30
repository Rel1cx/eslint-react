import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
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
      description: "Disallows the 'defaultProps' property in favor of ES6 default parameters.",
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
    // Visitor for assignment expressions, e.g., `Component.defaultProps = ...`
    AssignmentExpression(node) {
      // Check if it's a simple assignment (`=`) to a member expression
      if (node.operator !== "=" || node.left.type !== AST.MemberExpression) {
        return;
      }
      const { object, property } = node.left;
      // Ensure the object being assigned to is an identifier (e.g., `Component`)
      if (object.type !== AST.Identifier) {
        return;
      }
      // Ensure the property being assigned is `defaultProps`
      if (property.type !== AST.Identifier || property.name !== "defaultProps") {
        return;
      }
      // Check if the identifier's name follows component naming conventions
      if (!core.isComponentNameLoose(object.name)) {
        return;
      }
      // Find the variable declaration corresponding to the component identifier
      const variable = findVariable(object.name, context.sourceCode.getScope(node));
      // Get the definition node of that variable
      const variableNode = getVariableDefinitionNode(variable, 0);
      // Ensure the variable is defined
      if (variableNode == null) return;
      // Ensure the variable is defined as a function, which components are
      if (!ast.isFunction(variableNode)) return;
      // If all checks pass, report the use of `defaultProps`
      context.report({ messageId: "noDefaultProps", node: property });
    },
  };
}
