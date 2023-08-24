import type TSESLintScopeManager from "@typescript-eslint/scope-manager";
import { ASTUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";

import { I } from "../lib/primitives/data";
import { uniqueBy } from "../lib/unique-by";

type IsHelper<NodeType extends AST_NODE_TYPES> = (node: TSESTree.Node | null | undefined) => node is TSESTree.Node & {
    type: NodeType;
};

const isIdentifier: IsHelper<AST_NODE_TYPES.Identifier> = ASTUtils.isIdentifier;

const isLiteral: IsHelper<AST_NODE_TYPES.Literal> = ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal);

const isObjectExpression: IsHelper<AST_NODE_TYPES.ObjectExpression> = ASTUtils.isNodeOfType(
    AST_NODE_TYPES.ObjectExpression,
);

const isProperty: IsHelper<AST_NODE_TYPES.Property> = ASTUtils.isNodeOfType(AST_NODE_TYPES.Property);

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
    getFunctionAncestor(context: Readonly<RuleContext<string, readonly unknown[]>>) {
        return context.getAncestors().find((x) => {
            if (AST.isNodeOfType(AST_NODE_TYPES.FunctionDeclaration)(x)) {
                return true;
            }

            return (
                AST.isNodeOfType(AST_NODE_TYPES.VariableDeclarator)(x.parent) &&
                AST.isNodeOfType(AST_NODE_TYPES.Identifier)(x.parent.id) &&
                AST.isNodeOfOneOf(x, [
                    AST_NODE_TYPES.FunctionDeclaration,
                    AST_NODE_TYPES.FunctionExpression,
                    AST_NODE_TYPES.ArrowFunctionExpression,
                ])
            );
        });
    },
    getNestedIdentifiers(node: TSESTree.Node): TSESTree.Identifier[] {
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

        if (AST.isProperty(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.value));
        }

        if (AST.isNodeOfType(AST_NODE_TYPES.SpreadElement)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.object));
        }

        if (AST.isNodeOfType(AST_NODE_TYPES.UnaryExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.argument));
        }

        if (AST.isNodeOfType(AST_NODE_TYPES.ChainExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        if (AST.isNodeOfType(AST_NODE_TYPES.TSNonNullExpression)(node)) {
            identifiers.push(...AST.getNestedIdentifiers(node.expression));
        }

        return identifiers;
    },
    getNestedReturnStatements(node: TSESTree.Node): TSESTree.ReturnStatement[] {
        const returnStatements: TSESTree.ReturnStatement[] = [];

        if (AST.isNodeOfType(AST_NODE_TYPES.ReturnStatement)(node)) {
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
    },
    getReferencedExpressionByIdentifier(params: {
        context: Readonly<RuleContext<string, readonly unknown[]>>;
        node: TSESTree.Node;
    }) {
        const { context, node } = params;

        const resolvedNode = context.getScope().references.find((ref) => ref.identifier === node)?.resolved?.defs[0]
            ?.node;

        if (!AST.isNodeOfType(AST_NODE_TYPES.VariableDeclarator)(resolvedNode)) {
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
        return AST.isIdentifier(node) && node.name === name;
    },
    isIdentifierWithOneOfNames<T extends string[]>(
        node: TSESTree.Node,
        name: T,
    ): node is TSESTree.Identifier & { name: T[number] } {
        return AST.isIdentifier(node) && name.includes(node.name);
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
        return AST.isProperty(node) && AST.isIdentifierWithName(node.key, key);
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
            AST.traverseUpOnly(node, [AST_NODE_TYPES.MemberExpression, AST_NODE_TYPES.Identifier]),
        );
    },
    traverseUpOnly(identifier: TSESTree.Node, allowedNodeTypes: AST_NODE_TYPES[]): TSESTree.Node {
        const parent = identifier.parent;

        if (parent !== undefined && allowedNodeTypes.includes(parent.type)) {
            return AST.traverseUpOnly(parent, allowedNodeTypes);
        }

        return identifier;
    },
};
