import { ScopeType, Variable } from "@typescript-eslint/scope-manager";
import { type TSESLint } from "@typescript-eslint/utils";

import { O } from "../lib/primitives/data";

export function getVariable(variables: Variable[], name: string): O.Option<Variable> {
    return O.fromNullable(variables.find((variable) => "name" in variable && variable.name === name));
}

export function getVariablesInScope(context: TSESLint.RuleContext<string, unknown[]>): Variable[] {
    let scope = context.getScope();
    let variables = scope.variables;

    while (scope.type !== ScopeType.global) {
        scope = scope.upper;
        variables = scope.variables.concat(variables);
    }

    if (scope.childScopes.length) {
        variables = scope.childScopes[0]?.variables.concat(variables) ?? variables;
        if (scope.childScopes[0]?.childScopes.length) {
            variables = scope.childScopes[0]?.childScopes[0]?.variables.concat(variables) ?? variables;
        }
    }

    variables.reverse();

    return variables;
}
