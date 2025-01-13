import * as AST from "@eslint-react/ast";
import { isClassComponent, isComponentName } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-default-props";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'defaultProps' property in components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDefaultProps: "[Deprecated] Use ES6 default parameters instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("defaultProps")) {
      return {};
    }
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
        if (!isComponentName(object.name)) {
          return;
        }
        const variable = VAR.findVariable(object.name, context.sourceCode.getScope(node));
        const variableNode = VAR.getVariableNode(variable, 0);
        if (variableNode == null) return;
        if (!AST.isFunction(variableNode) && !isClassComponent(variableNode)) return;
        context.report({ messageId: "noDefaultProps", node: property });
      },
      PropertyDefinition(node) {
        if (!isClassComponent(node.parent.parent)) {
          return;
        }
        if (!node.static || node.key.type !== T.Identifier || node.key.name !== "defaultProps") {
          return;
        }
        context.report({ messageId: "noDefaultProps", node });
      },
    };
  },
  defaultOptions: [],
});
