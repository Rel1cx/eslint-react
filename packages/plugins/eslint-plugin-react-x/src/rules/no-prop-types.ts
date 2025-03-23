import * as AST from "@eslint-react/ast";
import { isClassComponent, isComponentNameLoose } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-prop-types";

export type MessageID = CamelCase<typeof RULE_NAME>;

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
  if (!context.sourceCode.text.includes("propTypes")) {
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
      if (property.type !== T.Identifier || property.name !== "propTypes") {
        return;
      }
      if (!isComponentNameLoose(object.name)) {
        return;
      }
      const variable = VAR.findVariable(object.name, context.sourceCode.getScope(node));
      const variableNode = VAR.getVariableInitNode(variable, 0);
      if (variableNode != null && (AST.isFunction(variableNode) || isClassComponent(variableNode))) {
        context.report({ messageId: "noPropTypes", node: property });
      }
    },
    PropertyDefinition(node) {
      if (!isClassComponent(node.parent.parent)) {
        return;
      }
      if (!node.static || node.key.type !== T.Identifier || node.key.name !== "propTypes") {
        return;
      }
      context.report({ messageId: "noPropTypes", node });
    },
  };
}
