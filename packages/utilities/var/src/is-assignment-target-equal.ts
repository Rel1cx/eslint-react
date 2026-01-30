/* eslint-disable jsdoc/require-param */
import * as ast from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

import { isNodeValueEqual } from "./is-node-value-equal";

/** @internal */
export function isAssignmentTargetEqual(
  context: RuleContext,
  a: TSESTree.Node,
  b: TSESTree.Node,
) {
  return ast.isNodeEqual(a, b) || isNodeValueEqual(a, b, [
    context.sourceCode.getScope(a),
    context.sourceCode.getScope(b),
  ]);
}
