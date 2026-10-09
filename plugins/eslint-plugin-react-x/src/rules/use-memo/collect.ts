import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { getNestedReturnStatements, isResultUsed } from "./helpers";

/**
 * A direct write to an identifier (x = …) observed in a useMemo callback body,
 * excluding writes inside functions nested within the callback.
 */
export type WriteFact = {
  node: TSESTree.AssignmentExpression | TSESTree.ForInStatement | TSESTree.ForOfStatement;
  target: TSESTree.Identifier;
};

/**
 * A `useMemo` call observed while traversing, with the unwrapped callback, its
 * own return statements and identifier writes captured eagerly so inference
 * never re-walks the callback body.
 */
export type UseMemoCallFact = {
  callback: TSESTreeFunction | null;
  callbackArg: TSESTree.CallExpressionArgument | null;
  isResultUsed: boolean;
  node: TSESTree.CallExpression;
  returnStatements: readonly TSESTree.ReturnStatement[];
  writes: WriteFact[];
};

export type UseMemoFacts = {
  calls: UseMemoCallFact[];
};

export function createFactCollector(isUseMemoCall: (node: null | TSESTree.Node) => node is TSESTree.CallExpression) {
  const facts: UseMemoFacts = {
    calls: [],
  };

  function collectWrites(callback: TSESTreeFunction): WriteFact[] {
    const writes: WriteFact[] = [];

    function pushWrite(
      node:
        | TSESTree.AssignmentExpression
        | TSESTree.ForInStatement
        | TSESTree.ForOfStatement,
      target:
        | TSESTree.Identifier
        | TSESTree.MemberExpression,
    ) {
      // Only flag direct variable reassignment (x = …), not property mutations (ref.current = …)
      // to match React Compiler's StoreContext semantics.
      if (!Check.isIdentifier(target)) return;
      if (Traverse.hasParent(node, Check.isFunction, (n) => n === callback)) return;
      writes.push({ node, target });
    }

    simpleTraverse(callback.body, {
      enter(node) {
        switch (node.type) {
          case AST.AssignmentExpression: {
            for (const target of Extract.getAssignmentTargets(node.left)) {
              pushWrite(node, target);
            }
            return;
          }
          case AST.ForInStatement:
          case AST.ForOfStatement: {
            if (node.left.type === AST.VariableDeclaration) return;
            for (const target of Extract.getAssignmentTargets(node.left)) {
              pushWrite(node, target);
            }
            return;
          }
        }
      },
    });
    return writes;
  }

  const visitor: RuleListener = {
    CallExpression(node) {
      if (!isUseMemoCall(node)) return;
      const callbackArg = node.arguments[0] ?? null;
      const callback = callbackArg != null ? Extract.unwrap(callbackArg) : null;
      const callbackFunction = callback != null && Check.isFunction(callback) ? callback : null;
      facts.calls.push({
        callback: callbackFunction,
        callbackArg,
        isResultUsed: isResultUsed(node),
        node,
        returnStatements: callbackFunction != null ? getNestedReturnStatements(callbackFunction) : [],
        writes: callbackFunction != null ? collectWrites(callbackFunction) : [],
      });
    },
  };

  return { facts, visitor } as const;
}
