import { isOneOf, NodeType } from "@eslint-react/ast";
import { useComponentCollectorLegacy } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-mount";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isUnsafeComponentWillMount(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "UNSAFE_componentWillMount";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of 'UNSAFE_componentWillMount'",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_UNSAFE_COMPONENT_WILL_MOUNT: "Do not use 'UNSAFE_componentWillMount'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useComponentCollectorLegacy();

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node: component } of components.values()) {
          const { body } = component.body;

          for (const member of body) {
            if (isUnsafeComponentWillMount(member)) {
              context.report({
                messageId: "NO_UNSAFE_COMPONENT_WILL_MOUNT",
                node: member,
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
