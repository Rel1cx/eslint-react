import { type Scope, Variable } from "@typescript-eslint/scope-manager";

import { F, O } from "../lib/primitives/data";

export function findVariableByName(name: string) {
    return (variables: Variable[]) => {
        return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
    };
}

export function getVariablesUpToGlobal(startScope: Scope) {
    let scope = startScope;
    let variables = scope.variables;

    while (scope.upper) {
        scope = scope.upper;
        variables = scope.variables.concat(variables);
    }

    return variables;
}

export function findVariableByNameUpToGlobal(name: string, startScope: Scope) {
    return F.pipe(getVariablesUpToGlobal(startScope), findVariableByName(name));
}
