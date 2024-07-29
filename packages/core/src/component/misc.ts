import type { TSESTreeClass } from "@eslint-react/ast";
import { isClass } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { isClassComponent } from "./component-collector-legacy";

/**
 * Get the parent class component of a node up to global scope
 * @param node The AST node to start searching from
 * @param context The rule context
 * @returns The parent class component if found
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(node: TSESTree.Node, context: RuleContext): O.Option<TSESTreeClass> {
  let scope = context.sourceCode.getScope(node);
  while (scope.type !== ScopeType.global) {
    scope = scope.upper;
  }
  return F.pipe(
    O.fromNullable(scope),
    O.flatMapNullable(s => s.block),
    O.filter(isClass),
    O.filter(n => isClassComponent(n)),
  );
}
