import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using both 'children' and 'dangerouslySetInnerHTML'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDangerouslySetInnerhtmlWithChildren:
        "A DOM component cannot use both 'children' and 'dangerouslySetInnerHTML'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("dangerouslySetInnerHTML")) return {};
    return {
      JSXElement(node) {
        const attributes = node.openingElement.attributes;
        const initialScope = context.sourceCode.getScope(node);
        const hasChildren = hasChildrenWithin(node) || JSX.hasAttribute("children", initialScope, attributes);
        if (hasChildren && JSX.hasAttribute("dangerouslySetInnerHTML", initialScope, attributes)) {
          context.report({
            messageId: "noDangerouslySetInnerhtmlWithChildren",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});

function hasChildrenWithin(node: TSESTree.JSXElement): boolean {
  return node.children.length > 0
    && node.children[0] != null
    && !JSX.isLineBreak(node.children[0]);
}
