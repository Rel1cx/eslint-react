/* eslint-disable jsdoc/require-param */
import * as AST from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { isNodeValueEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

/** @internal */
export function isInstanceIdEqual(context: RuleContext, a: TSESTree.Node, b: TSESTree.Node) {
  return AST.isNodeEqual(a, b) || isNodeValueEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
