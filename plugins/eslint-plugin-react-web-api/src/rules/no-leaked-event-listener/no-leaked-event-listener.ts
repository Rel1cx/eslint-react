import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { createFactCollector } from "./collect";
import { inferEventListenerViolations } from "./effect";
import { resolveEventListenerFacts } from "./origins";

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "unexpected-inline-function"
  | "expected-remove-event-listener-in-cleanup";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
    },
    messages: {
      "unexpected-inline-function": "A/an '{{eventMethodKind}}' should not have an inline listener function.",
      "expected-remove-event-listener-in-cleanup":
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("addEventListener")) return {};
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
  const { facts, visitor } = createFactCollector();
  return merge(
    visitor,
    {
      "Program:exit"() {
        const resolvedFacts = resolveEventListenerFacts(context, facts);
        for (const violation of inferEventListenerViolations(context, resolvedFacts)) {
          context.report({
            data: violation.data,
            messageId: violation.kind,
            node: violation.node,
          });
        }
      },
    },
  );
}
