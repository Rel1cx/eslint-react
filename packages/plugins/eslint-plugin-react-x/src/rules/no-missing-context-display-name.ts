import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";
import { LanguagePreference, type RuleContext, type RuleFeature, Selector as SEL } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-context-display-name";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that all contexts have a `displayName` which can be used in devtools.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
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
      if (!ER.isCreateContextCall(context, node)) return;
      createCalls.push(node);
    },
    "Program:exit"() {
      for (const call of createCalls) {
        const id = ER.getInstanceId(call);
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
            return ER.isInstanceIdEqual(context, id, object);
          });
        if (!hasDisplayNameAssignment) {
          const semi = LanguagePreference.defaultLanguagePreference.semicolons === "always"
            ? ";"
            : "";
          context.report({
            messageId: "noMissingContextDisplayName",
            node: id,
            fix(fixer) {
              if (id.type !== T.Identifier || id.parent !== call.parent) return [];
              return fixer.insertTextAfter(
                context.sourceCode.getTokenAfter(call) ?? call,
                [
                  "\n",
                  id.name,
                  ".",
                  "displayName",
                  " ",
                  "=",
                  " ",
                  JSON.stringify(id.name),
                  semi,
                ].join(""),
              );
            },
          });
        }
      }
    },
    [SEL.DISPLAY_NAME_ASSIGNMENT_EXPRESSION](node: SEL.DisplayNameAssignmentExpression) {
      displayNameAssignments.push(node);
    },
  };
}
