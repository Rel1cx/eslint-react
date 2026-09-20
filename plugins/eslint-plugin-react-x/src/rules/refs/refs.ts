/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { match } from "ts-pattern";
import { createFactCollector } from "./collect";
import { type RefViolation, collectReachableFunctions, inferCallGraph, inferRefPassViolations, inferRefViolations } from "./effects";
import { createBindingResolver } from "./origins";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "readDuringRender"
  | "writeDuringRender"
  | "refPassedToFunction"
  | "duplicateRefInit";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      duplicateRefInit:
        "Ref is initialized more than once during render. Only a single 'if (ref.current == null)' initialization is allowed; move any additional initialization into an effect or event handler.",
      readDuringRender: "Cannot access refs during render",
      refPassedToFunction: "Passing a ref to a function may read its value during render",
      writeDuringRender: "Cannot update ref during render",
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
  const facts = createFactCollector();

  return merge(
    hooks.visitor,
    comps.visitor,
    facts.visitor,
    {
      "Program:exit"(program) {
        const boundaries = new Set<TSESTreeFunction>([
          ...comps.api.getAllComponents(program).map((component) => component.node),
          ...hooks.api.getAllHooks(program).map((hook) => hook.node),
        ]);

        const resolver = createBindingResolver(context, facts.facts);
        const callGraph = inferCallGraph(boundaries, facts.facts.callEdges, resolver.resolveCallable);
        const reachability = collectReachableFunctions(boundaries, callGraph);
        const violations = [
          ...inferRefViolations(facts.facts.refAccesses, boundaries, reachability, resolver),
          ...inferRefPassViolations(facts.facts.callEdges, boundaries, reachability, resolver),
        ];

        for (const violation of violations) {
          context.report({
            messageId: match<RefViolation, MessageID>(violation)
              .with({ kind: "duplicate-init" }, () => "duplicateRefInit")
              .with({ kind: "pass" }, () => "refPassedToFunction")
              .with({ kind: "read" }, () => "readDuringRender")
              .with({ kind: "write" }, () => "writeDuringRender")
              .exhaustive(),
            node: violation.node,
          });
        }
      },
    },
  );
}
