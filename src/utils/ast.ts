import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as N } from "@typescript-eslint/utils";
import memo from "micro-memoize";

import type { RuleContext } from "../../typings";
import { isNil, isString } from "../lib/primitives";
import { uniqueBy } from "../lib/unique-by";

export type FunctionNode =
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression;

export * from "@typescript-eslint/utils/ast-utils";

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export function isDeclaredInNode(params: {
    functionNode: TSESTree.Node;
    reference: TSESLintScopeManager.Reference;
    scopeManager: TSESLint.Scope.ScopeManager;
}) {
    const { functionNode, reference, scopeManager } = params;
    const scope = scopeManager.acquire(functionNode);
    if (isNil(scope)) {
        return false;
    }

    return scope.set.has(reference.identifier.name);
}

/**
 * Check if a Parameter node is a destructor parameter
 * @param node The node to check
 * @returns boolean
 */
export function isDestructorParameter(
    node: TSESTree.Parameter,
): node is TSESTree.ArrayPattern | TSESTree.AssignmentPattern | TSESTree.ObjectPattern | TSESTree.RestElement {
    return isOneOf([
        N.ArrayPattern,
        N.AssignmentPattern,
        N.ObjectPattern,
        N.RestElement,
    ])(node);
}

export function isFunctionNode(node: TSESTree.Node): node is FunctionNode {
    return isOneOf([
        N.ArrowFunctionExpression,
        N.FunctionDeclaration,
        N.FunctionExpression,
    ])(node);
}

export function isIdentifierWithName(node: TSESTree.Node, name: string): node is TSESTree.Identifier {
    return ASTUtils.isIdentifier(node) && node.name === name;
}

export function isIdentifierWithOneOfNames<T extends string[]>(
    node: TSESTree.Node,
    name: T,
): node is TSESTree.Identifier & { name: T[number] } {
    return ASTUtils.isIdentifier(node) && name.includes(node.name);
}

export function isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
    return is(N.Literal)(node) && isString(node.value);
}

export function isValidReactComponentName(identifier: TSESTree.Identifier | null) {
    return !isNil(identifier) && /^[A-Z]/u.test(identifier.name);
}

export function isValidReactHookName(identifier: TSESTree.Identifier | null) {
    return !isNil(identifier) && /^use[A-Z\d].*$/u.test(identifier.name);
}

export function isPossibleNamedReactComponent(node: TSESTree.Node): node is FunctionNode {
    return isFunctionNode(node) && isValidReactComponentName(node.id);
}

export function isPropertyOfObjectExpression(node: TSESTree.Node) {
    return (node.parent && is(N.Property)(node.parent));
}

export function isPropertyWithIdentifierKey(node: TSESTree.Node, key: string): node is TSESTree.Property {
    return is(N.Property)(node) && isIdentifierWithName(node.key, key);
}

export function findPropertyWithIdentifierKey(
    properties: TSESTree.ObjectLiteralElement[],
    key: string,
): TSESTree.Property | undefined {
    return properties.find((x) => isPropertyWithIdentifierKey(x, key)) as TSESTree.Property | undefined;
}

export function traverseUpOnly(node: TSESTree.Node, allowedNodeTypes: N[]): TSESTree.Node {
    const { parent } = node;

    if (parent !== undefined && isOneOf(allowedNodeTypes)(parent)) {
        return traverseUpOnly(parent, allowedNodeTypes);
    }

    return node;
}

export function traverseUpOnlyPredicate<T extends TSESTree.Node>(
    node: TSESTree.Node,
    predicate: (node: TSESTree.Node) => node is T,
): T | null {
    if (!node.parent || is(N.Program)(node.parent)) {
        return null;
    }

    return predicate(node.parent) ? node.parent : traverseUpOnlyPredicate(node.parent, predicate);
}

export function mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
    return sourceCode.getText(
        traverseUpOnly(node, [N.MemberExpression, N.Identifier]),
    );
}

export function getExternalRefs(params: {
    node: TSESTree.Node;
    scopeManager: TSESLint.Scope.ScopeManager;
    sourceCode: Readonly<TSESLint.SourceCode>;
}): TSESLint.Scope.Reference[] {
    const { node, scopeManager, sourceCode } = params;
    const scope = scopeManager.acquire(node);
    if (isNil(scope)) {
        return [];
    }

    const references = scope.references
        .filter((x) => x.isRead() && !scope.set.has(x.identifier.name))
        .map((x) => {
            const referenceNode = traverseUpOnly(x.identifier, [
                N.MemberExpression,
                N.Identifier,
            ]);

            return {
                node: referenceNode,
                text: sourceCode.getText(referenceNode),
                variable: x,
            };
        });
    const localRefIds = new Set([...scope.set.values()].map((x) => sourceCode.getText(x.identifiers[0])));
    const externalRefs = references.filter((x) => isNil(x.variable.resolved) || !localRefIds.has(x.text));

    return uniqueBy(externalRefs, (x) => x.text).map((x) => x.variable);
}

