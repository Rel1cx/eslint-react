import { isFunction, NodeType } from "@eslint-react/ast";
import { isClassComponent, isComponentName } from "@eslint-react/core";
import { F, O } from "@eslint-react/tools";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-prop-types";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'propTypes' property in components",
    },
    messages: {
      NO_PROP_TYPES: "[Deprecated] Use TypeScript or another type-checking solution instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      AssignmentExpression(node) {
        if (node.operator !== "=" || node.left.type !== NodeType.MemberExpression) return;
        const { object, property } = node.left;
        if (object.type !== NodeType.Identifier) return;
        if (property.type !== NodeType.Identifier || property.name !== "propTypes") return;
        if (!isComponentName(object.name)) return;
        const isComponent = F.pipe(
          findVariable(object.name, context.sourceCode.getScope(node)),
          O.flatMap(getVariableNode(0)),
          O.exists(n => isFunction(n) || isClassComponent(n)),
        );
        if (!isComponent) return;
        context.report({ messageId: "NO_PROP_TYPES", node: property });
      },
      PropertyDefinition(node) {
        if (node.parent.type !== NodeType.ClassBody || !isClassComponent(node.parent.parent)) return;
        if (!node.static || node.key.type !== NodeType.Identifier || node.key.name !== "propTypes") return;
        context.report({ messageId: "NO_PROP_TYPES", node });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
