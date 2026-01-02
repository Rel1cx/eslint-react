import { type RuleContext } from "@eslint-react/shared";
import { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { isReactBuiltinHookName } from "../../../../core/src/hook";
import { createRule } from "../utils";

export const RULE_NAME = "no-react-hook-member-access";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows accessing React Hooks via the React namespace (React.use*).",
    },
    messages: {
      noReactHookMemberAccess: "Do not use {{member}}. Import the hook directly from 'react' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(
  context: RuleContext<MessageID, []>,
): RuleListener {
  return {
    MemberExpression(node: TSESTree.MemberExpression) {
      if (
        node.object.type === TSESTree.AST_NODE_TYPES.Identifier
        && node.object.name === "React"
        && !node.computed
        && node.property.type === TSESTree.AST_NODE_TYPES.Identifier
        && isReactBuiltinHookName(node.property.name)
      ) {
        context.report({
          messageId: "noReactHookMemberAccess",
          node,
          data: {
            member: `React.${node.property.name}`,
          },
        });
      }
    },
  };
}
