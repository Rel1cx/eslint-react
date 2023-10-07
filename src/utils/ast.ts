/* eslint-disable @typescript-eslint/no-unused-expressions */
import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as N } from "@typescript-eslint/utils";
import memo from "micro-memoize";
import { isMatching } from "ts-pattern";

import type { RuleContext } from "../../typings";
import { isNil, isString } from "../lib/primitives";
import { uniqueBy } from "../lib/unique-by";

export * from "@typescript-eslint/utils/ast-utils";

export type TSESTreeFunction =
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression;

export type TSESTreeFunctionType =
    | TSESTree.TSCallSignatureDeclaration
    | TSESTree.TSConstructSignatureDeclaration
    | TSESTree.TSDeclareFunction
    | TSESTree.TSEmptyBodyFunctionExpression
    | TSESTree.TSFunctionType
    | TSESTree.TSMethodSignature
    | TSESTreeFunction;

export type TSESTreeClass = TSESTree.ClassDeclaration | TSESTree.ClassExpression;

export type TSESTreeLoop =
    | TSESTree.DoWhileStatement
    | TSESTree.ForInStatement
    | TSESTree.ForOfStatement
    | TSESTree.ForStatement
    | TSESTree.WhileStatement;

export type TSESTreeArrayTupleType = TSESTree.TSArrayType | TSESTree.TSTupleType;

export type TSESTreeProperty =
    | TSESTree.PropertyDefinition
    | TSESTree.TSIndexSignature
    | TSESTree.TSParameterProperty
    | TSESTree.TSPropertySignature;

export type TSESTreeJSX =
    | TSESTree.JSXAttribute
    | TSESTree.JSXChild
    | TSESTree.JSXClosingElement
    | TSESTree.JSXClosingFragment
    | TSESTree.JSXElement
    | TSESTree.JSXEmptyExpression
    | TSESTree.JSXExpression
    | TSESTree.JSXExpressionContainer
    | TSESTree.JSXFragment
    | TSESTree.JSXIdentifier
    | TSESTree.JSXIdentifierToken
    | TSESTree.JSXMemberExpression
    | TSESTree.JSXNamespacedName
    | TSESTree.JSXOpeningElement
    | TSESTree.JSXOpeningFragment
    | TSESTree.JSXSpreadAttribute
    | TSESTree.JSXSpreadChild
    | TSESTree.JSXTagNameExpression
    | TSESTree.JSXText
    | TSESTree.JSXTextToken;

export type TSESTreeTypeDeclaration =
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeAliasDeclaration;

export const is = ASTUtils.isNodeOfType;

export const isOneOf = ASTUtils.isNodeOfTypes;

export const isFunction = isOneOf([
    N.ArrowFunctionExpression,
    N.FunctionDeclaration,
    N.FunctionExpression,
]);

export const isFunctionType = isOneOf([
    N.ArrowFunctionExpression,
    N.FunctionDeclaration,
    N.FunctionExpression,
    N.TSCallSignatureDeclaration,
    N.TSConstructSignatureDeclaration,
    N.TSDeclareFunction,
    N.TSEmptyBodyFunctionExpression,
    N.TSFunctionType,
    N.TSMethodSignature,
]);

export const isClass = isOneOf([N.ClassDeclaration, N.ClassExpression]);

export const isLoop = isOneOf([
    N.DoWhileStatement,
    N.ForInStatement,
    N.ForOfStatement,
    N.ForStatement,
    N.WhileStatement,
]);

export const isArrayTupleType = isOneOf([N.TSArrayType, N.TSTupleType]);

export const isProperty = isOneOf([
    N.PropertyDefinition,
    N.TSIndexSignature,
    N.TSParameterProperty,
    N.TSPropertySignature,
]);

export const isJSXElement = is(N.JSXElement);

export const isJSXFragment = is(N.JSXFragment);

