import { F, MutRef, O } from "@eslint-react/tools";
import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Find a variable through a list of variables by name
 * @param name The name of the variable to find
 */
export function findVariableByName(name: string) {
  /**
   * @param variables The variables to search through
   */
  return (variables: Variable[]): O.Option<NonNullable<Variable>> => {
    return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
  };
}

/**
 * Get all variables from the given scope up to the global scope
 * @param startScope The scope to start from
 */
export function getVariablesUpToGlobal(startScope: Scope) {
  const scopeRef = MutRef.make(startScope);
  const variablesRef = MutRef.make(MutRef.get(scopeRef).variables);

  while (MutRef.get(scopeRef).upper) {
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
  return F.pipe(getVariablesUpToGlobal(startScope), findVariableByName(name));
}

/**
 * Get the init node of the nth definition of a variable
 * @param at The index of the definition to get, negative numbers are counted from the end, -1 is the last definition
 */
export function getVariableNthDefNodeInit(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression | TSESTree.LetOrConstOrVarDeclaration> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable((v) => v.defs.at(at)),
      O.flatMapNullable((d) => d.node),
      O.flatMapNullable((n) => "init" in n ? n.init : null),
    );
  };
}
