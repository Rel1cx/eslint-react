import type { TSESTree } from "@typescript-eslint/types";
import { Chunk, MutableRef as MutRef } from "effect";

import { NodeType } from "./types";

export function getNestedCallExpressions(node: TSESTree.Node): readonly TSESTree.CallExpression[] {
  const callExpressions = MutRef.make(Chunk.empty<TSESTree.CallExpression>());
  if (node.type === NodeType.CallExpression) {
    MutRef.update(callExpressions, Chunk.append(node));
  }
  if ("arguments" in node) {
    const chunk = Chunk.unsafeFromArray(node.arguments.map(getNestedCallExpressions).flat(1));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.expression));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("left" in node) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.left));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("right" in node) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.right));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("test" in node && node.test !== null) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.test));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("consequent" in node) {
    const chunk = Chunk.unsafeFromArray(
      Array.isArray(node.consequent)
        ? node.consequent.map(getNestedCallExpressions).flat(1)
        : getNestedCallExpressions(node.consequent),
    );
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("alternate" in node && node.alternate !== null) {
    const chunk = Chunk.unsafeFromArray(
      Array.isArray(node.alternate)
        ? node.alternate.map(getNestedCallExpressions).flat(1)
        : getNestedCallExpressions(node.alternate),
    );
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("elements" in node) {
    const chunk = Chunk.unsafeFromArray(node.elements.filter((x) => x !== null).map(getNestedCallExpressions).flat(1));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("properties" in node) {
    const chunk = Chunk.unsafeFromArray(node.properties.map(getNestedCallExpressions).flat(1));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if ("expressions" in node) {
    const chunk = Chunk.unsafeFromArray(node.expressions.map(getNestedCallExpressions).flat(1));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.Property) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.value));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.SpreadElement) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.argument));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.MemberExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.object));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.UnaryExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.argument));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.ChainExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.expression));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  if (node.type === NodeType.TSNonNullExpression) {
    const chunk = Chunk.unsafeFromArray(getNestedCallExpressions(node.expression));
    MutRef.update(callExpressions, Chunk.appendAll(chunk));
  }
  return Chunk.toReadonlyArray(MutRef.get(callExpressions));
}
