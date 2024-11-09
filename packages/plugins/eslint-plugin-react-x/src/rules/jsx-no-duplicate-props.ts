import { isString } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-duplicate-props";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow duplicate props",
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
