import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { match } from "ts-pattern";
import { createFactCollector } from "./collect";
import { type GlobalMutationEffect, collectReachableEffects, inferCallGraph, inferGlobalMutations } from "./effects";

export const RULE_NAME = "globals";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutating-global"
  | "mutating-global-array-method"
  | "mutating-global-property";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render.",
    },
    messages: {
      "mutating-global": "Do not mutate '{{name}}' during render. Global variables exist outside React's control and make rendering impure.",
      "mutating-global-array-method": "Do not call '{{method}}()' on '{{name}}' during render. Mutating global arrays during render makes rendering impure.",
      "mutating-global-property": "Do not mutate '{{name}}' during render. Modifying global objects during render makes rendering impure.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hooks = core.getHookCollector(context);
  const comps = core.getFunctionComponentCollector(context);
  const facts = createFactCollector();

  return merge(
    hooks.visitor,
    comps.visitor,
    facts.visitor,
    {
      "Program:exit"(program) {
        const renderFunctions = [
          ...comps.api.getAllComponents(program),
          ...hooks.api.getAllHooks(program),
        ].map(({ node }) => node);

        const directEffects = inferGlobalMutations(context, facts.facts);
        const callGraph = inferCallGraph(context, facts.facts.callEdges);

        for (const effect of collectReachableEffects(renderFunctions, directEffects, callGraph)) {
          const data = effect.method == null ? { name: effect.name } : { name: effect.name, method: effect.method };
          context.report({
            data,
            messageId: match<GlobalMutationEffect, MessageID>(effect)
              .with({ kind: "global" }, () => "mutating-global")
              .with({ kind: "method" }, () => "mutating-global-array-method")
              .with({ kind: "property" }, () => "mutating-global-property")
              .exhaustive(),
            node: effect.node,
          });
        }
      },
    },
  );
}
