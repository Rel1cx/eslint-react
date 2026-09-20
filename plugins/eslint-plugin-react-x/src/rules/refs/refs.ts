import { createRule } from "@/utils/create-rule";
import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { match } from "ts-pattern";
import { createRefsCollector } from "./collect";
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
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hooks = core.getHookCollector(context);
  const comps = core.getFunctionComponentCollector(context);
  const refs = createRefsCollector();

  return merge(
    hooks.visitor,
    comps.visitor,
    refs.visitor,
    {
      "Program:exit"(program) {
        const boundaries = new Set<TSESTreeFunction>([
          ...comps.api.getAllComponents(program).map((component) => component.node),
          ...hooks.api.getAllHooks(program).map((hook) => hook.node),
        ]);

        const resolver = createBindingResolver(context, refs.facts);
        const callGraph = inferCallGraph(boundaries, refs.facts.callEdges, resolver.resolveCallable);
        const reachability = collectReachableFunctions(boundaries, callGraph);
        const violations = [
          ...inferRefViolations(refs.facts.refAccesses, boundaries, reachability, resolver),
          ...inferRefPassViolations(refs.facts.callEdges, boundaries, reachability, resolver),
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
