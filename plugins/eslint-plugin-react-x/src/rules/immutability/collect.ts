import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { KNOWN_MUTATING_METHODS } from "./lib";

export type MutationFact = {
  kind: "binding" | "value";
  enclosingFunction: TSESTreeFunction;
  node: TSESTree.Node;
  root: TSESTree.Identifier;
  target: TSESTree.Expression;
};

export type SinkFact = {
  kind: "hook-argument" | "hook-return" | "jsx-prop";
  expression: TSESTree.Node;
};

export type ImmutabilityFacts = {
  mutations: MutationFact[];
  sinks: SinkFact[];
};

export function createFactCollector() {
  const facts: ImmutabilityFacts = {
    mutations: [],
    sinks: [],
  };

  function pushMutation(
    kind: MutationFact["kind"],
    node: TSESTree.Node,
    target: TSESTree.Expression,
    root: TSESTree.Identifier,
  ) {
    const enclosingFunction = Traverse.findParent(node, Check.isFunction);
    if (enclosingFunction == null) return;
    facts.mutations.push({ kind, enclosingFunction, node, root, target });
  }

  function pushMemberMutation(node: TSESTree.Node, target: TSESTree.Expression) {
    const root = Extract.getMemberChain(target).at(0);
    if (root == null || !Check.isIdentifier(root)) return;
    pushMutation("value", node, target, root);
  }

  function pushTargetMutation(node: TSESTree.Node, target: TSESTree.Identifier | TSESTree.MemberExpression) {
    if (Check.isIdentifier(target)) {
      pushMutation("binding", node, target, target);
      return;
    }
    pushMemberMutation(node, target);
  }

  const visitor: RuleListener = {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      for (const target of Extract.getAssignmentTargets(node.left)) {
        pushTargetMutation(node, target);
      }
    },
    CallExpression(node: TSESTree.CallExpression) {
      const callee = Extract.unwrap(node.callee);
      if (callee.type === AST.MemberExpression) {
        const method = Extract.getCalleeName(node);
        if (method != null && KNOWN_MUTATING_METHODS.has(method)) {
          pushMemberMutation(node, callee.object);
        }
      }
      if (!core.isHookCall(node)) return;
      for (const argument of node.arguments) {
        if (argument.type === AST.SpreadElement) continue;
        facts.sinks.push({ kind: "hook-argument", expression: argument });
      }
    },
    ForInStatement(node: TSESTree.ForInStatement) {
      if (node.left.type === AST.VariableDeclaration) return;
      for (const target of Extract.getAssignmentTargets(node.left)) {
        pushTargetMutation(node, target);
      }
    },
    ForOfStatement(node: TSESTree.ForOfStatement) {
      if (node.left.type === AST.VariableDeclaration) return;
      for (const target of Extract.getAssignmentTargets(node.left)) {
        pushTargetMutation(node, target);
      }
    },
    JSXAttribute(node: TSESTree.JSXAttribute) {
      if (node.value?.type !== AST.JSXExpressionContainer) return;
      const expression = node.value.expression;
      if (expression.type === AST.JSXEmptyExpression) return;
      facts.sinks.push({ kind: "jsx-prop", expression });
    },
    UnaryExpression(node: TSESTree.UnaryExpression) {
      if (node.operator !== "delete") return;
      const target = Extract.unwrap(node.argument);
      if (target.type !== AST.MemberExpression) return;
      pushMemberMutation(node, target);
    },
    UpdateExpression(node: TSESTree.UpdateExpression) {
      const target = Extract.unwrap(node.argument);
      switch (target.type) {
        case AST.Identifier:
          pushMutation("binding", node, target, target);
          return;
        case AST.MemberExpression:
          pushMemberMutation(node, target);
          return;
      }
    },
  };

  return { facts, visitor } as const;
}
