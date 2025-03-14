import * as AST from "@eslint-react/ast";
import { DEFAULT_COMPONENT_HINT, ERComponentFlag, useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-component-display-name";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'displayName' for 'memo' and 'forwardRef' components",
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
  if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) return {};
  const {
    ctx,
    listeners,
  } = useComponentCollector(
    context,
    {
      collectDisplayName: true,
      collectHookCalls: false,
      hint: DEFAULT_COMPONENT_HINT,
    },
  );
  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);
      for (const { node, displayName, flag } of components.values()) {
        const isMemoOrForwardRef = (flag & (ERComponentFlag.ForwardRef | ERComponentFlag.Memo)) > 0n;
        if (AST.getFunctionIdentifier(node) != null) {
          continue;
        }
        if (!isMemoOrForwardRef) {
          continue;
        }
        if (displayName == null) {
          context.report({
            messageId: "noMissingComponentDisplayName",
            node,
          });
        }
      }
    },
  };
}
