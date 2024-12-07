import { isForwardRefCall } from "@eslint-react/core";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-forward-ref";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'forwardRef'",
    },
    messages: {
      noForwardRef: "In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("forwardRef")) return {};
    const { version } = normalizeSettings(decodeSettings(context.settings));
    if (compare(version, "19.0.0", "<")) return {};
    return {
      CallExpression(node) {
        if (!isForwardRefCall(node, context)) return;
        context.report({
          messageId: "noForwardRef",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
