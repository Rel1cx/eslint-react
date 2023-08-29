import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";

import { F, O } from "../lib/primitives/data";

export function findVariableByName(name: string) {
    return (variables: Variable[]) => {
        return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
    };
}

export function getVariablesUpToGlobal(startScope: Scope) {
    const scopeRef = {
        current: startScope,
    };

    const variablesRef = {
        current: startScope.variables,
    };

    while (scopeRef.current.upper) {
        scopeRef.current = scopeRef.current.upper;
        variablesRef.current = variablesRef.current.concat(scopeRef.current.variables);
    }

    return variablesRef.current.reverse();
}

export function findVariableByNameUpToGlobal(name: string, startScope: Scope) {
    return F.pipe(getVariablesUpToGlobal(startScope), findVariableByName(name));
}
