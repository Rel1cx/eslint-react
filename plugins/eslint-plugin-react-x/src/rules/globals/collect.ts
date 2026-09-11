import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { MUTATING_ARRAY_METHODS, getAssignmentTargets } from "./lib";

export type WriteFact = {
  enclosingFunction: TSESTreeFunction;
  node: TSESTree.Node;
  target: TSESTree.Identifier | TSESTree.MemberExpression;
};

export type MethodCallFact = {
  enclosingFunction: TSESTreeFunction;
  method: string;
  node: TSESTree.CallExpression;
  receiver: TSESTree.Expression;
};

export type CallEdgeFact = {
  callee: TSESTree.Node;
  caller: TSESTreeFunction;
};

export type GlobalsFacts = {
  callEdges: CallEdgeFact[];
  methodCalls: MethodCallFact[];
  writes: WriteFact[];
};

export function createGlobalsCollector() {
  const facts: GlobalsFacts = {
    callEdges: [],
    methodCalls: [],
    writes: [],
  };

  function getEnclosingFunction(node: TSESTree.Node): TSESTreeFunction | null {
    return Traverse.findParent(node, Check.isFunction);
  }

  function pushWrite(node: TSESTree.Node, target: TSESTree.Identifier | TSESTree.MemberExpression) {
    const enclosingFunction = getEnclosingFunction(node);
    if (enclosingFunction == null) return;
    facts.writes.push({ enclosingFunction, node, target });
  }

  const visitor: RuleListener = {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      for (const target of getAssignmentTargets(node.left)) {
        pushWrite(node, target);
      }
    },
    CallExpression(node: TSESTree.CallExpression) {
      const caller = getEnclosingFunction(node);
      if (caller != null) {
        facts.callEdges.push({ callee: node.callee, caller });
      }

      const callee = Extract.unwrap(node.callee);
      if (callee.type !== AST.MemberExpression) return;
      const method = Extract.getCalleeName(node);
      if (method == null || !MUTATING_ARRAY_METHODS.has(method)) return;
      if (caller == null) return;
      facts.methodCalls.push({ enclosingFunction: caller, method, node, receiver: callee.object });
    },
    UnaryExpression(node: TSESTree.UnaryExpression) {
      if (node.operator !== "delete") return;
      const argument = Extract.unwrap(node.argument);
      if (argument.type !== AST.MemberExpression) return;
      pushWrite(node, argument);
    },
    UpdateExpression(node: TSESTree.UpdateExpression) {
      const argument = Extract.unwrap(node.argument);
      if (argument.type !== AST.Identifier && argument.type !== AST.MemberExpression) return;
      pushWrite(node, argument);
    },
  };

  return { facts, visitor } as const;
}
