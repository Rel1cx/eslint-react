import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { MUTATING_METHODS } from "./lib";

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

export function createImmutabilityCollector() {
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

  const visitor: RuleListener = {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      const target = Extract.unwrap(node.left);
      switch (target.type) {
        case AST.Identifier:
          pushMutation("binding", node, target, target);
          return;
        case AST.MemberExpression: {
          const root = Extract.getRootIdentifier(target);
          if (root != null) pushMutation("value", node, target, root);
          return;
        }
      }
    },
    CallExpression(node: TSESTree.CallExpression) {
      const callee = Extract.unwrap(node.callee);
      if (callee.type === AST.MemberExpression) {
        const property = Extract.getPropertyName(callee.property);
        if (property != null && MUTATING_METHODS.has(property)) {
          const root = Extract.getRootIdentifier(callee.object);
          if (root != null) pushMutation("value", node, callee.object, root);
        }
      }
      if (!core.isHookCall(node)) return;
      for (const argument of node.arguments) {
        if (argument.type === AST.SpreadElement) continue;
        facts.sinks.push({ kind: "hook-argument", expression: argument });
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
      const root = Extract.getRootIdentifier(target);
      if (root != null) pushMutation("value", node, target, root);
    },
    UpdateExpression(node: TSESTree.UpdateExpression) {
      const target = Extract.unwrap(node.argument);
      switch (target.type) {
        case AST.Identifier:
          pushMutation("binding", node, target, target);
          return;
        case AST.MemberExpression: {
          const root = Extract.getRootIdentifier(target);
          if (root != null) pushMutation("value", node, target, root);
          return;
        }
      }
    },
  };

  return { facts, visitor } as const;
}
