import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { ASTUtils as TSESASTUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

import { I } from "../lib/data";
import { uniqueBy } from "./unique-by";

type IsHelper<NodeType extends AST_NODE_TYPES> = (node: TSESTree.Node | null | undefined) => node is TSESTree.Node & {
    type: NodeType;
};

const isIdentifier: IsHelper<AST_NODE_TYPES.Identifier> = TSESASTUtils.isIdentifier;

const isLiteral: IsHelper<AST_NODE_TYPES.Literal> = TSESASTUtils.isNodeOfType(AST_NODE_TYPES.Literal);

const isObjectExpression: IsHelper<AST_NODE_TYPES.ObjectExpression> = TSESASTUtils.isNodeOfType(
    AST_NODE_TYPES.ObjectExpression,
);

const isProperty: IsHelper<AST_NODE_TYPES.Property> = TSESASTUtils.isNodeOfType(AST_NODE_TYPES.Property);

export const ASTUtils = {
    ...TSESASTUtils,
    findPropertyWithIdentifierKey(
        properties: TSESTree.ObjectLiteralElement[],
        key: string,
    ): TSESTree.Property | undefined {
        return properties.find((x) => ASTUtils.isPropertyWithIdentifierKey(x, key)) as TSESTree.Property | undefined;
    },
    getExternalRefs(params: {
        scopeManager: TSESLint.Scope.ScopeManager;
        sourceCode: Readonly<TSESLint.SourceCode>;
        node: TSESTree.Node;
    }): TSESLint.Scope.Reference[] {
        const { node, scopeManager, sourceCode } = params;
        const scope = scopeManager.acquire(node);

        if (I.isNullable(scope)) {
            return [];
        }

        const references = scope.references
            .filter((x) => x.isRead() && !scope.set.has(x.identifier.name))
            .map((x) => {
                const referenceNode = ASTUtils.traverseUpOnly(x.identifier, [
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
    getFunctionAncestor(context: Readonly<RuleContext<string, readonly unknown[]>>) {
        return context.getAncestors().find((x) => {
            if (ASTUtils.isNodeOfType(AST_NODE_TYPES.FunctionDeclaration)(x)) {
                return true;
            }

            return (
                ASTUtils.isNodeOfType(AST_NODE_TYPES.VariableDeclarator)(x.parent) &&
                ASTUtils.isNodeOfType(AST_NODE_TYPES.Identifier)(x.parent.id) &&
                ASTUtils.isNodeOfOneOf(x, [
                    AST_NODE_TYPES.FunctionDeclaration,
                    AST_NODE_TYPES.FunctionExpression,
                    AST_NODE_TYPES.ArrowFunctionExpression,
                ])
            );
        });
    },
    getNestedIdentifiers(node: TSESTree.Node): TSESTree.Identifier[] {
        const identifiers: TSESTree.Identifier[] = [];

        if (ASTUtils.isIdentifier(node)) {
            identifiers.push(node);
        }

        if ("arguments" in node) {
            for (const arg of node.arguments) {
                identifiers.push(...ASTUtils.getNestedIdentifiers(arg));
            }
        }

        if ("elements" in node) {
            for (const element of node.elements) {
                if (!I.isNullable(element)) {
                    identifiers.push(...ASTUtils.getNestedIdentifiers(element));
                }
            }
        }

        if ("properties" in node) {
            for (const property of node.properties) {
                identifiers.push(...ASTUtils.getNestedIdentifiers(property));
            }
        }

        if ("expressions" in node) {
            for (const expression of node.expressions) {
                identifiers.push(...ASTUtils.getNestedIdentifiers(expression));
            }
        }

        if (ASTUtils.isProperty(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.value));
        }

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.SpreadElement)(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.argument));
        }

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.object));
        }

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.UnaryExpression)(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.argument));
        }

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.ChainExpression)(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.expression));
        }

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.TSNonNullExpression)(node)) {
            identifiers.push(...ASTUtils.getNestedIdentifiers(node.expression));
        }

        return identifiers;
    },
    getNestedReturnStatements(node: TSESTree.Node): TSESTree.ReturnStatement[] {
        const returnStatements: TSESTree.ReturnStatement[] = [];

        if (ASTUtils.isNodeOfType(AST_NODE_TYPES.ReturnStatement)(node)) {
            returnStatements.push(node);
        }

        if ("body" in node && !I.isNullable(node.body)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.body)
                ? node.body.forEach((x) => {
                      returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTUtils.getNestedReturnStatements(node.body));
        }

        if ("consequent" in node) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.consequent)
                ? node.consequent.forEach((x) => {
                      returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTUtils.getNestedReturnStatements(node.consequent));
        }

        if ("alternate" in node && !I.isNullable(node.alternate)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            Array.isArray(node.alternate)
                ? node.alternate.forEach((x: TSESTree.Node) => {
                      returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTUtils.getNestedReturnStatements(node.alternate));
        }

        if ("cases" in node) {
            for (const x of node.cases) {
                returnStatements.push(...ASTUtils.getNestedReturnStatements(x));
            }
        }

        if ("block" in node) {
            returnStatements.push(...ASTUtils.getNestedReturnStatements(node.block));
        }

        if ("handler" in node && !I.isNullable(node.handler)) {
            returnStatements.push(...ASTUtils.getNestedReturnStatements(node.handler));
        }

        if ("finalizer" in node && !I.isNullable(node.finalizer)) {
            returnStatements.push(...ASTUtils.getNestedReturnStatements(node.finalizer));
        }

        if ("expression" in node && node.expression !== true && node.expression !== false) {
            returnStatements.push(...ASTUtils.getNestedReturnStatements(node.expression));
        }

        if ("test" in node && !I.isNullable(node.test)) {
            returnStatements.push(...ASTUtils.getNestedReturnStatements(node.test));
        }

        return returnStatements;
    },
    getReferencedExpressionByIdentifier(params: {
        node: TSESTree.Node;
        context: Readonly<RuleContext<string, readonly unknown[]>>;
    }) {
        const { context, node } = params;

        const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]
            ?.node;

        if (!ASTUtils.isNodeOfType(AST_NODE_TYPES.VariableDeclarator)(resolvedNode)) {
            return null;
        }

        return resolvedNode.init;
    },
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
    isIdentifier,
    isIdentifierWithName(node: TSESTree.Node, name: string): node is TSESTree.Identifier {
        return ASTUtils.isIdentifier(node) && node.name === name;
    },
    isIdentifierWithOneOfNames<T extends string[]>(
        node: TSESTree.Node,
        name: T,
    ): node is TSESTree.Identifier & { name: T[number] } {
        return ASTUtils.isIdentifier(node) && name.includes(node.name);
    },
    isLiteral,
    isNodeOfOneOf<T extends AST_NODE_TYPES>(
        node: TSESTree.Node,
        types: readonly T[],
    ): node is TSESTree.Node & { type: T } {
        return types.includes(node.type as T);
    },
    isObjectExpression,
    isProperty,
    isPropertyWithIdentifierKey(node: TSESTree.Node, key: string): node is TSESTree.Property {
        return ASTUtils.isProperty(node) && ASTUtils.isIdentifierWithName(node.key, key);
    },
    isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
        return isLiteral(node) && typeof node.value === "string";
    },
    isValidReactComponentOrHookName(identifier: TSESTree.Identifier | null) {
        // eslint-disable-next-line regexp/prefer-named-capture-group
        return (
            // eslint-disable-next-line regexp/prefer-named-capture-group
            !I.isNullable(identifier) && /^([A-Z]|use)/u.test(identifier.name)
        );
    },
    mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
        return sourceCode.getText(
            ASTUtils.traverseUpOnly(node, [AST_NODE_TYPES.MemberExpression, AST_NODE_TYPES.Identifier]),
        );
    },
    traverseUpOnly(identifier: TSESTree.Node, allowedNodeTypes: AST_NODE_TYPES[]): TSESTree.Node {
        const parent = identifier.parent;

        if (parent !== undefined && allowedNodeTypes.includes(parent.type)) {
            return ASTUtils.traverseUpOnly(parent, allowedNodeTypes);
        }

        return identifier;
    },
};
