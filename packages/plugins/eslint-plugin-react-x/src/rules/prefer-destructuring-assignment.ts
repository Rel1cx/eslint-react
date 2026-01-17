import { useComponentCollector } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces destructuring assignment for component props and context.",
    },
    messages: {
      preferDestructuringAssignment: "Use destructuring assignment for component props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, visitors } = useComponentCollector(context);

  return defineRuleListener(
    visitors,
    {
      "Program:exit"(program) {
        for (const component of ctx.getAllComponents(program)) {
          if (component.name == null && component.isExportDefaultDeclaration) continue;
          const [props] = component.node.params;
          if (props == null) continue;
          if (props.type !== T.Identifier) continue;
          const propName = props.name;
          const propVariable = context.sourceCode.getScope(component.node).variables.find((v) => v.name === propName);
          const propReferences = propVariable?.references ?? [];
          for (const ref of propReferences) {
            const { name, parent } = ref.identifier;
            if (parent.type !== T.MemberExpression) continue;
            context.report({
              messageId: "preferDestructuringAssignment",
              node: parent,
            });
          }
        }
      },
    },
  );
}
