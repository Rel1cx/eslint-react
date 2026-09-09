/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";

export const RULE_NAME = "no-class-component";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows class components except for error boundaries.",
    },
    messages: {
      default: "Avoid using class components. Use function components instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
  // Fast path: skip if `Component` is not present in the file
  if (!context.hasText("Component")) return {};
  const { api, visitor } = core.getClassComponentCollector(context);
  return merge(
    visitor,
    {
      "Program:exit"(program) {
        const src = context.src;
        for (const { id, name = "anonymous", node: component } of api.getAllComponents(program)) {
          if (component.body.body.some((m) => core.isComponentDidCatch(m) || core.isGetDerivedStateFromError(m))) {
            continue;
          }
          const classToken = src.getFirstToken(component, {
            filter: (token) => token.value === "class",
          });
          context.report({
            data: {
              name,
            },
            loc: (id ?? classToken ?? component).loc,
            messageId: "default",
            node: component,
          });
        }
      },
    },
  );
}
