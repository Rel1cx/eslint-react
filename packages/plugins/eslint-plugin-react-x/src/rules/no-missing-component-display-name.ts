import * as AST from "@eslint-react/ast";
import { ComponentFlag, DEFAULT_COMPONENT_DETECTION_HINT, useComponentCollector } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-component-display-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that all components have a 'displayName' that can be used in devtools.",
    },
    messages: {
      noMissingComponentDisplayName: "Add missing 'displayName' for component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `memo` or `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) return {};

  const { ctx, visitors } = useComponentCollector(context, {
    collectDisplayName: true,
    collectHookCalls: false,
    hint: DEFAULT_COMPONENT_DETECTION_HINT,
  });

  return defineRuleListener(
    visitors,
    {
      "Program:exit"(program) {
        for (const { node, displayName, flag } of ctx.getAllComponents(program)) {
          const id = AST.getFunctionId(node);
          // Check if the component is wrapped with `forwardRef` or `memo`
          const isMemoOrForwardRef = (flag & (ComponentFlag.ForwardRef | ComponentFlag.Memo)) > 0n;
          // If the component is a named function, it has an implicit displayName
          if (id != null) {
            continue;
          }
          // This rule only targets components wrapped with `forwardRef` or `memo`
          if (!isMemoOrForwardRef) {
            continue;
          }
          // If the component has no displayName, report an error
          if (displayName == null) {
            context.report({
              messageId: "noMissingComponentDisplayName",
              node,
            });
          }
        }
      },
    },
  );
}
