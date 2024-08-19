import { isFunction } from "@eslint-react/ast";
import { isClassComponent, isComponentName } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-default-props";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'defaultProps' property in components",
    },
    messages: {
      noDefaultProps: "[Deprecated] Use ES6 default parameters instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("defaultProps")) return {};
    return {
      AssignmentExpression(node) {
        if (node.operator !== "=" || node.left.type !== AST_NODE_TYPES.MemberExpression) return;
        const { object, property } = node.left;
        if (object.type !== AST_NODE_TYPES.Identifier) return;
        if (property.type !== AST_NODE_TYPES.Identifier || property.name !== "defaultProps") return;
        if (!isComponentName(object.name)) return;
        const isComponent = F.pipe(
          findVariable(object.name, context.sourceCode.getScope(node)),
          O.flatMap(getVariableNode(0)),
          O.exists(n => isFunction(n) || isClassComponent(n)),
        );
        if (!isComponent) return;
        context.report({ messageId: "noDefaultProps", node: property });
      },
      PropertyDefinition(node) {
        if (!isClassComponent(node.parent.parent)) return;
        if (!node.static || node.key.type !== AST_NODE_TYPES.Identifier || node.key.name !== "defaultProps") return;
        context.report({ messageId: "noDefaultProps", node });
      },
    };
  },
  defaultOptions: [],
});
