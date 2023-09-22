import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ASTUtils } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import memo from "micro-memoize";

import { I } from "../lib/primitives/data";
import { uniqueBy } from "../lib/unique-by";

export type FunctionNode =
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression;

export const AST = {
    ...ASTUtils,
    findPropertyWithIdentifierKey(
        properties: TSESTree.ObjectLiteralElement[],
        key: string,
    ): TSESTree.Property | undefined {
        return properties.find((x) => AST.isPropertyWithIdentifierKey(x, key)) as TSESTree.Property | undefined;
    },
    getExternalRefs(params: {
        node: TSESTree.Node;
        scopeManager: TSESLint.Scope.ScopeManager;
        sourceCode: Readonly<TSESLint.SourceCode>;
    }): TSESLint.Scope.Reference[] {
        const { node, scopeManager, sourceCode } = params;
        const scope = scopeManager.acquire(node);

        if (I.isNullable(scope)) {
            return [];
        }

        const references = scope.references
            .filter((x) => x.isRead() && !scope.set.has(x.identifier.name))
            .map((x) => {
                const referenceNode = AST.traverseUpOnly(x.identifier, [
                    AST_NODE_TYPES.MemberExpression,
                    AST_NODE_TYPES.Identifier,
                ]);

                return {
                    node: referenceNode,
                    text: sourceCode.getText(referenceNode),
                    variable: x,
                };
            });

        const localRefIds = new Set([...scope.set.values()].map((x) => sourceCode.getText(x.identifiers[0])));

        const externalRefs = references.filter((x) => I.isNullable(x.variable.resolved) || !localRefIds.has(x.text));

        return uniqueBy(externalRefs, (x) => x.text).map((x) => x.variable);
    },
    getFunctionAncestor(context: Readonly<RuleContext<string, readonly []>>) {
        return context.getAncestors().find((x) => {
            if (AST.is(AST_NODE_TYPES.FunctionDeclaration)(x)) {
                return true;
            }

            return (
                AST.is(AST_NODE_TYPES.VariableDeclarator)(x.parent)
                && AST.is(AST_NODE_TYPES.Identifier)(x.parent.id)
                && AST.isOneOf([
                    AST_NODE_TYPES.FunctionDeclaration,
                    AST_NODE_TYPES.FunctionExpression,
                    AST_NODE_TYPES.ArrowFunctionExpression,
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
                if (!I.isNullable(element)) {
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

        if (AST.is(AST_NODE_TYPES.Property)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.value));
        }

        if (AST.is(AST_NODE_TYPES.SpreadElement)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.is(AST_NODE_TYPES.MemberExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.object));
        }

        if (AST.is(AST_NODE_TYPES.UnaryExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.is(AST_NODE_TYPES.ChainExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        if (AST.is(AST_NODE_TYPES.TSNonNullExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        return identifiers;
    }),
    getNestedReturnStatements: memo((node: TSESTree.Node): TSESTree.ReturnStatement[] => {
        const returnStatements: TSESTree.ReturnStatement[] = [];

        if (AST.is(AST_NODE_TYPES.ReturnStatement)(node)) {
            returnStatements.push(node);
        }

        if ("body" in node && !I.isNullable(node.body)) {
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

        if ("alternate" in node && !I.isNullable(node.alternate)) {
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

        if ("handler" in node && !I.isNullable(node.handler)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.handler));
        }

        if ("finalizer" in node && !I.isNullable(node.finalizer)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.finalizer));
        }

        if ("expression" in node && node.expression !== true && node.expression !== false) {
            returnStatements.push(...AST.getNestedReturnStatements(node.expression));
        }

        if ("test" in node && !I.isNullable(node.test)) {
            returnStatements.push(...AST.getNestedReturnStatements(node.test));
        }

        return returnStatements;
    }),
    getReferencedExpressionByIdentifier(params: {
        context: Readonly<RuleContext<string, readonly []>>;
        node: TSESTree.Node;
    }) {
        const { context, node } = params;

        const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]
            ?.node;

        if (!AST.is(AST_NODE_TYPES.VariableDeclarator)(resolvedNode)) {
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

        if (I.isNullable(scope)) {
            return false;
        }

        return scope.set.has(reference.identifier.name);
    },
    isDestructorParameter(
        node: TSESTree.Parameter,
    ): node is TSESTree.ArrayPattern | TSESTree.AssignmentPattern | TSESTree.ObjectPattern | TSESTree.RestElement {
        return AST.isOneOf([
            AST_NODE_TYPES.ArrayPattern,
            AST_NODE_TYPES.AssignmentPattern,
            AST_NODE_TYPES.ObjectPattern,
            AST_NODE_TYPES.RestElement,
        ])(node);
    },
    isFunctionNode(node: TSESTree.Node): node is FunctionNode {
        return AST.isOneOf([
            AST_NODE_TYPES.ArrowFunctionExpression,
            AST_NODE_TYPES.FunctionDeclaration,
            AST_NODE_TYPES.FunctionExpression,
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
    isPropertyWithIdentifierKey(node: TSESTree.Node, key: string): node is TSESTree.Property {
        return AST.is(AST_NODE_TYPES.Property)(node) && AST.isIdentifierWithName(node.key, key);
    },
    isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
        return AST.is(AST_NODE_TYPES.Literal)(node) && I.isString(node.value);
    },
    isValidReactComponentName(identifier: TSESTree.Identifier | null) {
        return !I.isNullable(identifier) && /^[A-Z]/u.test(identifier.name);
    },
    isValidReactComponentOrHookName(identifier: TSESTree.Identifier | null) {
        return !I.isNullable(identifier) && /^([A-Z]|use)/u.test(identifier.name);
    },
    mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
        return sourceCode.getText(
            AST.traverseUpOnly(node, [AST_NODE_TYPES.MemberExpression, AST_NODE_TYPES.Identifier]),
        );
    },
    traverseUpOnly(identifier: TSESTree.Node, allowedNodeTypes: AST_NODE_TYPES[]): TSESTree.Node {
        const { parent } = identifier;

        if (parent !== undefined && AST.isOneOf(allowedNodeTypes)(parent)) {
            return AST.traverseUpOnly(parent, allowedNodeTypes);
        }

        return identifier;
    },
};
