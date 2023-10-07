import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F } from "../lib/primitives";
import { isDestructuredFromPragma } from "./is-destructured-from-pragma";
import { getFromContext } from "./pragma";

/**
 * Determines whether `createElement` is used.
 * @param node The node to check.
 * @param context The rule context.
 * @returns `true` if the node is a call expression to `createElement`.
 */
export const isCreateElement = (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== N.CallExpression || !("callee" in node)) {
        return false;
    }

    const maybePragma = getFromContext(context);
    if (E.isLeft(maybePragma)) {
        return false;
    }

    const pragma = maybePragma.right;

    return match(node.callee)
        .with(
            {
                type: N.MemberExpression,
                object: { name: pragma },
                property: { name: "createElement" },
            },
            F.constTrue,
        )
        .with({ name: "createElement" }, ({ name }) => isDestructuredFromPragma(name, context))
        .otherwise(F.constFalse);
};
