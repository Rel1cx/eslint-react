import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { isMatching, match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F, O } from "../lib/primitives/data";
import { AST } from "./ast";
import { getFromContext } from "./pragma";
import { findVariableByName, getVariablesUpToGlobal } from "./variable";

export function make<T extends RuleContext>(context: T) {
    const maybePragma = getFromContext(context);
    const variables = getVariablesUpToGlobal(context.getScope());

    if (E.isLeft(maybePragma)) {
        return F.constFalse;
    }

    const pragma = maybePragma.right;

    return (variableName: string): boolean => {
        const maybeLatestDef = F.pipe(
            findVariableByName(variableName)(variables),
            O.flatMapNullable((variable) => variable.defs.at(-1)),
        );

        if (O.isNone(maybeLatestDef)) {
            return false;
        }

        const latestDef = maybeLatestDef.value;
        const { node, parent } = latestDef;

        if (AST.is(N.VariableDeclarator)(node) && node.init) {
            const { init } = node;
            // dprint-ignore
            if (
                isMatching({
                    type: N.MemberExpression,
                    object: { name: pragma, type: N.Identifier },
                })(init)
            ) {
                return true;
            }

            if (isMatching({ name: pragma, type: N.Identifier })(init)) {
                return true;
            }

            const maybeRequireExpression: O.Option<TSESTree.CallExpression> = match(init)
                .with({ type: N.CallExpression }, (exp) => O.some(exp))
                .with(
                    {
                        type: N.MemberExpression,
                        object: {
                            type: N.CallExpression,
                        },
                    },
                    ({ object }) => O.some(object),
                )
                .otherwise(O.none);
            if (O.isNone(maybeRequireExpression)) {
                return false;
            }

            const requireExpression = maybeRequireExpression.value;
            if (!AST.is(N.Identifier)(requireExpression.callee)) {
                return false;
            }

            const calleeName = requireExpression.callee.name;
            const firstArg = requireExpression.arguments[0];
            if (calleeName !== "require" || !AST.is(N.Literal)(firstArg)) {
                return false;
            }

            return firstArg.value === pragma.toLowerCase();
        }

        return isMatching({
            type: N.ImportDeclaration,
            source: { value: pragma.toLowerCase() },
        })(parent);
    };
}
