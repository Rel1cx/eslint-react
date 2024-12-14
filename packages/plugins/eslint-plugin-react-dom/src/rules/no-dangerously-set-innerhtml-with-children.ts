import * as JSX from "@eslint-react/jsx";
import { isNullable } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml-with-children";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function firstChildIsText(node: TSESTree.JSXElement) {
  const [firstChild] = node.children;
  return node.children.length > 0
    && !isNullable(firstChild)
    && !JSX.isLineBreak(firstChild);
}

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using both 'children' and 'dangerouslySetInnerHTML'",
    },
    messages: {
      noDangerouslySetInnerhtmlWithChildren:
        "A DOM component cannot use both 'children' and 'dangerouslySetInnerHTML'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const hasChildrenWithIn = () => node.children.length > 0 && firstChildIsText(node);
        const hasChildrenProp = () => JSX.hasProp(node.openingElement.attributes, "children", initialScope);
        // dprint-ignore
        const hasDanger = () => JSX.hasProp(node.openingElement.attributes, "dangerouslySetInnerHTML", initialScope);
        if (!(hasChildrenWithIn() || hasChildrenProp()) || !hasDanger()) return;
        context.report({
          messageId: "noDangerouslySetInnerhtmlWithChildren",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
