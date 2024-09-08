import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function isInstanceIDEqual(a: TSESTree.Node, b: TSESTree.Node, context: RuleContext) {
  return AST.isNodeEqual(a, b)
    || VAR.isNodeValueEqual(a, b, [context.sourceCode.getScope(a), context.sourceCode.getScope(b)]);
}
