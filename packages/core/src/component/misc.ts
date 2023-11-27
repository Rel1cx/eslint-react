import { isClass, type TSESTreeClass } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { F, MutRef, O } from "@eslint-react/tools";
import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";

import { isClassComponent } from "./component-kind";

/**
 * Get the parent class component of a node up to global scope
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(context: RuleContext): O.Option<TSESTreeClass> {
  const scope = MutRef.make<O.Option<Scope>>(O.fromNullable(context.getScope()));

  // eslint-disable-next-line functional/no-loop-statements
  while (F.pipe(MutRef.get(scope), O.exists(({ type }) => type !== ScopeType.class))) {
    MutRef.update(scope, O.flatMapNullable(s => s.upper));
  }

  return F.pipe(
    MutRef.get(scope),
    O.flatMapNullable(s => s.block),
    O.filter(isClass),
    O.filter(node => isClassComponent(node, context)),
  );
}
