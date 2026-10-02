import { createRule } from "@/utils/create-rule";
import type { TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { match } from "ts-pattern";
import { createFactCollector } from "./collect";
import { type RefViolation, collectReachableFunctions, inferCallGraph, inferRefPassViolations, inferRefViolations } from "./effects";
import { createBindingResolver } from "./origins";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "read-during-render"
  | "write-during-render"
  | "ref-passed-to-function"
  | "duplicate-ref-init";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      "duplicate-ref-init":
        "Ref is initialized more than once during render. Only a single 'if (ref.current == null)' initialization is allowed; move any additional initialization into an effect or event handler.",
      "read-during-render": "Cannot access refs during render",
      "ref-passed-to-function": "Passing a ref to a function may read its value during render",
      "write-during-render": "Cannot update ref during render",
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
          ...inferRefPassViolations(facts.facts.passSites, boundaries, reachability, resolver),
        ];

        for (const violation of violations) {
          context.report({
            messageId: match<RefViolation, MessageID>(violation)
              .with({ kind: "duplicate-init" }, () => "duplicate-ref-init")
              .with({ kind: "pass" }, () => "ref-passed-to-function")
              .with({ kind: "read" }, () => "read-during-render")
              .with({ kind: "write" }, () => "write-during-render")
              .exhaustive(),
            node: violation.node,
          });
        }
      },
    },
  );
}
