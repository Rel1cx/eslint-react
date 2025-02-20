import { DISPLAY_NAME_ASSIGNMENT_SELECTOR, isCreateContextCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-context-display-name";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'displayName' for contexts.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingContextDisplayName: "Add missing 'displayName' for context.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("createContext")) return {};
    const contexts = new Set<TSESTree.CallExpression>();
    const displayNameAssignments = new Set<TSESTree.AssignmentExpression>();
    return {
      CallExpression(node) {
        if (!isCreateContextCall(node, context)) return;
        contexts.add(node);
      },
      [DISPLAY_NAME_ASSIGNMENT_SELECTOR](node) {
        displayNameAssignments.add(node);
      },
      "Program:exit"() {
        for (const ctx of contexts) {
          const id = VAR.getVariableId(ctx);
          if (id == null) {
            context.report({
              messageId: "noMissingContextDisplayName",
              node: ctx,
            });
            continue;
          }
          const hasDisplayNameAssignment = [...displayNameAssignments].some((node) => {
            const left = node.left;
            if (left.type !== T.MemberExpression) return false;
            const object = left.object;
            return VAR.isVariableIdEqual(id, object, [
              context.sourceCode.getScope(id),
              context.sourceCode.getScope(object),
            ]);
          });
          if (!hasDisplayNameAssignment) {
            context.report({
              messageId: "noMissingContextDisplayName",
              node: ctx,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
