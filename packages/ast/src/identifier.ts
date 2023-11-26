import { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { isOneOf, NodeType, type TSESTreeClass, type TSESTreeFunction } from "./node-type";

/**
 * Checks if a node is an identifier with a given name
 * @param node The AST node
 * @param name The name
 * @returns `true if the node is an identifier with the given name
 */
export function isIdentifierWithName<const T extends string>(
  node: TSESTree.Node,
  name: T,
): node is TSESTree.Identifier & { name: T } {
  return node.type === NodeType.Identifier
    && node.name === name;
}

/**
 * Checks if a node is an identifier with one of names
 * @param node The AST node
 * @param name The name
 * @returns `true` if the node is an identifier with one of names
 */
export function isIdentifierWithOneOfNames<T extends string[]>(
  node: TSESTree.Node,
  name: T,
): node is TSESTree.Identifier & { name: T[number] } {
  return node.type === NodeType.Identifier
    && name.includes(node.name);
}

/**
 * Gets FunctionDeclaration's identifier or FunctionExpression's parent identifier if it exists
 * @param node The AST node to check
 * @returns function identifier or null
 */
export function getFunctionIdentifier(node: TSESTreeFunction): O.Option<TSESTree.Identifier> {
  if (node.id) {
    return O.fromNullable(node.id);
  }

  if (isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(node)) {
    return "id" in node.parent && node.parent.id?.type === NodeType.Identifier
      ? O.fromNullable(node.parent.id)
      : O.none();
  }

  return O.none();
}

/**
 * Gets class identifier from ClassDeclaration or ClassExpression
 * @param node The AST node to check
 * @returns class identifier or null
 */
export function getClassIdentifier(node: TSESTreeClass): O.Option<TSESTree.Identifier> {
  return match(node)
    .with({ type: NodeType.ClassDeclaration }, (x) => O.fromNullable(x.id))
    .with({
      type: NodeType.ClassExpression,
      parent: { id: { type: NodeType.Identifier }, type: NodeType.VariableDeclarator },
    }, (x) => O.fromNullable(x.parent.id))
    .otherwise(O.none);
}

/**
 * Gets nested identifiers in a node
 * @param node The AST node
 * @returns The nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];

  if (node.type === NodeType.Identifier) {
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

  if (node.type === NodeType.Property) {
    identifiers.push(...getNestedIdentifiers(node.value));
  }

  if (node.type === NodeType.SpreadElement) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }

  if (node.type === NodeType.MemberExpression) {
    identifiers.push(...getNestedIdentifiers(node.object));
  }

  if (node.type === NodeType.UnaryExpression) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }

  if (node.type === NodeType.ChainExpression) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }

  if (node.type === NodeType.TSNonNullExpression) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }

  return identifiers;
}
