import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { MUTATING_ARRAY_METHODS, getAssignmentTargets, isGlobalVariable, resolveGlobalOrigin, resolveToFunction } from "./lib";

export const RULE_NAME = "globals";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutatingGlobal"
  | "mutatingGlobalArrayMethod"
  | "mutatingGlobalProperty";

type GlobalMutationEffect = {
  data: Record<string, string>;
  messageId: MessageID;
  node: TSESTree.Node;
};

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render.",
    },
    messages: {
      mutatingGlobal: "Do not mutate '{{name}}' during render. Global variables exist outside React's control and make rendering impure.",
      mutatingGlobalArrayMethod: "Do not call '{{method}}()' on '{{name}}' during render. Mutating global arrays during render makes rendering impure.",
      mutatingGlobalProperty: "Do not mutate '{{name}}' during render. Modifying global objects during render makes rendering impure.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);

  // Like the SPEC's function signatures, these summaries keep creation of an
  // effect separate from applying it in a component or hook render.
  const directEffects = new Map<TSESTreeFunction, GlobalMutationEffect[]>();
  const callGraph = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();

  function getEnclosingFunction(node: TSESTree.Node): TSESTreeFunction | null {
    return Traverse.findParent(node, Check.isFunction);
  }

  function recordEffect(node: TSESTree.Node, messageId: MessageID, data: Record<string, string>) {
    const enclosing = getEnclosingFunction(node);
    if (enclosing == null) return;
    const effects = directEffects.get(enclosing) ?? [];
    effects.push({ data, messageId, node });
    directEffects.set(enclosing, effects);
  }

  function recordWrite(node: TSESTree.Node, target: TSESTree.Identifier | TSESTree.MemberExpression) {
    if (target.type === AST.Identifier) {
      // Reassigning a local alias changes only the local binding. Alias
      // provenance matters only when mutating a property of the aliased value.
      if (!isGlobalVariable(context, target)) return;
      recordEffect(node, "mutatingGlobal", { name: target.name });
      return;
    }

    const origin = resolveGlobalOrigin(context, target.object);
    if (origin == null) return;
    recordEffect(node, "mutatingGlobalProperty", {
      name: context.sourceCode.getText(target),
    });
  }

  function recordCallEdge(node: TSESTree.CallExpression) {
    const caller = getEnclosingFunction(node);
    if (caller == null) return;
    const callee = resolveToFunction(context, node.callee);
    if (callee == null) return;
    const callees = callGraph.get(caller) ?? new Set<TSESTreeFunction>();
    callees.add(callee);
    callGraph.set(caller, callees);
  }

  return merge(
    hc.visitor,
    fc.visitor,
    {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        for (const target of getAssignmentTargets(node.left)) {
          recordWrite(node, target);
        }
      },
      CallExpression(node: TSESTree.CallExpression) {
        recordCallEdge(node);

        const callee = Extract.unwrap(node.callee);
        if (callee.type !== AST.MemberExpression) return;
        const method = Extract.getCalleeName(node);
        if (method == null || !MUTATING_ARRAY_METHODS.has(method)) return;

        const origin = resolveGlobalOrigin(context, callee.object);
        if (origin == null) return;
        recordEffect(node, "mutatingGlobalArrayMethod", {
          name: origin.name,
          method,
        });
      },
      "Program:exit"(program) {
        const renderFunctions = [
          ...fc.api.getAllComponents(program),
          ...hc.api.getAllHooks(program),
        ];
        const visited = new Set<TSESTreeFunction>();
        const reported = new Set<GlobalMutationEffect>();

        function applyFunctionEffects(func: TSESTreeFunction) {
          if (visited.has(func)) return;
          visited.add(func);

          for (const effect of directEffects.get(func) ?? []) {
            if (reported.has(effect)) continue;
            reported.add(effect);
            context.report(effect);
          }
          for (const callee of callGraph.get(func) ?? []) {
            applyFunctionEffects(callee);
          }
        }

        for (const { node } of renderFunctions) {
          applyFunctionEffects(node);
        }
      },
      UnaryExpression(node: TSESTree.UnaryExpression) {
        if (node.operator !== "delete") return;
        const argument = Extract.unwrap(node.argument);
        if (argument.type !== AST.MemberExpression) return;
        recordWrite(node, argument);
      },
      UpdateExpression(node: TSESTree.UpdateExpression) {
        const argument = Extract.unwrap(node.argument);
        if (argument.type !== AST.Identifier && argument.type !== AST.MemberExpression) return;
        recordWrite(node, argument);
      },
    },
  );
}
