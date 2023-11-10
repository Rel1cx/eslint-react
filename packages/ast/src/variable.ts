import { F, MutRef, O } from "@eslint-react/tools";
import type { Definition, Variable } from "@typescript-eslint/scope-manager";
import { type Scope, ScopeType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { isNullable } from "effect/Predicate";

import { NodeType } from "./node-type";

/**
 * Find a variable through a list of variables by name
 * @param name The name of the variable to find
 */
export function findVariableByName(name: string) {
  /**
   * @param variables The variables to search through
   */
  return (variables: Variable[]): O.Option<NonNullable<Variable>> => {
    return O.fromNullable(variables.find((variable) => variable.name === name));
  };
}

/**
 * Get all variables from the given scope up to the global scope
 * @param startScope The scope to start from
 */
export function getVariablesUpToGlobal(startScope: Scope) {
  const scopeRef = MutRef.make(startScope);
  const variablesRef = MutRef.make(MutRef.get(scopeRef).variables);

  while (MutRef.get(scopeRef).type !== ScopeType.global) {
    MutRef.set(scopeRef, MutRef.get(scopeRef).upper);
    MutRef.update(variablesRef, (variables) => variables.concat(MutRef.get(scopeRef).variables));
  }

  return MutRef.get(variablesRef).reverse();
}

/**
 * Find a variable through a list of variables by name, starting from the given scope and going up to the global scope
 * @param name The name of the variable to find
 * @param startScope The scope to start from
 */
export function findVariableByNameUpToGlobal(name: string, startScope: Scope): O.Option<NonNullable<Variable>> {
  return findVariableByName(name)(getVariablesUpToGlobal(startScope));
}

export function resolveDefinitionInit(
  def: Definition,
): O.Option<TSESTree.Expression | TSESTree.LetOrConstOrVarDeclaration> {
  if ("init" in def.node && !isNullable(def.node.init)) {
    return O.some(def.node.init);
  }
  // TODO: support other types of definitions

  return O.none();
}

/**
 * Get the init node of the nth definition of a variable
 * @param at The index number of def in defs
 * @returns A function that takes a variable and returns the init node of the nth definition of that variable
 */
export function getVariableInit(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression | TSESTree.LetOrConstOrVarDeclaration> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMap(resolveDefinitionInit),
    );
  };
}

function isInitExpression(
  node:
    | TSESTree.Expression
    | TSESTree.LetOrConstOrVarDeclaration,
): node is TSESTree.Expression {
  return node.type !== NodeType.VariableDeclaration;
}

export function getVariableInitExpression(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMap(resolveDefinitionInit),
      O.filter(isInitExpression),
    );
  };
}
