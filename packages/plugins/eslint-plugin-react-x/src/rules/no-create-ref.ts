import { traverseUp } from "@eslint-react/ast";
import { isClassComponent, isCreateRefCall } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'createRef' in function components",
    },
    messages: {
      NO_CREATE_REF: "[Deprecated] Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isCreateRefCall(node, context)) return;
        if (O.isSome(traverseUp(node, isClassComponent))) return;
        context.report({ messageId: "NO_CREATE_REF", node });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