export function getFunctionAncestor(context: RuleContext) {
    return context.getAncestors().find((x) => {
        if (is(N.FunctionDeclaration)(x)) {
            return true;
        }

        return (
            is(N.VariableDeclarator)(x.parent)
            && is(N.Identifier)(x.parent.id)
            && isOneOf([
                N.FunctionDeclaration,
                N.FunctionExpression,
                N.ArrowFunctionExpression,
            ])(x)
        );
    });
}

export const getNestedIdentifiers = memo((node: TSESTree.Node): TSESTree.Identifier[] => {
    const identifiers: TSESTree.Identifier[] = [];

    if (is(N.Identifier)(node)) {
        identifiers.push(node);
    }

    if ("arguments" in node) {
        for (const arg of node.arguments) {
            identifiers.push(...getNestedIdentifiers(arg));
        }
    }

    if ("elements" in node) {
        for (const element of node.elements) {
            if (!isNil(element)) {
                identifiers.push(...getNestedIdentifiers(element));
            }
        }
    }

    if ("properties" in node) {
        for (const property of node.properties) {
            identifiers.push(...getNestedIdentifiers(property));
        }
    }

    if ("expressions" in node) {
        for (const expression of node.expressions) {
            identifiers.push(...getNestedIdentifiers(expression));
        }
    }

    if (is(N.Property)(node)) {
        identifiers.push(...getNestedIdentifiers(node.value));
    }

    if (is(N.SpreadElement)(node)) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (is(N.MemberExpression)(node)) {
        identifiers.push(...getNestedIdentifiers(node.object));
    }

    if (is(N.UnaryExpression)(node)) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (is(N.ChainExpression)(node)) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    if (is(N.TSNonNullExpression)(node)) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    return identifiers;
});

export const getNestedReturnStatements = memo((node: TSESTree.Node): TSESTree.ReturnStatement[] => {
    const returnStatements: TSESTree.ReturnStatement[] = [];

    if (is(N.ReturnStatement)(node)) {
        returnStatements.push(node);
    }

    if ("body" in node && !isNil(node.body)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(node.body)
            ? node.body.forEach((x) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(...getNestedReturnStatements(node.body));
    }

    if ("consequent" in node) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(node.consequent)
            ? node.consequent.forEach((x) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(...getNestedReturnStatements(node.consequent));
    }

    if ("alternate" in node && !isNil(node.alternate)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Array.isArray(node.alternate)
            ? node.alternate.forEach((x: TSESTree.Node) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(...getNestedReturnStatements(node.alternate));
    }

    if ("cases" in node) {
        for (const x of node.cases) {
            returnStatements.push(...getNestedReturnStatements(x));
        }
    }

    if ("block" in node) {
        returnStatements.push(...getNestedReturnStatements(node.block));
    }

    if ("handler" in node && !isNil(node.handler)) {
        returnStatements.push(...getNestedReturnStatements(node.handler));
    }

    if ("finalizer" in node && !isNil(node.finalizer)) {
        returnStatements.push(...getNestedReturnStatements(node.finalizer));
    }

    if ("expression" in node && node.expression !== true && node.expression !== false) {
        returnStatements.push(...getNestedReturnStatements(node.expression));
    }

    if ("test" in node && !isNil(node.test)) {
        returnStatements.push(...getNestedReturnStatements(node.test));
    }

    return returnStatements;
});

export function getReactComponentIdentifier(node: FunctionNode): TSESTree.Identifier | null {
    if (node.id) {
        return node.id;
    }

    if (is(N.FunctionDeclaration)(node)) {
        return node.id;
    }

    if (is(N.ArrowFunctionExpression)(node) || is(N.FunctionExpression)(node)) {
        return "id" in node.parent && ASTUtils.isIdentifier(node.parent.id) ? node.parent.id : null;
    }

    return null;
}

export function getReferencedExpressionByIdentifier(params: {
    context: RuleContext;
    node: TSESTree.Node;
}) {
    const { context, node } = params;

    // dprint-ignore
    const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]?.node;

    if (!is(N.VariableDeclarator)(resolvedNode)) {
        return null;
    }

    return resolvedNode.init;
}
