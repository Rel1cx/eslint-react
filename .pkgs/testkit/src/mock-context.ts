import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

import type { TestRuleContext } from "./linter";
import type { parseCode } from "./parse";

/**
 * Builds a rule-context-like object whose `sourceCode.getScope` resolves
 * against the real scope manager of a parsed program.
 */
export function createScopeContext(parsed: ReturnType<typeof parseCode>): TestRuleContext {
  const { scopeManager } = parsed;
  const globalScope = scopeManager.scopes[0]!;
  // tsl-ignore dx/no-unsafe-as
  return {
    sourceCode: {
      getScope(node: TSESTree.Node) {
        if (node.type === AST.Program) {
          return globalScope;
        }
        return ASTUtils.getInnermostScope(globalScope, node);
      },
    },
  } as unknown as TestRuleContext;
}
