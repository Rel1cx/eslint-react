import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { createImmutabilityCollector } from "./collect";
import { inferDirectMutations, inferMutableFunctions } from "./effects";
import { resolveToFunctionNode } from "./lib";

export const RULE_NAME = "immutability";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "direct"
  | "mutates";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against mutating props, state, and other immutable values, including through functions passed into frozen contexts such as JSX props, hook arguments, and hook return values.",
    },
    messages: {
      default:
        "This function may (indirectly) reassign or modify '{{name}}' after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead.",
      direct: "Do not mutate '{{name}}' directly. {{detail}}",
      mutates: "This modifies '{{name}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const ctx = core.buildRichContext(context);
  const hooks = core.getHookCollector(ctx._);
  const collector = createImmutabilityCollector();

  return merge(
    hooks.visitor,
    collector.visitor,
    {
      "Program:exit"(program) {
        for (const hook of hooks.api.getAllHooks(program)) {
          for (const expression of hook.rets) {
            if (expression != null) collector.facts.sinks.push({ kind: "hook-return", expression });
          }
        }

        const reportedMutations = new Set<TSESTree.Node>();
        const mutableFunctions = inferMutableFunctions(ctx, collector.facts.mutations);
        if (mutableFunctions.size > 0) {
          const reportedSinks = new Set<TSESTree.Node>();
          for (const sink of collector.facts.sinks) {
            const expression = sink.expression;
            if (reportedSinks.has(expression)) continue;
            const fn = resolveToFunctionNode(ctx, expression);
            if (fn == null) continue;
            const mutation = mutableFunctions.get(fn);
            if (mutation == null) continue;
            reportedSinks.add(expression);
            reportedMutations.add(mutation.node);
            ctx.report({
              data: { name: mutation.name },
              messageId: "default",
              node: expression,
            });
            ctx.report({
              data: { name: mutation.name },
              messageId: "mutates",
              node: mutation.node,
            });
          }
        }

        for (const mutation of inferDirectMutations(ctx, collector.facts.mutations)) {
          if (reportedMutations.has(mutation.node)) continue;
          reportedMutations.add(mutation.node);
          ctx.report({
            data: { name: mutation.name, detail: mutation.detail },
            messageId: "direct",
            node: mutation.node,
          });
        }
      },
    },
  );
}
