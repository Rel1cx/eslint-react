/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { match } from "ts-pattern";
import { createGlobalsCollector } from "./collect";
import { type GlobalMutationEffect, collectReachableEffects, inferCallGraph, inferGlobalMutations } from "./effects";

export const RULE_NAME = "globals";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "mutatingGlobal"
  | "mutatingGlobalArrayMethod"
  | "mutatingGlobalProperty";

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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  const hooks = core.getHookCollector(context);
  const comps = core.getFunctionComponentCollector(context);
  const collector = createGlobalsCollector();

  return merge(
    hooks.visitor,
    comps.visitor,
    collector.visitor,
    {
      "Program:exit"(program) {
        const renderFunctions = [
          ...comps.api.getAllComponents(program),
          ...hooks.api.getAllHooks(program),
        ].map(({ node }) => node);

        const directEffects = inferGlobalMutations(context, collector.facts);
        const callGraph = inferCallGraph(context, collector.facts.callEdges);

        for (const effect of collectReachableEffects(renderFunctions, directEffects, callGraph)) {
          const data = effect.method == null ? { name: effect.name } : { name: effect.name, method: effect.method };
          context.report({
            data,
            messageId: match<GlobalMutationEffect, MessageID>(effect)
              .with({ kind: "global" }, () => "mutatingGlobal")
              .with({ kind: "method" }, () => "mutatingGlobalArrayMethod")
              .with({ kind: "property" }, () => "mutatingGlobalProperty")
              .exhaustive(),
            node: effect.node,
          });
        }
      },
    },
  );
}
