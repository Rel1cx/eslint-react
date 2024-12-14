import { isString } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-duplicate-props";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow duplicate props",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxNoDuplicateProps: "Duplicate prop '{{name}}'",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXOpeningElement(node) {
        const props: string[] = [];
        for (const attr of node.attributes) {
          if (attr.type === AST_NODE_TYPES.JSXSpreadAttribute) continue;
          const name = attr.name.name;
          if (!isString(name)) continue;
          if (!props.includes(name)) {
            props.push(name);
            continue;
          }
          context.report({
            messageId: "jsxNoDuplicateProps",
            node: attr,
            data: { name },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
