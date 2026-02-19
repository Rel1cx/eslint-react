import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "prefer-destructuring-assignment";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces destructuring assignment for component props and context.",
    },
    messages: {
      default: "Use destructuring assignment for component props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { ctx, visitor } = core.useComponentCollector(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const component of ctx.getAllComponents(program)) {
          if (component.name == null || component.isExportDefaultDeclaration) continue;
          const [props] = component.node.params;
          if (props == null) continue;
          if (props.type !== AST.Identifier) continue;
          const propName = props.name;
          const propVariable = context.sourceCode.getScope(component.node).variables.find((v) => v.name === propName);
          const propReferences = propVariable?.references ?? [];
          for (const ref of propReferences) {
            const { parent } = ref.identifier;
            if (parent.type !== AST.MemberExpression) continue;
            context.report({
              messageId: "default",
              node: parent,
            });
          }
        }
      },
    },
  );
}
