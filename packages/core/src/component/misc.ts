import { isClass, type TSESTreeClass } from "@eslint-react/ast";
import { F, MutRef, O } from "@eslint-react/tools";
import type * as ER from "@eslint-react/types";
import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { isClassComponent } from "./component-collector-legacy";

/**
 * Get the parent class component of a node up to global scope
 * @param node The AST node to start searching from
 * @param context The rule context
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(node: TSESTree.Node, context: ER.RuleContext): O.Option<TSESTreeClass> {
  const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
  const scopeRef = MutRef.make<O.Option<Scope>>(O.fromNullable(initialScope));
  // eslint-disable-next-line functional/no-loop-statements
  while (F.pipe(MutRef.get(scopeRef), O.exists(({ type }) => type !== ScopeType.class))) {
    MutRef.update(scopeRef, O.flatMapNullable(s => s.upper));
  }

  return F.pipe(
    MutRef.get(scopeRef),
    O.flatMapNullable(s => s.block),
    O.filter(isClass),
    O.filter(node => isClassComponent(node, context)),
  );
}
