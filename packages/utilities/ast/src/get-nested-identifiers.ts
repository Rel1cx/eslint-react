import type { TSESTree } from "@typescript-eslint/types";
import { Chunk, MutableRef as MutRef } from "effect";

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
    node.arguments.forEach((x) => {
      MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(x))));
    });
  }
  if ("elements" in node) {
    node.elements.forEach((x) => {
      if (x !== null) {
        MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(x))));
      }
    });
  }
  if ("properties" in node) {
    node.properties.forEach((x) => {
      MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(x))));
    });
  }
  if ("expressions" in node) {
    node.expressions.forEach((x) => {
      MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(x))));
    });
  }
  if (node.type === NodeType.Property) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.value))));
  }
  if (node.type === NodeType.SpreadElement) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.argument))));
  }
  if (node.type === NodeType.MemberExpression) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.object))));
  }
  if (node.type === NodeType.UnaryExpression) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.argument))));
  }
  if (node.type === NodeType.ChainExpression) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.expression))));
  }
  if (node.type === NodeType.TSNonNullExpression) {
    MutRef.update(identifiers, Chunk.appendAll(Chunk.unsafeFromArray(getNestedIdentifiers(node.expression))));
  }
  return Chunk.toReadonlyArray(MutRef.get(identifiers));
}
