import { isOneOf } from "@eslint-react/ast";
import { ERClassComponentFlag, useComponentCollectorLegacy } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isShouldComponentUpdate(node: TSESTree.ClassElement) {
  return isOneOf([AST_NODE_TYPES.MethodDefinition, AST_NODE_TYPES.PropertyDefinition])(node)
    && node.key.type === AST_NODE_TYPES.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'shouldComponentUpdate' in class component extends 'React.PureComponent'",
    },
    messages: {
      noRedundantShouldComponentUpdate:
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

        for (const { name, node: component, flag } of components.values()) {
          if (!(flag & ERClassComponentFlag.PureComponent)) continue;
          const { body } = component.body;
          for (const member of body) {
            if (isShouldComponentUpdate(member)) {
              context.report({
                messageId: "noRedundantShouldComponentUpdate",
                node: member,
                data: {
                  componentName: O.getOrElse(() => "PureComponent")(name),
                },
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
