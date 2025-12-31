import { type RuleContext } from "@eslint-react/shared";
import { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-react-member-access";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows accessing React APIs via the React namespace (React.*).",
    },
    messages: {
      noReactMemberAccess:
        "Do not use React.*. Import the API directly from 'react' instead.",
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

      if(node.object.type !== TSESTree.AST_NODE_TYPES.Identifier || node.object.name !== "React")return
      if(node.computed) return
      if(node.property.type !==TSESTree.AST_NODE_TYPES.Identifier) return
      
      const memberName = node.property.name
      const fullMember = `React.${memberName}`

      context.report({
        messageId: "noReactMemberAccess",
        node,
        data: {
          member: fullMember,
        },
      });

    }
  };
}
