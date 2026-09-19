import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ASTUtils } from "@typescript-eslint/utils";

import type { TestRuleContext } from "./linter";
import type { parseCode } from "./parse";

/**
 * Builds a rule-context-like object whose `sourceCode.getScope` resolves
 * against the real scope manager of a parsed program. When `code` is given,
 * `sourceCode.getText` is also implemented by slicing the source text.
 */
export function createScopeContext(parsed: ReturnType<typeof parseCode>, code?: string): TestRuleContext {
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
      getText(node: TSESTree.Node) {
        if (code == null) {
          throw new Error("createScopeContext: getText requires the `code` argument");
        }
        return code.slice(node.range[0], node.range[1]);
      },
    },
  } as unknown as TestRuleContext;
}
