import { isOneOf, NodeType } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-receive-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isComponentWillUpdate(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "componentWillReceiveProps";
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of 'componentWillReceiveProps'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_COMPONENT_WILL_RECEIVE_PROPS:
        "'componentWillReceiveProps' is deprecated, use 'UNSAFE_componentWillReceiveProps' instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isComponentWillUpdate(member)) {
              context.report({
                messageId: "NO_COMPONENT_WILL_RECEIVE_PROPS",
                node: member,
              });
            }
          }
        }
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
