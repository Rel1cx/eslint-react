import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { isNil } from "rambda";

import { uniqueBy } from "../lib/unique-by";
import { traverseUpGuard } from "./ast-traverse";
import { isOneOf } from "./ast-types";

export function getExternalRefs(params: {
    node: TSESTree.Node;
    scopeManager: TSESLint.Scope.ScopeManager;
    sourceCode: Readonly<TSESLint.SourceCode>;
}): TSESLint.Scope.Reference[] {
    const { node, scopeManager, sourceCode } = params;
    const scope = scopeManager.acquire(node);
    if (!scope) {
        return [];
    }

    const references = scope.references
        .filter((x) => x.isRead() && !scope.set.has(x.identifier.name))
        .map((x) => {
            const referenceNode = traverseUpGuard(
                x.identifier,
                isOneOf([
                    N.MemberExpression,
                    N.Identifier,
                ]),
            );

            if (!referenceNode) {
                return null;
            }

            return {
                node: referenceNode,
                text: sourceCode.getText(referenceNode),
                variable: x,
            };
        })
        .filter((x) => x !== null) as {
            node: TSESTree.Node;
            text: string;
            variable: TSESLint.Scope.Reference;
        }[];
    const localRefIds = new Set([...scope.set.values()].map((x) => sourceCode.getText(x.identifiers[0])));
    const externalRefs = references.filter((x) => isNil(x.variable.resolved) || !localRefIds.has(x.text));

    return uniqueBy(externalRefs, (x) => x.text).map((x) => x.variable);
}
