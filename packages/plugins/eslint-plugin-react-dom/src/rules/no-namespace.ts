import { getElementName } from "@eslint-react/jsx";
import type { ESLintUtils } from "@typescript-eslint/utils";
import * as R from "remeda";

import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export type MessageID = "NO_NAMESPACE";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that namespaces are not used in React elements",
    },
    messages: {
      NO_NAMESPACE: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = getElementName(node);
        if (!R.isString(name) || !name.includes(":")) return;
        context.report({
          data: {
            name,
          },
          messageId: "NO_NAMESPACE",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
