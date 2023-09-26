import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as N } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import memo from "micro-memoize";

import { isNil, isString } from "../lib/primitives";
import { uniqueBy } from "../lib/unique-by";

export type FunctionNode =
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression;

export const AST = {
    ...ASTUtils,
    findPropertyWithIdentifierKey(properties: TSESTree.ObjectLiteralElement[], key: string): TSESTree.Property | undefined {
        return properties.find((x) => AST.isPropertyWithIdentifierKey(x, key)) as TSESTree.Property | undefined;
    },
    getExternalRefs(params: {
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
                const referenceNode = AST.traverseUpOnly(x.identifier, [
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
    },
    getFunctionAncestor(context: Readonly<RuleContext<string, readonly []>>) {
        return context.getAncestors().find((x) => {
            if (AST.is(N.FunctionDeclaration)(x)) {
                return true;
            }

            return (
                AST.is(N.VariableDeclarator)(x.parent)
                && AST.is(N.Identifier)(x.parent.id)
                && AST.isOneOf([
                    N.FunctionDeclaration,
                    N.FunctionExpression,
                    N.ArrowFunctionExpression,
                ])(x)
            );
        });
    },
    getNestedIdentifiers: memo((node: TSESTree.Node): TSESTree.Identifier[] => {
        const identifiers: TSESTree.Identifier[] = [];

        if (AST.isIdentifier(node)) {
            identifiers.push(node);
        }

        if ("arguments" in node) {
            for (const arg of node.arguments) {
                identifiers.push(...AST.getNestedIdentifiers(arg));
            }
        }

        if ("elements" in node) {
            for (const element of node.elements) {
                if (!isNil(element)) {
                    identifiers.push(...AST.getNestedIdentifiers(element));
                }
            }
        }

        if ("properties" in node) {
            for (const property of node.properties) {
                identifiers.push(...AST.getNestedIdentifiers(property));
            }
        }

        if ("expressions" in node) {
            for (const expression of node.expressions) {
                identifiers.push(...AST.getNestedIdentifiers(expression));
            }
        }

        if (AST.is(N.Property)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.value));
        }

        if (AST.is(N.SpreadElement)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.is(N.MemberExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.object));
        }

        if (AST.is(N.UnaryExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.is(N.ChainExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        if (AST.is(N.TSNonNullExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        return identifiers;
    }),
    getNestedReturnStatements: memo((node: TSESTree.Node): TSESTree.ReturnStatement[] => {
        const returnStatements: TSESTree.ReturnStatement[] = [];

        if (AST.is(N.ReturnStatement)(node)) {
            returnStatements.push(node);
        }

        if ("body" in node && !isNil(node.body)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.body)
                ? node.body.forEach((x) => {
                    returnStatements.push(...AST.getNestedReturnStatements(x));
                })
                : returnStatements.push(...AST.getNestedReturnStatements(node.body));
        }

        if ("consequent" in node) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.consequent)
                ? node.consequent.forEach((x) => {
                    returnStatements.push(...AST.getNestedReturnStatements(x));
                })
                : returnStatements.push(...AST.getNestedReturnStatements(node.consequent));
        }

        if ("alternate" in node && !isNil(node.alternate)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.alternate)
                ? node.alternate.forEach((x: TSESTree.Node) => {
                    returnStatements.push(...AST.getNestedReturnStatements(x));
                })
                : returnStatements.push(...AST.getNestedReturnStatements(node.alternate));
        }

        if ("cases" in node) {
            for (const x of node.cases) {
                returnStatements.push(...AST.getNestedReturnStatements(x));
            }
        }

        if ("block" in node) {
            returnStatements.push(...AST.getNestedReturnStatements(node.block));
        }

        if ("handler" in node && !isNil(node.handler)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.handler));
        }

        if ("finalizer" in node && !isNil(node.finalizer)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.finalizer));
        }

        if ("expression" in node && node.expression !== true && node.expression !== false) {
            returnStatements.push(...AST.getNestedReturnStatements(node.expression));
        }

        if ("test" in node && !isNil(node.test)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.test));
        }

        return returnStatements;
    }),
    getReactComponentIdentifier(node: FunctionNode): TSESTree.Identifier | null {
        if (node.id) {
            return node.id;
        }

        if (AST.is(N.FunctionDeclaration)(node)) {
            return node.id;
        }

        if (AST.is(N.ArrowFunctionExpression)(node) || AST.is(N.FunctionExpression)(node)) {
            return "id" in node.parent && AST.isIdentifier(node.parent.id) ? node.parent.id : null;
        }

        return null;
    },
    getReferencedExpressionByIdentifier(params: {
        context: Readonly<RuleContext<string, readonly []>>;
        node: TSESTree.Node;
    }) {
        const { context, node } = params;

        // dprint-ignore
        const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]?.node;

        if (!AST.is(N.VariableDeclarator)(resolvedNode)) {
            return null;
        }

        return resolvedNode.init;
    },
    is: ASTUtils.isNodeOfType,
    isDeclaredInNode(params: {
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
    },
    isDestructorParameter(
        node: TSESTree.Parameter,
    ): node is TSESTree.ArrayPattern | TSESTree.AssignmentPattern | TSESTree.ObjectPattern | TSESTree.RestElement {
        return AST.isOneOf([
            N.ArrayPattern,
            N.AssignmentPattern,
            N.ObjectPattern,
            N.RestElement,
        ])(node);
    },
    isFunctionNode(node: TSESTree.Node): node is FunctionNode {
        return AST.isOneOf([
            N.ArrowFunctionExpression,
            N.FunctionDeclaration,
            N.FunctionExpression,
        ])(node);
    },
    isIdentifierWithName(node: TSESTree.Node, name: string): node is TSESTree.Identifier {
        return AST.isIdentifier(node) && node.name === name;
    },
    isIdentifierWithOneOfNames<T extends string[]>(
        node: TSESTree.Node,
        name: T,
    ): node is TSESTree.Identifier & { name: T[number] } {
        return AST.isIdentifier(node) && name.includes(node.name);
    },
    isOneOf: ASTUtils.isNodeOfTypes,
    isPossibleNamedReactComponent(node: TSESTree.Node): node is FunctionNode {
        return AST.isFunctionNode(node) && AST.isValidReactComponentName(node.id);
    },
    isPropertyOfObjectExpression(node: TSESTree.Node) {
        return (node.parent && AST.is(N.Property)(node.parent));
    },
    isPropertyWithIdentifierKey(node: TSESTree.Node, key: string): node is TSESTree.Property {
        return AST.is(N.Property)(node) && AST.isIdentifierWithName(node.key, key);
    },
    isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
        return AST.is(N.Literal)(node) && isString(node.value);
    },
    isValidReactComponentName(identifier: TSESTree.Identifier | null) {
        return !isNil(identifier) && /^[A-Z]/u.test(identifier.name);
    },
    isValidReactHookName(identifier: TSESTree.Identifier | null) {
        return !isNil(identifier) && /^use[A-Z\d].*$/u.test(identifier.name);
    },
    mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
        return sourceCode.getText(
            AST.traverseUpOnly(node, [N.MemberExpression, N.Identifier]),
        );
    },
    traverseUpOnly(node: TSESTree.Node, allowedNodeTypes: N[]): TSESTree.Node {
        const { parent } = node;

        if (parent !== undefined && AST.isOneOf(allowedNodeTypes)(parent)) {
            return AST.traverseUpOnly(parent, allowedNodeTypes);
        }

        return node;
    },
    traverseUpOnlyPredicate<T extends TSESTree.Node>(
        node: TSESTree.Node,
        predicate: (node: TSESTree.Node) => node is T,
    ): T | null {
        if (!node.parent || AST.is(N.Program)(node.parent)) {
            return null;
        }

        return predicate(node.parent) ? node.parent : AST.traverseUpOnlyPredicate(node.parent, predicate);
    },
} as const;
