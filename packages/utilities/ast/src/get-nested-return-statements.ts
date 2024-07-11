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
    Array.isArray(node.body)
      ? node.body.forEach((x) => {
        MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(x))));
      })
      : MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.body))));
  }
  if ("consequent" in node) {
    Array.isArray(node.consequent)
      ? node.consequent.forEach((x) => {
        MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(x))));
      })
      : MutRef.update(
        returnStatements,
        Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.consequent))),
      );
  }
  if ("alternate" in node && node.alternate !== null) {
    Array.isArray(node.alternate)
      ? node.alternate.forEach((x: TSESTree.Node) => {
        MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(x))));
      })
      : MutRef.update(
        returnStatements,
        Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(node.alternate))),
      );
  }
  if ("cases" in node) {
    node.cases.forEach((x) => {
      MutRef.update(returnStatements, Chunk.appendAll(Chunk.unsafeFromArray(getNestedReturnStatements(x))));
    });
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
