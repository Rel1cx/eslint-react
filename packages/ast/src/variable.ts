import { F, MutRef, O } from "@eslint-react/tools";
import type { Definition, Variable } from "@typescript-eslint/scope-manager";
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
 * Get the first definition of a variable
 * @param variable The variable to get the definition from
 */
export function getVariableDefinitionFirst(variable: Variable): O.Option<Definition> {
  return O.fromNullable(variable.defs[0]);
}

/**
 * Get the last definition of a variable
 * @param variable The variable to get the definition from
 */
export function getVariableDefinitionLast(variable: Variable): O.Option<Definition> {
  return O.fromNullable(variable.defs[variable.defs.length - 1]);
}

/**
 * Get the init node of the nth definition of a variable
 * @param variable
 * @param getDefinition A function that returns the nth definition of a variable
 */
export function getVariableInit(
  variable: Variable,
  getDefinition: (variable: Variable) => O.Option<Definition>,
): O.Option<TSESTree.Expression | TSESTree.LetOrConstOrVarDeclaration> {
  return F.pipe(
    O.some(variable),
    O.flatMap(getDefinition),
    O.flatMapNullable((d) => d.node),
    O.flatMapNullable((n) => "init" in n ? n.init : null),
  );
}

/**
 * Get the init node of the first definition of a variable
 * @param variable
 */
export function getVariableInitFirst(variable: Variable) {
  return getVariableInit(variable, getVariableDefinitionFirst);
}

/**
 * Get the init node of the last definition of a variable
 * @param variable
 */
export function getVariableInitLast(variable: Variable) {
  return getVariableInit(variable, getVariableDefinitionLast);
}
