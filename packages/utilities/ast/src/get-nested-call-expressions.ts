import type { TSESTree } from "@typescript-eslint/types";
import { Chunk, MutableRef as MutRef } from "effect";

import { NodeType } from "./types";

export function getNestedCallExpressions(node: TSESTree.Node): readonly TSESTree.CallExpression[] {
  // const callExpressions: TSESTree.CallExpression[] = [];
  const callExpressions = MutRef.make(Chunk.empty<TSESTree.CallExpression>());
  if (node.type === NodeType.CallExpression) {
    MutRef.update(callExpressions, Chunk.append(node));
  }
  if ("arguments" in node) {
    node.arguments.forEach((x) => {
      MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
    });
  }
  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.expression))));
  }
  if ("left" in node) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.left))));
  }
  if ("right" in node) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.right))));
  }
  if ("test" in node && node.test !== null) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.test))));
  }
  if ("consequent" in node) {
    Array.isArray(node.consequent)
      ? node.consequent.forEach((x) => {
        MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
      })
      : MutRef.update(
        callExpressions,
        Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.consequent))),
      );
  }
  if ("alternate" in node && node.alternate !== null) {
    Array.isArray(node.alternate)
      ? node.alternate.forEach((x: TSESTree.Node) => {
        MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
      })
      : MutRef.update(
        callExpressions,
        Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.alternate))),
      );
  }
  if ("elements" in node) {
    node.elements.forEach((x) => {
      if (x !== null) {
        MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
      }
    });
  }
  if ("properties" in node) {
    node.properties.forEach((x) => {
      MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
    });
  }
  if ("expressions" in node) {
    node.expressions.forEach((x) => {
      MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(x))));
    });
  }
  if (node.type === NodeType.Property) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.value))));
  }
  if (node.type === NodeType.SpreadElement) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.argument))));
  }
  if (node.type === NodeType.MemberExpression) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.object))));
  }
  if (node.type === NodeType.UnaryExpression) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.argument))));
  }
  if (node.type === NodeType.ChainExpression) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.expression))));
  }
  if (node.type === NodeType.TSNonNullExpression) {
    MutRef.update(callExpressions, Chunk.appendAll(Chunk.unsafeFromArray(getNestedCallExpressions(node.expression))));
  }
  return Chunk.toReadonlyArray(MutRef.get(callExpressions));
}
