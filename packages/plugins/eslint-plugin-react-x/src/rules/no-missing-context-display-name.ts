import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import {
  DISPLAY_NAME_ASSIGNMENT_SELECTOR,
  getInstanceId,
  isCreateContextCall,
  isInstanceIdEqual,
} from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-context-display-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that all contexts have a `displayName` which can be used in devtools.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingContextDisplayName: "Add missing 'displayName' for context.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("createContext")) return {};
  // `React.createContext` calls
  const createCalls: TSESTree.CallExpression[] = [];
  // `context.displayName = ...` assignment expressions
  const displayNameAssignments: TSESTree.AssignmentExpression[] = [];
  return {
    CallExpression(node) {
      if (!isCreateContextCall(context, node)) return;
      createCalls.push(node);
    },
    [DISPLAY_NAME_ASSIGNMENT_SELECTOR](node) {
      displayNameAssignments.push(node);
    },
    "Program:exit"() {
      for (const call of createCalls) {
        const id = getInstanceId(call);
        if (id == null) {
          context.report({
            messageId: "noMissingContextDisplayName",
            node: call,
          });
          continue;
        }
        const hasDisplayNameAssignment = displayNameAssignments
          .some((node) => {
            const left = node.left;
            if (left.type !== T.MemberExpression) return false;
            const object = left.object;
            return isInstanceIdEqual(context, id, object);
          });
        if (!hasDisplayNameAssignment) {
          context.report({
            messageId: "noMissingContextDisplayName",
            node: call,
          });
        }
      }
    },
  };
}
