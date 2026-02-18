import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "error-boundaries";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "tryCatchWithJsx"
  | "tryCatchWithUse";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates usage of Error Boundaries instead of try/catch for errors in child components.",
    },
    messages: {
      tryCatchWithJsx:
        "Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.",
      tryCatchWithUse:
        "Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `try` is not present in the file
  if (!context.sourceCode.text.includes("try")) return {};

  const { ctx, visitor } = core.useComponentCollector(context);

  // Track already-reported nodes to avoid duplicate reports
  const reported = new Set<TSESTree.TryStatement>();

  return defineRuleListener(
    visitor,
    {
      CallExpression(node) {
        if (!core.isUseCall(node)) return;
        const stmt = ast.findParentNode(node, ast.is(AST.TryStatement));
        if (stmt != null && !reported.has(stmt)) {
          context.report({
            messageId: "tryCatchWithUse",
            node,
          });
          reported.add(stmt);
        }
      },
      "Program:exit"(node) {
        for (const { rets } of ctx.getAllComponents(node)) {
          for (const ret of rets) {
            if (ret == null) continue;
            const stmt = ast.findParentNode(ret, ast.is(AST.TryStatement));
            if (stmt != null && !reported.has(stmt)) {
              context.report({
                messageId: "tryCatchWithJsx",
                node: stmt,
              });
              reported.add(stmt);
            }
          }
        }
      },
    },
  );
}
