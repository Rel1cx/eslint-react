import { isOneOf, NodeType } from "@eslint-react/ast";
import { ERClassComponentFlag, useComponentCollectorLegacy } from "@eslint-react/core";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { O } from "@eslint-react/tools";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isShouldComponentUpdate(node: TSESTree.ClassElement) {
  return isOneOf([NodeType.MethodDefinition, NodeType.PropertyDefinition])(node)
    && node.key.type === NodeType.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of 'shouldComponentUpdate' in class component extends 'React.PureComponent'",
    },
    messages: {
      NO_REDUNDANT_SHOULD_COMPONENT_UPDATE:
        "'{{componentName}}' does not need 'shouldComponentUpdate' when extending 'React.PureComponent'.",
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

        for (const { name, flag, node: component } of components.values()) {
          if (!(flag & ERClassComponentFlag.PureComponent)) continue;
          const { body } = component.body;
          for (const member of body) {
            if (isShouldComponentUpdate(member)) {
              context.report({
                data: {
                  componentName: O.getOrElse(() => "PureComponent")(name),
                },
                messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
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
