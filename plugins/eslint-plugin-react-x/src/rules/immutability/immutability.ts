import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { MUTATING_METHODS, hasRefLikeNameInChain, isNodeWithin, isRefLikeName, resolveToFunctionNode } from "./lib";

export const RULE_NAME = "immutability";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "mutates";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against passing functions that mutate captured local variables into frozen contexts such as JSX props, hook arguments, and hook return values.",
    },
    messages: {
      default:
        "This function may (indirectly) reassign or modify '{{name}}' after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead.",
      mutates: "This modifies '{{name}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hc = core.getHookCollector(context);

  const mutationSites: {
    enclosing: TSESTreeFunction;
    node: TSESTree.Node;
    root: TSESTree.Identifier;
  }[] = [];
  const sinkCandidates: TSESTree.Node[] = [];

  function pushMutationSite(node: TSESTree.Node, root: TSESTree.Identifier) {
    const enclosing = Traverse.findParent(node, Check.isFunction);
    if (enclosing == null) return;
    mutationSites.push({ enclosing, node, root });
  }

  return merge(
    hc.visitor,
    {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        const left = Extract.unwrap(node.left);
        switch (left.type) {
          case AST.Identifier: {
            if (isRefLikeName(left.name)) return;
            pushMutationSite(node, left);
            return;
          }
          case AST.MemberExpression: {
            if (hasRefLikeNameInChain(left)) return;
            const rootId = Extract.getRootIdentifier(left);
            if (rootId == null) return;
            pushMutationSite(node, rootId);
            return;
          }
        }
      },
      CallExpression(node: TSESTree.CallExpression) {
        const callee = Extract.unwrap(node.callee);
        if (callee.type === AST.MemberExpression) {
          const propName = Extract.getPropertyName(callee.property);
          if (propName != null && MUTATING_METHODS.has(propName) && !hasRefLikeNameInChain(callee.object)) {
            const rootId = Extract.getRootIdentifier(callee.object);
            if (rootId != null) pushMutationSite(node, rootId);
          }
        }
        if (core.isHookCall(node)) {
          for (const arg of node.arguments) {
            if (arg.type === AST.SpreadElement) continue;
            sinkCandidates.push(arg);
          }
        }
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (node.value?.type !== AST.JSXExpressionContainer) return;
        const expr = node.value.expression;
        if (expr.type === AST.JSXEmptyExpression) return;
        sinkCandidates.push(expr);
      },
      "Program:exit"(program) {
        // Phase 1: determine which functions mutate a variable captured from
        // an enclosing scope (transitively, through nested closures).
        const mutableFunctions = new Map<TSESTreeFunction, { name: string; node: TSESTree.Node }>();
        for (const { enclosing, node, root } of mutationSites) {
          const scope = context.sourceCode.getScope(root);
          const variable = findVariable(scope, root);
          if (variable == null) continue;
          const declId = variable.identifiers.at(0) ?? null;
          let current: TSESTreeFunction | null = enclosing;
          while (current != null) {
            // The variable is declared inside `current` — it's local, not
            // captured, so it cannot leak through any function further out.
            if (declId != null && isNodeWithin(declId, current)) break;
            if (!mutableFunctions.has(current)) {
              mutableFunctions.set(current, { name: variable.name, node });
            }
            current = Traverse.findParent(current, Check.isFunction);
          }
        }

        if (mutableFunctions.size === 0) return;

        // Phase 2: check every collected freeze context (JSX prop, hook
        // argument, hook return value) against the mutable functions found above.
        const reported = new Set<TSESTree.Node>();
        function checkSink(expr: TSESTree.Node | null | undefined) {
          if (expr == null || reported.has(expr)) return;
          const fn = resolveToFunctionNode(context, expr);
          if (fn == null) return;
          const mutation = mutableFunctions.get(fn);
          if (mutation == null) return;
          reported.add(expr);
          // Report both the freeze usage site and the mutation site, mirroring
          // the SPEC's dual-location diagnostic (usage location + mutation location).
          context.report({
            data: { name: mutation.name },
            messageId: "default",
            node: expr,
          });
          context.report({
            data: { name: mutation.name },
            messageId: "mutates",
            node: mutation.node,
          });
        }

        for (const candidate of sinkCandidates) {
          checkSink(candidate);
        }
        for (const hook of hc.api.getAllHooks(program)) {
          for (const ret of hook.rets) {
            checkSink(ret);
          }
        }
      },
      UnaryExpression(node: TSESTree.UnaryExpression) {
        if (node.operator !== "delete") return;
        const arg = Extract.unwrap(node.argument);
        if (arg.type !== AST.MemberExpression) return;
        if (hasRefLikeNameInChain(arg)) return;
        const rootId = Extract.getRootIdentifier(arg);
        if (rootId == null) return;
        pushMutationSite(node, rootId);
      },
      UpdateExpression(node: TSESTree.UpdateExpression) {
        const arg = Extract.unwrap(node.argument);
        switch (arg.type) {
          case AST.Identifier: {
            if (isRefLikeName(arg.name)) return;
            pushMutationSite(node, arg);
            return;
          }
          case AST.MemberExpression: {
            if (hasRefLikeNameInChain(arg)) return;
            const rootId = Extract.getRootIdentifier(arg);
            if (rootId == null) return;
            pushMutationSite(node, rootId);
            return;
          }
        }
      },
    },
  );
}
