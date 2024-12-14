import * as JSX from "@eslint-react/jsx";
import { isString } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-namespace";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that namespaces are not used in React elements",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
