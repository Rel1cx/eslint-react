import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import { createImmutabilityCollector } from "./collect";
import { inferMutableFunctions } from "./effects";
import { resolveToFunctionNode } from "./lib";

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
  const hooks = core.getHookCollector(context);
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

        const mutableFunctions = inferMutableFunctions(context, collector.facts.mutations);
        if (mutableFunctions.size === 0) return;

        const reported = new Set<TSESTree.Node>();
        for (const sink of collector.facts.sinks) {
          const expression = sink.expression;
          if (reported.has(expression)) continue;
          const fn = resolveToFunctionNode(context, expression);
          if (fn == null) continue;
          const mutation = mutableFunctions.get(fn);
          if (mutation == null) continue;
          reported.add(expression);
          context.report({
            data: { name: mutation.name },
            messageId: "default",
            node: expression,
          });
          context.report({
            data: { name: mutation.name },
            messageId: "mutates",
            node: mutation.node,
          });
        }
      },
    },
  );
}
