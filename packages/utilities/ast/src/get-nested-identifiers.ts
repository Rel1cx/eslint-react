import { Chunk, MutRef } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import { NodeType } from "./types";

/**
 * Gets nested identifiers in a node
 * @param node The AST node
 * @returns The nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers = MutRef.make(Chunk.empty<TSESTree.Identifier>());
  if (node.type === NodeType.Identifier) {
    MutRef.update(identifiers, Chunk.append(node));
  }
  if ("arguments" in node) {
    const chunk = Chunk.unsafeFromArray(node.arguments.map(getNestedIdentifiers).flat(1));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if ("elements" in node) {
    const chunk = Chunk.unsafeFromArray(node.elements.filter((x) => x !== null).map(getNestedIdentifiers).flat(1));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if ("properties" in node) {
    const chunk = Chunk.unsafeFromArray(node.properties.map(getNestedIdentifiers).flat(1));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if ("expressions" in node) {
    const chunk = Chunk.unsafeFromArray(node.expressions.map(getNestedIdentifiers).flat(1));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if ("left" in node) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.left));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if ("right" in node) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.right));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.Property) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.value));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.SpreadElement) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.argument));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.MemberExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.object));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.UnaryExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.argument));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.ChainExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.expression));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.TSNonNullExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedIdentifiers(node.expression));
    MutRef.update(identifiers, Chunk.appendAll(chunk));
  }
  return Chunk.toReadonlyArray(MutRef.get(identifiers));
}
