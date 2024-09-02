import { isNodeEqual } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import { isNodeValueEqual } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";

export function isInstanceIDEqual(a: TSESTree.Node, b: TSESTree.Node, context: RuleContext) {
  return isNodeEqual(a, b) || isNodeValueEqual(a, b, [context.sourceCode.getScope(a), context.sourceCode.getScope(b)]);
}
