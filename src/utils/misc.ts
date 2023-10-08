import { isString } from "@effect/data/Predicate";
import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { isMatching } from "ts-pattern";

import { isOneOf, type TSESTreeFunction } from "./ast-types";

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

/**
 * Check if a Parameter node is a destructor parameter
 * @param node The node to check
 * @returns boolean
 */
export const isDestructorParameter: (
    node: TSESTree.Node,
) => node is TSESTree.ArrayPattern | TSESTree.AssignmentPattern | TSESTree.ObjectPattern | TSESTree.RestElement = isOneOf([
    N.ArrayPattern,
    N.AssignmentPattern,
    N.ObjectPattern,
    N.RestElement,
]);

export function isIdentifierWithName<const T extends string>(
    node: TSESTree.Node,
    name: T,
): node is TSESTree.Identifier & { name: T } {
    return node.type === N.Identifier
        && node.name === name;
}

export function isIdentifierWithOneOfNames<T extends string[]>(
    node: TSESTree.Node,
    name: T,
): node is TSESTree.Identifier & { name: T[number] } {
    return node.type === N.Identifier
        && name.includes(node.name);
}

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
    return node.type === N.Literal && "regex" in node;
}

export function isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
    return node?.type === N.Literal && isString(node.value);
}

export function isPropertyOfObjectExpression(
    node: TSESTree.Node,
): node is TSESTree.Node & { parent: TSESTree.Property } {
    return node.parent?.type === N.Property;
}

export function isPropertyWithIdentifierKey<const T extends string>(node: TSESTree.Node, key: T): node is
    & TSESTree.Property
    & {
        key:
            & TSESTree.Identifier
            & { name: T };
    }
{
    return node.type === N.Property && isIdentifierWithName(node.key, key);
}

/**
 * Unsafe check whether given node or its parent is directly inside `map` call
 * ```jsx
 * _ = <div>{items.map(item => <li />)}</div>
 * `                   ^^^^^^^^^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if node is directly inside `map` call, `false` if not
 */
export function unsafeIsMapCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
    return isMatching({
        callee: {
            property: {
                name: "map",
            },
        },
    })(node);
}

export function findPropertyWithIdentifierKey(
    properties: TSESTree.ObjectLiteralElement[],
    key: string,
) {
    return properties.find((x) => isPropertyWithIdentifierKey(x, key));
}

export function getFunctionIdentifier(node: TSESTreeFunction): TSESTree.Identifier | null {
    if (node.id) {
        return node.id;
    }

    if (isOneOf([N.ArrowFunctionExpression, N.FunctionExpression])(node)) {
        return "id" in node.parent && node.parent.id?.type === N.Identifier
            ? node.parent.id
            : null;
    }

    return null;
}
