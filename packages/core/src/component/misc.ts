import type { TSESTreeClass } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { O } from "@eslint-react/tools";
import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";

import { isClassComponent } from "./component-kind";

/**
 * Get the parent class component of a node up to global scope
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(context: RuleContext): O.Option<TSESTreeClass> {
  let scope: Scope | null = context.getScope();

  // eslint-disable-next-line functional/no-loop-statements
  while (scope && scope.type !== ScopeType.class) {
    scope = scope.upper;
  }

  const node = scope?.block;

  if (!node || !isClassComponent(node, context)) {
    return O.none();
  }

  return O.some(node);
}
