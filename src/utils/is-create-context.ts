import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { F, isObject } from "../lib/primitives";
import * as AST from "./ast";

export function isCreateContext(node: TSESTree.Node) {
    if ("init" in node) {
        return match(node.init)
            .with({ type: N.CallExpression, callee: { name: "createContext" } }, F.constTrue)
            .with(
                { callee: { type: N.MemberExpression, property: { name: "createContext" } } },
                F.constTrue,
            )
            .otherwise(F.constFalse);
    }

    if (
        "expression" in node
        && isObject(node.expression)
        && AST.is(N.AssignmentExpression)(node.expression)
        && node.expression.operator === "="
    ) {
        return match(node.expression.right)
            .with({ type: N.CallExpression, callee: { name: "createContext" } }, F.constTrue)
            .with(
                { callee: { type: N.MemberExpression, property: { name: "createContext" } } },
                F.constTrue,
            )
            .otherwise(F.constFalse);
    }

    return false;
}
