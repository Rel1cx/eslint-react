import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { ASTUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

import { R } from "../libs";
import { uniqueBy } from "./unique-by";

type IsHelper<NodeType extends AST_NODE_TYPES> = (node: TSESTree.Node | null | undefined) => node is TSESTree.Node & {
    type: NodeType;
};

const isIdentifier: IsHelper<AST_NODE_TYPES.Identifier> = ASTUtils.isIdentifier;

const isLiteral: IsHelper<AST_NODE_TYPES.Literal> = ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal);

const isObjectExpression: IsHelper<AST_NODE_TYPES.ObjectExpression> = ASTUtils.isNodeOfType(
    AST_NODE_TYPES.ObjectExpression,
);

const isProperty: IsHelper<AST_NODE_TYPES.Property> = ASTUtils.isNodeOfType(AST_NODE_TYPES.Property);

export const ASTHelper = {
    ...ASTUtils,
    findPropertyWithIdentifierKey(
        properties: TSESTree.ObjectLiteralElement[],
        key: string,
    ): TSESTree.Property | undefined {
        return properties.find((x) => ASTHelper.isPropertyWithIdentifierKey(x, key)) as TSESTree.Property | undefined;
    },
    getExternalRefs(params: {
        scopeManager: TSESLint.Scope.ScopeManager;
        sourceCode: Readonly<TSESLint.SourceCode>;
        node: TSESTree.Node;
    }): TSESLint.Scope.Reference[] {
        const { node, scopeManager, sourceCode } = params;
        const scope = scopeManager.acquire(node);

        if (R.isNil(scope)) {
            return [];
        }

        const references = scope.references
            .filter((x) => x.isRead() && !scope.set.has(x.identifier.name))
            .map((x) => {
                const referenceNode = ASTHelper.traverseUpOnly(x.identifier, [
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

        const externalRefs = references.filter((x) => R.isNil(x.variable.resolved) || !localRefIds.has(x.text));

        return uniqueBy(externalRefs, (x) => x.text).map((x) => x.variable);
    },
    getFunctionAncestor(context: Readonly<RuleContext<string, readonly unknown[]>>) {
        return context.getAncestors().find((x) => {
            if (x.type === AST_NODE_TYPES.FunctionDeclaration) {
                return true;
            }

            return (
                x.parent?.type === AST_NODE_TYPES.VariableDeclarator &&
                x.parent.id.type === AST_NODE_TYPES.Identifier &&
                ASTHelper.isNodeOfOneOf(x, [
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
                identifiers.push(...ASTHelper.getNestedIdentifiers(arg));
            }
        }

        if ("elements" in node) {
            for (const element of node.elements) {
                if (!R.isNil(element)) {
                    identifiers.push(...ASTHelper.getNestedIdentifiers(element));
                }
            }
        }

        if ("properties" in node) {
            for (const property of node.properties) {
                identifiers.push(...ASTHelper.getNestedIdentifiers(property));
            }
        }

        if ("expressions" in node) {
            for (const expression of node.expressions) {
                identifiers.push(...ASTHelper.getNestedIdentifiers(expression));
            }
        }

        if (node.type === AST_NODE_TYPES.Property) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.value));
        }

        if (node.type === AST_NODE_TYPES.SpreadElement) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.argument));
        }

        if (node.type === AST_NODE_TYPES.MemberExpression) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.object));
        }

        if (node.type === AST_NODE_TYPES.UnaryExpression) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.argument));
        }

        if (node.type === AST_NODE_TYPES.ChainExpression) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.expression));
        }

        if (node.type === AST_NODE_TYPES.TSNonNullExpression) {
            identifiers.push(...ASTHelper.getNestedIdentifiers(node.expression));
        }

        return identifiers;
    },
    getNestedReturnStatements(node: TSESTree.Node): TSESTree.ReturnStatement[] {
        const returnStatements: TSESTree.ReturnStatement[] = [];

        if (node.type === AST_NODE_TYPES.ReturnStatement) {
            returnStatements.push(node);
        }

        if ("body" in node && !R.isNil(node.body)) {
            Array.isArray(node.body)
                ? node.body.forEach((x) => {
                      returnStatements.push(...ASTHelper.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTHelper.getNestedReturnStatements(node.body));
        }

        if ("consequent" in node) {
            Array.isArray(node.consequent)
                ? node.consequent.forEach((x) => {
                      returnStatements.push(...ASTHelper.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTHelper.getNestedReturnStatements(node.consequent));
        }

        if ("alternate" in node && !R.isNil(node.alternate)) {
            Array.isArray(node.alternate)
                ? node.alternate.forEach((x: TSESTree.Node) => {
                      returnStatements.push(...ASTHelper.getNestedReturnStatements(x));
                  })
                : returnStatements.push(...ASTHelper.getNestedReturnStatements(node.alternate));
        }

        if ("cases" in node) {
            for (const x of node.cases) {
                returnStatements.push(...ASTHelper.getNestedReturnStatements(x));
            }
        }

        if ("block" in node) {
            returnStatements.push(...ASTHelper.getNestedReturnStatements(node.block));
        }

        if ("handler" in node && !R.isNil(node.handler)) {
            returnStatements.push(...ASTHelper.getNestedReturnStatements(node.handler));
        }

        if ("finalizer" in node && !R.isNil(node.finalizer)) {
            returnStatements.push(...ASTHelper.getNestedReturnStatements(node.finalizer));
        }

        if ("expression" in node && node.expression !== true && node.expression !== false) {
            returnStatements.push(...ASTHelper.getNestedReturnStatements(node.expression));
        }

        if ("test" in node && !R.isNil(node.test)) {
            returnStatements.push(...ASTHelper.getNestedReturnStatements(node.test));
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

        if (resolvedNode?.type !== AST_NODE_TYPES.VariableDeclarator) {
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

        if (R.isNil(scope)) {
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
        return ASTHelper.isProperty(node) && ASTHelper.isIdentifierWithName(node.key, key);
    },
    isStringLiteral(node: TSESTree.Node | null | undefined): node is TSESTree.StringLiteral {
        return isLiteral(node) && typeof node.value === "string";
    },
    isValidReactComponentOrHookName(identifier: TSESTree.Identifier | null) {
        // eslint-disable-next-line regexp/prefer-named-capture-group
        return !R.isNil(identifier) && /^([A-Z]|use)/u.test(identifier.name);
    },
    mapKeyNodeToText(node: TSESTree.Node, sourceCode: Readonly<TSESLint.SourceCode>) {
        return sourceCode.getText(
            ASTHelper.traverseUpOnly(node, [AST_NODE_TYPES.MemberExpression, AST_NODE_TYPES.Identifier]),
        );
    },
    traverseUpOnly(identifier: TSESTree.Node, allowedNodeTypes: AST_NODE_TYPES[]): TSESTree.Node {
        const parent = identifier.parent;

        if (parent !== undefined && allowedNodeTypes.includes(parent.type)) {
            return ASTHelper.traverseUpOnly(parent, allowedNodeTypes);
        }

        return identifier;
    },
};
