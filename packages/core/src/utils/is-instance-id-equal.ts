/* eslint-disable jsdoc/require-param */
import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import * as AST from "@eslint-react/ast";
import * as VAR from "@eslint-react/var";

/** @internal */
export function isInstanceIdEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node) {
  return AST.isNodeEqual(a, b) || VAR.isNodeValueEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
