import type { Variable } from "@typescript-eslint/scope-manager";
import { type Scope } from "@typescript-eslint/scope-manager";

import { F, MutRef, O } from "../lib/primitives";

export function findVariableByName(name: string) {
    return (variables: Variable[]): O.Option<NonNullable<Variable>> => {
        return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
    };
}

export function getVariablesUpToGlobal(startScope: Scope) {
    const scopeRef = MutRef.make(startScope);
    const variablesRef = MutRef.make(MutRef.get(scopeRef).variables);

    while (MutRef.get(scopeRef).upper) {
        MutRef.set(scopeRef, MutRef.get(scopeRef).upper);
        MutRef.update(variablesRef, (variables) => variables.concat(MutRef.get(scopeRef).variables));
    }

    return MutRef.get(variablesRef).reverse();
}

export function findVariableByNameUpToGlobal(name: string, startScope: Scope): O.Option<NonNullable<Variable>> {
    return F.pipe(getVariablesUpToGlobal(startScope), findVariableByName(name));
}

export function getVariableNthDefNodeInit(at: number) {
    return (variable: Variable) =>
        F.pipe(
            O.some(variable),
            O.flatMapNullable((v) => v.defs.at(at)),
            O.flatMapNullable((d) => d.node),
            O.flatMapNullable((n) => ("init" in n ? n.init : null)),
        );
}
