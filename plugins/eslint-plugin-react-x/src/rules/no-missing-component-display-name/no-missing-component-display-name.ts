import { createRule } from "@/utils/create-rule";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";

export const RULE_NAME = "no-missing-component-display-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces that anonymous components wrapped in 'memo' or 'forwardRef' have a 'displayName' that can be used in DevTools.",
    },
    messages: {
      default: "Add missing 'displayName' for component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `memo` or `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) return {};

  const { api, visitor } = core.getFunctionComponentCollector(context, {
    collectDisplayName: true,
    hint: core.DEFAULT_COMPONENT_DETECTION_HINT,
  });

  return merge(
    visitor,
    {
      "Program:exit"(program) {
        for (const { displayName, flag, node } of api.getAllComponents(program)) {
          const id = core.getFunctionId(node);
          const isMemoOrForwardRef = (flag & (core.FunctionComponentFlag.ForwardRef | core.FunctionComponentFlag.Memo)) > 0n;
          // If the component is a named function, it has an implicit displayName
          if (id != null) {
            continue;
          }
          // This rule only targets components wrapped with `forwardRef` or `memo`
          if (!isMemoOrForwardRef) {
            continue;
          }
          if (displayName == null) {
            context.report({
              messageId: "default",
              node,
            });
          }
        }
      },
    },
  );
}
