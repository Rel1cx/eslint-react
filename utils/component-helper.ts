import { AST_NODE_TYPES, TSESLint, type TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { E } from "../lib/data";
import { getFromContext } from "./pragma-helper";

// eslint-disable-next-line filenames-simple/named-export
export function isES6Component(node: TSESTree.Node, context: TSESLint.RuleContext<string, unknown[]>): boolean {
    if (!("superClass" in node) || !node.superClass) {
        return false;
    }

    const maybePragma = getFromContext(context);

    if (E.isLeft(maybePragma)) {
        return false;
    }

    const pragma = maybePragma.right;

    const { superClass } = node;

    return match(superClass)
        .with({ name: P.string, type: AST_NODE_TYPES.Identifier }, ({ name }) => /^(Pure)?Component$/u.test(name))
        .with(
            {
                type: AST_NODE_TYPES.MemberExpression,
                object: { name: pragma },
                property: { name: P.string },
            },
            ({ property }) => /^(Pure)?Component$/u.test(property.name),
        )
        .otherwise(() => false);
}
