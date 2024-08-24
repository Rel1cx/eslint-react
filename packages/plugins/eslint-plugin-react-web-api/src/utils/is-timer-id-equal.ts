import { isNodeEqual } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import { isNodeValueEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

export function isTimerIDEqual(a: TSESTree.Node, b: TSESTree.Node, context: RuleContext) {
  const aScope = context.sourceCode.getScope(a);
  const bScope = context.sourceCode.getScope(b);
  switch (true) {
    case a.type === AST_NODE_TYPES.AssignmentExpression
      && b.type === AST_NODE_TYPES.AssignmentExpression: {
      return isNodeEqual(a.left, b.left);
    }
    default:
      return isNodeValueEqual(a, b, [aScope, bScope]);
  }
}
