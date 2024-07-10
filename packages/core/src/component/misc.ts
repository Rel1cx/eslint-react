import type { TSESTreeClass } from "@eslint-react/ast";
import { isClass } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { Scope } from "@typescript-eslint/scope-manager";
import { ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { Function as F, MutableRef as MutRef, Option as O } from "effect";

import { isClassComponent } from "./component-collector-legacy";

/**
 * Get the parent class component of a node up to global scope
 * @param node The AST node to start searching from
 * @param context The rule context
 * @returns The parent class component if found
 * @deprecated It will be removed in the future
 */
export function getParentClassComponent(node: TSESTree.Node, context: RuleContext): O.Option<TSESTreeClass> {
  const initialScope = context.sourceCode.getScope(node);
  const scopeRef = MutRef.make<O.Option<Scope>>(O.fromNullable(initialScope));
  while (F.pipe(MutRef.get(scopeRef), O.exists(({ type }) => type !== ScopeType.class))) {
    MutRef.update(scopeRef, O.flatMapNullable(s => s.upper));
  }

  return F.pipe(
    MutRef.get(scopeRef),
    O.flatMapNullable(s => s.block),
    O.filter(isClass),
    O.filter(node => isClassComponent(node)),
  );
}
