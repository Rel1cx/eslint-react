import * as AST from "@eslint-react/ast";
import { isClassComponent, isComponentNameLoose } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-prop-types";

export type MessageID = CamelCase<typeof RULE_NAME>;

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

// TODO: Add suggestion-fix to replace propTypes with TypeScript types
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `propTypes` in favor of TypeScript or another type-checking solution.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noPropTypes: "[Deprecated] Use TypeScript or another type-checking solution instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `propTypes` is not present in the file for performance
  if (!context.sourceCode.text.includes("propTypes")) {
    return {};
  }
  return {
    // Handles cases like: `MyComponent.propTypes = ...`
    AssignmentExpression(node) {
      // Ensure it's a simple assignment expression
      if (node.operator !== "=" || node.left.type !== T.MemberExpression) {
        return;
      }
      const { object, property } = node.left;
      // Ensure the assignment is to a property of an identifier (e.g., `MyComponent.propTypes`)
      if (object.type !== T.Identifier) {
        return;
      }
      // Ensure the property being assigned is `propTypes`
      if (property.type !== T.Identifier || property.name !== "propTypes") {
        return;
      }
      // Check if the identifier's name looks like a component
      if (!isComponentNameLoose(object.name)) {
        return;
      }
      // Find the variable declaration for the component
      const variable = findVariable(object.name, context.sourceCode.getScope(node));
      const variableNode = getVariableDefinitionNode(variable, 0);
      // If the variable is a function or class component, report the usage of propTypes
      if (variableNode != null && (AST.isFunction(variableNode) || isClassComponent(variableNode))) {
        context.report({ messageId: "noPropTypes", node: property });
      }
    },
    // Handles cases like: `static propTypes = ...` within a class component
    PropertyDefinition(node) {
      // Ensure this property is defined within a class component
      if (!isClassComponent(node.parent.parent)) {
        return;
      }
      // Ensure it is a static property named `propTypes`
      if (!node.static || node.key.type !== T.Identifier || node.key.name !== "propTypes") {
        return;
      }
      // Report the usage of propTypes
      context.report({ messageId: "noPropTypes", node });
    },
  };
}
