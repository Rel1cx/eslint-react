import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing 'children' as props",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
        const prop = JSX.getProp(node.openingElement.attributes, "children", initialScope);
        const reportDescriptor = O.map(prop, (prop) => ({ messageId: "noChildrenProp", node: prop } as const));
        O.map(reportDescriptor, context.report);
      },
    };
  },
  defaultOptions: [],
});
