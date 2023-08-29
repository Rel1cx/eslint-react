import { AST_NODE_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { E, F } from "../lib/primitives/data";
import { getFromContext } from "./pragma";

export function isCreateElement(node: TSESTree.Node, context: TSESLint.RuleContext<string, []>): boolean {
    if (!("callee" in node)) {
        return false;
    }

    const maybePragma = getFromContext(context);

    if (E.isLeft(maybePragma)) {
        return false;
    }

    const pragma = maybePragma.right;

    return (
        match(node.callee)
            .with(
                {
                    type: AST_NODE_TYPES.MemberExpression,
                    object: { name: pragma },
                    property: { name: "createElement" },
                },
                F.constTrue,
            )
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            .with({ name: "createElement" }, () => isDestructuredFromPragmaImport("createElement", context))
            .otherwise(F.constFalse)
    );
}

function isDestructuredFromPragmaImport(arg0: string, context: unknown): boolean {
    // TODO: Implement this function
    throw new Error("Function not implemented.");
}
