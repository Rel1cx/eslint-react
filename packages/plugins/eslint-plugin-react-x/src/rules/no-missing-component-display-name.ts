import * as AST from "@eslint-react/ast";
import { ComponentFlag, DEFAULT_COMPONENT_DETECTION_HINT, useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
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
      description: "Enforces that all components have a `displayName` which can be used in devtools.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
  const {
    ctx,
    listeners,
  } = useComponentCollector(
    context,
    {
      collectDisplayName: true,
      collectHookCalls: false,
      hint: DEFAULT_COMPONENT_DETECTION_HINT,
    },
  );
  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);
      for (const { node, displayName, flag } of components.values()) {
        const isMemoOrForwardRef = (flag & (ComponentFlag.ForwardRef | ComponentFlag.Memo)) > 0n;
        if (AST.getFunctionId(node) != null) {
          continue;
        }
        if (!isMemoOrForwardRef) {
          continue;
        }
        if (displayName == null) {
          const id = AST.getFunctionId(node);
          context.report({
            messageId: "noMissingComponentDisplayName",
            node: id ?? node,
          });
        }
      }
    },
  };
}
