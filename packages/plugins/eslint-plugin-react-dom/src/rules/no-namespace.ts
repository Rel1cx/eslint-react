import * as JSX from "@eslint-react/jsx";
import { isString } from "@eslint-react/tools";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that namespaces are not used in React elements",
    },
    messages: {
      noNamespace: "A React component '{{name}}' must not be in a namespace, as React does not support them.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = JSX.getElementName(node);
        if (!isString(name) || !name.includes(":")) return;
        context.report({
          messageId: "noNamespace",
          node,
          data: {
            name,
          },
        });
      },
    };
  },
  defaultOptions: [],
});
