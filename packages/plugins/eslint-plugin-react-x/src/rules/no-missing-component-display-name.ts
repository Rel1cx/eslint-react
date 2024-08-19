import { getFunctionIdentifier } from "@eslint-react/ast";
import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-component-display-name";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require 'displayName' for 'memo' and 'forwardRef' components",
    },
    messages: {
      noMissingComponentDisplayName: "Add missing 'displayName' for component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) return {};
    const { ctx, listeners } = useComponentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);

        for (const { node, displayName, flag } of components.values()) {
          const isMemoOrForwardRef = Boolean(flag & ERFunctionComponentFlag.ForwardRef)
            || Boolean(flag & ERFunctionComponentFlag.Memo);
          if (O.isSome(getFunctionIdentifier(node))) continue;
          if (!isMemoOrForwardRef) continue;
          if (O.isNone(displayName)) {
            context.report({
              messageId: "noMissingComponentDisplayName",
              node,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
