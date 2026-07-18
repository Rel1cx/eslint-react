import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import type { TestRuleContext } from "./linter";
import type { parseCode } from "./parse";

/**
 * Builds a rule-context-like object whose `sourceCode.getScope` resolves
 * against the real scope manager of a parsed program.
 */
export function createScopeContext(parsed: ReturnType<typeof parseCode>): TestRuleContext {
  const { scopeManager } = parsed;
  // tsl-ignore dx/no-unsafe-as
  return {
    sourceCode: {
      getScope(node: TSESTree.Node) {
        const inner = node.type !== AST.Program;
        for (let current: TSESTree.Node | undefined = node; current != null; current = current.parent) {
          const scope = scopeManager.acquire(current, inner);
          if (scope != null) {
            return scope.type === "function-expression-name"
              ? scope.childScopes[0]
              : scope;
          }
        }
        return scopeManager.scopes[0];
      },
    },
  } as unknown as TestRuleContext;
}
