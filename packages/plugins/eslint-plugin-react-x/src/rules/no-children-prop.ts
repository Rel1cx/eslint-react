import { getProp } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing 'children' as props",
    },
    messages: {
      noChildrenProp: "Do not pass 'children' as props.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const prop = getProp(node.openingElement.attributes, "children", initialScope);
        const reportDescriptor = O.map(prop, prop => ({ messageId: "noChildrenProp", node: prop } as const));
        O.map(reportDescriptor, context.report);
      },
    };
  },
  defaultOptions: [],
});
