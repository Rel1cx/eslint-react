import type { TSESTree } from "@typescript-eslint/types";
import { Chunk, MutableRef as MutRef } from "effect";

import { NodeType } from "./types";

/**
 * Gets nested return statements in a node
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(
  node: TSESTree.Node,
): readonly TSESTree.ReturnStatement[] {
  const returnStatements = MutRef.make(Chunk.empty<TSESTree.ReturnStatement>());
  if (node.type === NodeType.ReturnStatement) {
    MutRef.update(returnStatements, Chunk.append(node));
  }
  if ("body" in node && node.body !== undefined && node.body !== null) {
    const chunk = Chunk.unsafeFromArray(
      Array.isArray(node.body)
        ? node.body.map(getNestedReturnStatements).flat(1)
        : getNestedReturnStatements(node.body),
    );
    MutRef.update(returnStatements, Chunk.appendAll(chunk));
  }
  if ("consequent" in node) {
    const chunk = Chunk.unsafeFromArray(
      Array.isArray(node.consequent)
        ? node.consequent.map(getNestedReturnStatements).flat(1)
        : getNestedReturnStatements(node.consequent),
    );
    MutRef.update(returnStatements, Chunk.appendAll(chunk));
  }
  if ("alternate" in node && node.alternate !== null) {
    const chunk = Chunk.unsafeFromArray(
      Array.isArray(node.alternate)
        ? node.alternate.map(getNestedReturnStatements).flat(1)
        : getNestedReturnStatements(node.alternate),
    );
    MutRef.update(returnStatements, Chunk.appendAll(chunk));
  }
  if ("cases" in node) {
    const chunk = Chunk.unsafeFromArray(node.cases.map(getNestedReturnStatements).flat(1));
    MutRef.update(returnStatements, Chunk.appendAll(chunk));
  }
  if ("block" in node) {
    MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.block))));
  }
  if ("handler" in node && node.handler !== null) {
    MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.handler))));
  }
  if ("finalizer" in node && node.finalizer !== null) {
    MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.finalizer))));
  }
  if (
    "expression" in node
    && node.expression !== true
    && node.expression !== false
  ) {
    MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.expression))));
  }
  if ("test" in node && node.test !== null) {
    MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.test))));
  }
  return Chunk.toReadonlyArray(MutRef.get(returnStatements));
}
