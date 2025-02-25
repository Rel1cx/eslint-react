import type { RuleContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function isInstanceIdEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node) {
  return VAR.isVariableIdEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
