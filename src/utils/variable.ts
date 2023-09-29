import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";

import { F, MutRef, O } from "../lib/primitives";

/**
 * @param name The name of the variable to find
 */
export function findVariableByName(name: string) {
    return (variables: Variable[]): O.Option<NonNullable<Variable>> => {
        return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
    };
}

/**
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
 * @param name The name of the variable to find
 * @param startScope The scope to start from
 */
export function findVariableByNameUpToGlobal(name: string, startScope: Scope): O.Option<NonNullable<Variable>> {
    return F.pipe(getVariablesUpToGlobal(startScope), findVariableByName(name));
}

/**
 * @param at The index of the definition to get, negative numbers are counted from the end, -1 is the last definition
 */
export function getVariableNthDefNodeInit(at: number) {
    return (variable: Variable) =>
        F.pipe(
            O.some(variable),
            O.flatMapNullable((v) => v.defs.at(at)),
            O.flatMapNullable((d) => d.node),
            O.flatMapNullable((n) => ("init" in n ? n.init : null)),
        );
}
