import { AST_NODE_TYPES, type TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { E, F } from "../lib/primitives/data";
import * as destructuredFromPragmaDetector from "./destructured-from-pragma-detector";
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

    const isDestructured = destructuredFromPragmaDetector.make(context);

    return match(node.callee)
        .with(
            {
                type: AST_NODE_TYPES.MemberExpression,
                object: { name: pragma },
                property: { name: "createElement" },
            },
            F.constTrue,
        )

        .with({ name: "createElement" }, ({ name }) => isDestructured(name))
        .otherwise(F.constFalse);
}
