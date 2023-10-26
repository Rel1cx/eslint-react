import { uniqueBy } from "@eslint-react/tools";
import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { isNil } from "rambda";

import { NodeType } from "./node-types";
import { isOneOf } from "./node-types";
import { traverseUpGuard } from "./traverse";

export function isDeclaredInNode({
    functionNode,
    reference,
    scopeManager,
}: {
    functionNode: TSESTree.Node;
    reference: TSESLintScopeManager.Reference;
    scopeManager: TSESLint.Scope.ScopeManager;
}) {
    const scope = scopeManager.acquire(functionNode);

    return !!scope?.set.has(reference.identifier.name);
}

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
                    NodeType.MemberExpression,
                    NodeType.Identifier,
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
