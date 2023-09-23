import { AST_NODE_TYPES as N, type TSESTree } from "@typescript-eslint/utils";
import memo from "micro-memoize";
import { match } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { E, F } from "../lib/primitives";
import * as destructuredFromPragmaDetector from "./destructured-from-pragma-detector";
import { getFromContext } from "./pragma";

export const isCreateElement = memo((node: TSESTree.Node, context: RuleContext) => {
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
                type: N.MemberExpression,
                object: { name: pragma },
                property: { name: "createElement" },
            },
            F.constTrue,
        )
        .with({ name: "createElement" }, ({ name }) => isDestructured(name))
        .otherwise(F.constFalse);
});