export const isJSX = isOneOf([
    N.JSXAttribute,
    N.JSXSpreadChild,
    N.JSXClosingElement,
    N.JSXClosingFragment,
    N.JSXElement,
    N.JSXEmptyExpression,
    N.JSXExpressionContainer,
    N.JSXFragment,
    N.JSXIdentifier,
    N.JSXMemberExpression,
    N.JSXNamespacedName,
    N.JSXOpeningElement,
    N.JSXOpeningFragment,
    N.JSXSpreadAttribute,
    N.JSXSpreadChild,
    N.JSXText,
]);

export const isTypeDeclaration = isOneOf([
    N.TSInterfaceDeclaration,
    N.TSTypeAliasDeclaration,
]);

/**
 * Determines whether node equals to another node
 * @param a node
 * @param b node
 * @returns true if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export function isNodeEqual(a: TSESTree.Node, b: TSESTree.Node): boolean {
    if (a.type !== b.type) {
        return false;
    }
    if (a.type === N.ThisExpression && b.type === N.ThisExpression) {
        return true;
    }
    if (a.type === N.Literal && b.type === N.Literal) {
        return a.value === b.value;
    }
    if (a.type === N.Identifier && b.type === N.Identifier) {
        return a.name === b.name;
    }
    if (a.type === N.MemberExpression && b.type === N.MemberExpression) {
        return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
    }

    return false;
}

export function isDeclaredInNode(params: {
    functionNode: TSESTree.Node;
    reference: TSESLintScopeManager.Reference;
    scopeManager: TSESLint.Scope.ScopeManager;
}) {
    const { functionNode, reference, scopeManager } = params;
    const scope = scopeManager.acquire(functionNode);

    return !!scope?.set.has(reference.identifier.name);
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

export function isIdentifierWithName<const T extends string>(
    node: TSESTree.Node,
    name: T,
): node is TSESTree.Identifier & { name: T } {
    return ASTUtils.isIdentifier(node) && node.name === name;
}

export function isIdentifierWithOneOfNames<T extends string[]>(
    node: TSESTree.Node,
    name: T,
): node is TSESTree.Identifier & { name: T[number] } {
    return ASTUtils.isIdentifier(node) && name.includes(node.name);
}

export const isLiteral = is(N.Literal);

export function isRegExpLiteral(node: TSESTree.Node): node is TSESTree.RegExpLiteral {
    return node.type === N.Literal && "regex" in node;
}

export function isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
    return node?.type === N.Literal && isString(node.value);
}

export function isValidReactComponentName(identifier: TSESTree.Identifier | null) {
    return !!identifier && /^[A-Z]/u.test(identifier.name);
}

export function isValidReactHookName(identifier: TSESTree.Identifier | null) {
    return !!identifier && /^use[A-Z\d].*$/u.test(identifier.name);
}

export function isPossibleNamedReactComponent(node: TSESTree.Node): node is TSESTreeFunction {
    return isFunction(node) && isValidReactComponentName(node.id);
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
 * @returns True if node is directly inside `map` call, false if not
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

/**
 * Unsafe check whether given node is `ReturnStatement` of a React hook
 * @param node The AST node to check
 * @returns True if node is a `ReturnStatement` of a React hook, false if not
 */
export function unsafeIsReturnStatementOfReactHook(node: TSESTree.Node | null): node is TSESTree.ReturnStatement {
    if (!node || !is(N.ReturnStatement)(node.parent)) {
        return false;
    }
    const callExpression = traverseUp(node, is(N.CallExpression));

    return (
        !!callExpression
        && is(N.Identifier)(callExpression.callee)
        && isValidReactHookName(callExpression.callee)
    );
}

export function findPropertyWithIdentifierKey(
    properties: TSESTree.ObjectLiteralElement[],
    key: string,
) {
    return properties.find((x) => isPropertyWithIdentifierKey(x, key));
}

export function traverseUp<T extends TSESTree.Node>(
    node: TSESTree.Node,
    predicate?: (node: TSESTree.Node) => node is T,
): T | null {
    const { parent } = node;

    if (!parent || parent.type === N.Program) {
        return null;
    }

    return predicate?.(parent) ? parent : traverseUp(parent, predicate);
}

