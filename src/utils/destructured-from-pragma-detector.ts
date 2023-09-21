import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
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

        if (AST.is(AST_NODE_TYPES.VariableDeclarator)(node) && node.init) {
            const { init } = node;

            if (
                isMatching({
                    type: AST_NODE_TYPES.MemberExpression,
                    object: { name: pragma, type: AST_NODE_TYPES.Identifier },
                })(init)
            ) {
                return true;
            }

            if (
                isMatching({
                    name: pragma,
                    type: AST_NODE_TYPES.Identifier,
                })(init)
            ) {
                return true;
            }

            const maybeRequireExpression: O.Option<TSESTree.CallExpression> = match(init)
                .with({ type: AST_NODE_TYPES.CallExpression }, (exp) => O.some(exp))
                .with(
                    {
                        type: AST_NODE_TYPES.MemberExpression,
                        object: {
                            type: AST_NODE_TYPES.CallExpression,
                        },
                    },
                    ({ object }) => O.some(object),
                )
                .otherwise(O.none);

            if (O.isNone(maybeRequireExpression)) {
                return false;
            }

            const requireExpression = maybeRequireExpression.value;

            if (!AST.is(AST_NODE_TYPES.Identifier)(requireExpression.callee)) {
                return false;
            }

            const calleeName = requireExpression.callee.name;
            const firstArg = requireExpression.arguments[0];

            if (calleeName !== "require" || !AST.is(AST_NODE_TYPES.Literal)(firstArg)) {
                return false;
            }

            return firstArg.value === pragma.toLowerCase();
        }

        return isMatching({
            type: AST_NODE_TYPES.ImportDeclaration,
            source: { value: pragma.toLowerCase() },
        })(parent);
    };
}
