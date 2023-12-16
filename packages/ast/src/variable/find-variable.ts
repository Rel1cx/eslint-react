import { O } from "@eslint-react/tools";
import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";

import { getVariablesUpToGlobal } from "./get-variable";

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
 * Find a variable through a list of variables by name, starting from the given scope and going up to the global scope
 * @param name The name of the variable to find
 * @param initialScope The scope to start from
 */
export function findVariableByNameUpToGlobal(name: string, initialScope: Scope): O.Option<NonNullable<Variable>> {
  return findVariableByName(name)(getVariablesUpToGlobal(initialScope));
}