export function mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
    const upperNode = traverseUp(node, isOneOf([N.MemberExpression, N.Identifier]));

    return upperNode ? sourceCode.getText(upperNode) : null;
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
            const referenceNode = traverseUp(
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

export function getFunctionIdentifier(node: TSESTreeFunction): TSESTree.Identifier | null {
    if (node.id) {
        return node.id;
    }

    if (isOneOf([N.ArrowFunctionExpression, N.FunctionExpression])(node)) {
        return "id" in node.parent && ASTUtils.isIdentifier(node.parent.id) ? node.parent.id : null;
    }

    return null;
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

    if (ASTUtils.isIdentifier(node)) {
        identifiers.push(node);
    }

    if ("arguments" in node) {
        node.arguments.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if ("elements" in node) {
        node.elements.forEach((x) => {
            if (x !== null) {
                identifiers.push(...getNestedIdentifiers(x));
            }
        });
    }

    if ("properties" in node) {
        node.properties.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if ("expressions" in node) {
        node.expressions.forEach((x) => {
            identifiers.push(...getNestedIdentifiers(x));
        });
    }

    if (node.type === N.Property) {
        identifiers.push(...getNestedIdentifiers(node.value));
    }

    if (node.type === N.SpreadElement) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === N.MemberExpression) {
        identifiers.push(...getNestedIdentifiers(node.object));
    }

    if (node.type === N.UnaryExpression) {
        identifiers.push(...getNestedIdentifiers(node.argument));
    }

    if (node.type === N.ChainExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    if (node.type === N.TSNonNullExpression) {
        identifiers.push(...getNestedIdentifiers(node.expression));
    }

    return identifiers;
});

export const getNestedReturnStatements = memo((node: TSESTree.Node): TSESTree.ReturnStatement[] => {
    const returnStatements: TSESTree.ReturnStatement[] = [];

    if (node.type === N.ReturnStatement) {
        returnStatements.push(node);
    }

    if ("body" in node && !isNil(node.body)) {
        Array.isArray(node.body)
            ? node.body.forEach((x) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(
                ...getNestedReturnStatements(node.body),
            );
    }

    if ("consequent" in node) {
        Array.isArray(node.consequent)
            ? node.consequent.forEach((x) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(
                ...getNestedReturnStatements(node.consequent),
            );
    }

    if ("alternate" in node && node.alternate !== null) {
        Array.isArray(node.alternate)
            ? node.alternate.forEach((x: TSESTree.Node) => {
                returnStatements.push(...getNestedReturnStatements(x));
            })
            : returnStatements.push(
                ...getNestedReturnStatements(node.alternate),
            );
    }

    if ("cases" in node) {
        node.cases.forEach((x) => {
            returnStatements.push(...getNestedReturnStatements(x));
        });
    }

    if ("block" in node) {
        returnStatements.push(...getNestedReturnStatements(node.block));
    }

    if ("handler" in node && node.handler !== null) {
        returnStatements.push(...getNestedReturnStatements(node.handler));
    }

    if ("finalizer" in node && node.finalizer !== null) {
        returnStatements.push(
            ...getNestedReturnStatements(node.finalizer),
        );
    }

    if (
        "expression" in node
        && node.expression !== true
        && node.expression !== false
    ) {
        returnStatements.push(
            ...getNestedReturnStatements(node.expression),
        );
    }

    if ("test" in node && node.test !== null) {
        returnStatements.push(...getNestedReturnStatements(node.test));
    }

    return returnStatements;
});

export function getReferencedExpressionByIdentifier(params: {
    context: RuleContext;
    node: TSESTree.Node;
}) {
    const { context, node } = params;

    // dprint-ignore
    const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]?.node;

    if (resolvedNode?.type !== N.VariableDeclarator) {
        return null;
    }

    return resolvedNode.init;
}
