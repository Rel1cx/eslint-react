import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-redundant-should-component-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

function isShouldComponentUpdate(node: TSESTree.ClassElement) {
  return ast.isMethodOrProperty(node)
    && node.key.type === AST.Identifier
    && node.key.name === "shouldComponentUpdate";
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'shouldComponentUpdate' when extending 'React.PureComponent'.",
    },
    messages: {
      default: "'{{componentName}}' does not need 'shouldComponentUpdate' when extending 'React.PureComponent'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `shouldComponentUpdate` is not present in the file
  if (!context.sourceCode.text.includes("shouldComponentUpdate")) return {};
  const { ctx, visitor } = core.useComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name = "PureComponent", flag, node: component } of ctx.getAllComponents(program)) {
          if ((flag & core.ComponentFlag.PureComponent) === 0n) {
            continue;
          }
          const { body } = component.body;
          for (const member of body) {
            if (isShouldComponentUpdate(member)) {
              context.report({
                data: {
                  componentName: name,
                },
                messageId: "default",
                node: member,
              });
            }
          }
        }
      },
    },
  );
}
